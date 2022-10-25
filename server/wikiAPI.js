const fetch = require('node-fetch');

async function getLandmarkWikiURL() {
  var wikiItems = [];
  var wikiItemsPageID = [];
  var wikiItemsPageTitle = [];
  var urlForWikiPageByPageID;
  var urlForLandmarkPage;
  var page;
  var pageID;

  var landmark = 'sydney_opera_house';

  var url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${landmark}`

  await fetch(url)
    .then((res) => {
      res = res.json();
      // console.log(`First response: ${res}`);
      return res;
    })
    .then((res) => {
      console.log(`Second response: ${res}`);
      for (var key in res.query.pages) {
        //This is not pushing items correctly
        // wikiItems.push({
        //   queryResultPageID: res.query.pages[key].pageid,
        //   queryResultPageTitle: res.query.pages[key].title
        // });
        wikiItemsPageID.push(key);
        wikiItemsPageTitle.push(res.query.pages[key].title);

        //Trying to make an object with pageIDs and page Titles
        wikiItems = Object.assign(wikiItemsPageID, wikiItemsPageTitle);
        console.log(`${res.query.pages[key].pageid}: ${res.query.pages[key].title}`);
        // console.log(`WikiItemPageIDs: ${wikiItemsPageID[key]}`);
        // console.log(`WikiItemsPageTitle: ${wikiItemsPageTitle[key]}`);
      }
      console.log(`WikiItems: ${Object.entries(wikiItems)}`);
    }
    )
    .then((res) => {
      //wikiItems = counter of pages associated with identified landmark in Wiki
      for (var item in wikiItems) {
        page = wikiItems[item];
        pageID = page.queryResultPageID;
        urlForWikiPageByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
      }
      console.log(`Third Response: ${res}`);
    })
  fetch(urlForWikiPageByPageID)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(`Page ID = ${pageID}`);
      urlForLandmarkPage = res.query.pages[pageID].fullurl;
    }
    )
    .then(console.log(`Landmark Wiki URL: ${urlForLandmarkPage}`))
}


var result = getLandmarkWikiURL();
// console.log(`Landmark Wiki URL: ${result}`);


module.export = { getLandmarkWikiURL };