import { scrapeRuleData } from "./scrape";

scrapeRuleData("no-var-requires")
  .then(data => console.log(data))
  .catch(error => console.error(error));
