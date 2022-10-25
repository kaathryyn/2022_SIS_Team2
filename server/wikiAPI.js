async function getLandmarkWiki() {
  var wikiItems = [];
  var urlForWikiPage;
  var page;
  var pageID;

  const landmark = 'sydney_opera_house';

  var url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${landmark}`

  fetch(url)
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (response) {
        for (var key in response.query.search) {
          wikiItems.push({
            queryResultPageID: response.query.search[key].pageid,
            queryResultPageTitle: response.quert.search[key].title
          });
        }
      }
  )
    .then(
      function (response) {
        for (var item in wikiItems) {
          page = wikiItems[item];
          pageID = page.queryResultPageID;
          urlForWikiPage = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

          console.log(pageID);
          console.log(urlForWikiPage);

          fetch(urlForWikiPage)
            .then(function (response) {
              return response.json();
            })
            .then(
              function (response) {
                page.querResultPageFullURL = response.query.pages[pageID].fullurl;
            }
          )
        }
      }
    )
}

getLandmarkWiki();


module.export = { getLandmarkWiki };