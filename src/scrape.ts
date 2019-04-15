import rp from "request-promise";
import cheerio from "cheerio";

const url: string = "https://palantir.github.io/tslint/rules/";

export interface ScrapedLintRuleData {
  description: string[];
  rational: string[];
  config: string[];
  schema: string[];
}

export const scrapeRuleData = async (
  rule: string
): Promise<ScrapedLintRuleData> => {
  try {
    const data = await rp(`${url}/${rule}/`);
    return parseData(data);
  } catch (e) {
    console.error(
      `Unable to retrieve the data from url ${url}/${rule}/ Error: ${e.message}`
    );
    throw e;
  }
};

const parseData = (data: string): ScrapedLintRuleData => {
  const $: CheerioStatic = cheerio.load(data);
  const children = $(".page-content")[0].children;
  const description: string[] = [];
  for (const element of children) {
    if (element.tagName === "h5") {
      break;
    } else if (element.type === "tag") {
      let text: string = cheerio(element).text();
      text = text.replace(/\n/g, "").trim();
      if (text) description.push(text);
    }
  }
  let rationalReached: boolean = false;
  const rational: string[] = [];
  for (const element of children) {
    if (
      cheerio(element)
        .text()
        .includes("Notes")
    ) {
      break;
    }
    if (element.tagName === "h5") {
      rationalReached = true;
    } else if (rationalReached) {
      let text: string = cheerio(element).text();
      text = text.replace(/\n/g, "").trim();
      if (text) rational.push(text);
    }
  }
  let configReached: boolean = false;
  const config: string[] = [];
  for (const element of children) {
    if (
      cheerio(element)
        .text()
        .includes("Schema")
    ) {
      break;
    }
    if (
      cheerio(element)
        .text()
        .includes("Config")
    ) {
      configReached = true;
    } else if (configReached) {
      let text: string = cheerio(element).text();
      text = text.replace(/\n/g, "").trim();
      if (text) config.push(text);
    }
  }
  let schemaReached: boolean = false;
  const schema: string[] = [];
  for (const element of children) {
    if (
      cheerio(element)
        .text()
        .includes("Schema")
    ) {
      schemaReached = true;
    } else if (schemaReached) {
      let text: string = cheerio(element).text();
      text = text.replace(/\n/g, "").trim();
      if (text) schema.push(text);
    }
  }

  return {
    description: description,
    rational: rational,
    config: config,
    schema: schema
  };
};
