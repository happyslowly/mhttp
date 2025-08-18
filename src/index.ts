#!/usr/bin/env node
import { parseOptions } from "./cli";
import { makeRequest } from "./cli/request";

makeRequest(parseOptions());
