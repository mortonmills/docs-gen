import { spawnSync } from "node:child_process"

import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

import { URL } from 'node:url';

import { optionsArray } from '../../data/pandoc-data.mjs';

import { genInputFileNames } from "./render-full-files.mjs"
import { pandocRender } from "../docs-list-util.mjs";

export { renderFilesFiles }

