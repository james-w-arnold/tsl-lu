#!/usr/bin/env node

import chalk from "chalk";
import { scrapeRuleData, ScrapedLintRuleData } from "./scrape";

const printHelp = () => {
  console.log(chalk.bgRed.bold("tsl-lu - TypeScript Lint Look Up"));
  console.log(
    chalk.bgRed.bold(
      "A lookup tool to provide information about ts-lint rules."
    )
  );
  console.log(chalk.whiteBright.bold("Syntax: npx tsl-lu no-var-requires"));
};

const printRule = (data: ScrapedLintRuleData) => {
  console.log(chalk.bgRed.bold("Description"));
  data.description.forEach(line => console.log(chalk.whiteBright.bold(line)));
  console.log(chalk.bgRed.bold("Rational"));
  data.rational.forEach(line => console.log(chalk.whiteBright.bold(line)));
  console.log(chalk.bgRed.bold("Config"));
  data.config.forEach(line => console.log(chalk.whiteBright.bold(line)));
  console.log(chalk.bgRed.bold("Schema"));
  data.config.forEach(line => console.log(chalk.whiteBright.bold(line)));
};

const argv: string = process.argv[2];

if (!argv) {
  printHelp();
} else {
  scrapeRuleData(argv)
    .then(data => printRule(data))
    .catch(error => console.error(error));
}
