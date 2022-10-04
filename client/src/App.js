
import './App.css';
import React from 'react';
import { response } from 'express';

class App extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    wikiSearchReturnValues: [],
    wikiSearchTerms: ''
    

  }
}

useWikiSearchEngine = (e)=> {
 e.preventDefault();

 this.setState({
  wikiSearchReturnValues: []

 });

 const pointerToThis = this;
 
 var url = "https://en.wikipedia.org/w/api.php";

 var params = {
  action: 'query',
  list: 'search',
  srsearch: this.state.wikiSearchTerms,
  format: 'json'
 };

 url = url + '?origin=*';
 Object.keys(params).forEach((key) => {
  url+= "&" + key + "=" + params[key];
 });

 fetch(url)
 .then(
    function (response) {
      return response.json();

    }
 )
 .then(
  function (response) {

    for (var key in response.query.search) {
      pointerToThis.state.wikiSearchReturnValues.push({
        queryResultPageFullUrl: 'no link',
        queryresultPageID: response.query.search[key].pageid,
        queryresultPageTitle: response.query.search[key].title,
        queryresultPageSnippet: response.query.search[key].snippet
      });
    }
  }
 )
  .then(
    function (response) {
      for (var key2 in pointerToThis.state.wikiSearchReturnValues) {
        let page = pointerToThis.state.wikiSearchReturnValues[key2];
        let pageID = page.queryresultPageID;
        let urlforRetrievingPageUrlByPageID = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json';
        
        fetch(urlforRetrievingPageUrlByPageID)
          .then(
            function (response) {
              return response.json();
            }
          )
          .then(
            function (response) {
              page.queryResultPageFullUrl = response.query.pages[pageID].fullurl;

              pointerToThis.forceUpdate();
            }
          )
      }
    }

}
}

changeWikiSearchTerms = (e) => {
  this.setState({
    wikiSearchTerms: e.target.value
  });
}

  render() {
    let wikiSearchResults = [];

    for(var key3 in this.state.wikiSearchReturnValues) {
      wikiSearchResults.push(
      <div className="searchResultDiv" key={key3}>
        <h3><a href={this.state.wikiSearchReturnValues[key3].queryResultPageFullUrl}>{this.state.wikiSearchReturnValues[key3].queryresultPageTitle}</a>
        </h3>
        <span className='link'> <a href={this.state.wikiSearchReturnValues[key3].queryResultPageFullUrl}></a> </span>
        </div>
      )
    }
  
    return (
    <div className="App">
      <h1>Wikipedia Search Engine</h1>
      <form action="">
        <input type="text" value={this.state.wikiSearchTerms || ''}  onChange={this.changeWikiSearchTerms} placeholder='Search Wkipedia Articles'/>
        <button type='submit' onClick={this.useWikiSearchEngine}>Search</button> 
      </form>
      {wikiSearchResults}
    </div>
    );
  }
}

export default App;
