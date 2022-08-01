import scrapingbee from "scrapingbee";

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient("");
  var response = await client.get({
    url: url,
    params: {},
  });
  return response;
}
const url = "https://www.idealista.com/en/inmueble/96279217/";

get(url)
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
