const fetch = require('node-fetch');

async function getLandmarkURLs(landmark) {
  var wikiItems = [];
  var wikiItemsPageID = [];
  var wikiItemsPageTitle = [];
  var urlForWikiPageByPageID; // This is a .json file containing the actual URL for each wiki page
  var pageID;
  var wikiPages = [];

  // Uncomment when testing without vision api
  // landmark = 'Saint_Basils_Cathedral';

  var url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${landmark}`
  console.log(`Request url: ${url}`);

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

        //Combines pageids and page_titles into one "object" - do we actually need this?
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
    .then(async (res) => {
      for (var item in wikiItemsPageID) {
        pageID = wikiItemsPageID[item];
        urlForWikiPageByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
        // console.log(pageID);
        // console.log(`URL for WikiPage: ${urlForWikiPageByPageID}`);
        
        // await getWikiURL()
        await fetch(urlForWikiPageByPageID)
          .then((res) => {
            res = res.json();
            return res
          })
          .then((res) => {
            // console.log(`Item: ${pageID}`)
            // finalPageID = res.query.pages[pageID].pageid;
            // console.log(`finalPageID: ${finalPageID}`);
            urlForLandmarkPage = res.query.pages[pageID].fullurl;
            wikiPages.push(urlForLandmarkPage);
          }
          )
        }
        for (var i = 0; i < wikiPages.length; i++) {
          console.log(`URL: ${wikiPages[i]}`);
        }
    })
}

// getLandmarkURLs();


module.export = { getLandmarkURLs };