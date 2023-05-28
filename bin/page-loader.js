#!/usr/bin/env node
import { Command } from 'commander';

import PageLoader from '../src/PageLoader.js';

const cwd = process.cwd();
const program = new Command();
program.name('page-loader');
program.description('Page loader utility.');
program.version('1.0.0');

program
  .argument('<url>')
  .option('-o, --output <type>', `output dir (default: "${cwd}")`, cwd)
  .action((url, { output }) => new PageLoader(url, output).loadPage().then(console.log).catch());
program.parse();
