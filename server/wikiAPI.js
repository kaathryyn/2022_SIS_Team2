const fetch = require('node-fetch');

async function getLandmarkWikiURL() {
  var wikiItems = [];
  var wikiItemsPageID = [];
  var wikiItemsPageTitle = [];
  var urlForWikiPageByPageID; // This is a .json file containing the actual URL for each wiki page
  var pageID;

  var landmark = 'sydney_opera_house';

  var url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${landmark}`

  await fetch(url)
    .then((res) => {
      res = res.json();
      return res;
    })
    .then((res) => {
      for (var key in res.query.pages) {
        //Pushing values to separate arrays
        wikiItemsPageID.push(res.query.pages[key].pageid);
        wikiItemsPageTitle.push(res.query.pages[key].title);

        //Combines pageids and page_titles into one "object"
        for (let i = 0; i < wikiItemsPageID.length; i++) {
          wikiItems[wikiItemsPageID[i]] = String(wikiItemsPageTitle[i])
        }
      }
      // for (let i = 0; i < wikiItemsPageID.length; i++) {
      //   console.log(`PageID: ${wikiItemsPageID[i]}`);
      // }
      // console.log(`WikiItems: ${Object.entries(wikiItems)}`);
      return res
    }
    )
    .then((res) => {
      for (var item in wikiItemsPageID) {
        pageID = wikiItemsPageID[item];
        urlForWikiPageByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
        console.log(pageID);
        console.log(`URL for WikiPage: ${urlForWikiPageByPageID}`);
        
        fetch(urlForWikiPageByPageID)
          .then((res) => {
            res = res.json();
            return res
          })
          .then((res) => {
            // console.log(`res.query.pages[pageID]: ${Object.entries(res.query.pages)}`)
            console.log(`Item: ${pageID}`)
            // finalPageID = res.query.pages[pageID].pageid;
            // console.log(`finalPageID: ${finalPageID}`);
            // urlForLandmarkPage = res.query.pages[pageID].fullurl;
          }
          )
        }
    })

}

var result = getLandmarkWikiURL();
// console.log(`Landmark Wiki URL: ${result}`);


module.export = { getLandmarkWikiURL };