#!/usr/bin/env node
import { parseOptions } from "./cli";
import { makeRequest } from "./cli/request";
import { logger } from "./cli/logger";

makeRequest(parseOptions()).catch((error) => logger.error(error.message));
