import scrapingbee from "scrapingbee";
import { runTest } from "../bootstrap.js";

runTest(async () => {
  const url = "https://www.idealista.com/en/inmueble/96279217/";

  const response = await get(url);
  const decoder = new TextDecoder();
  const text = decoder.decode(response.data);
  console.log(text);
});

async function get(url) {
  const client = new scrapingbee.ScrapingBeeClient(process.env.SCRAPBEE);
  const response = await client.get({
    url: url,
    params: {},
  });
  return response;
}
