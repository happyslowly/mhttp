import { Command } from "commander";
import { logger } from "./logger";

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export interface RequestOptions {
  url: URL;
  method: HttpMethod;
  headers?: Record<string, string>;
  data?: string;
  verbose: boolean;
}

export function createCLI() {
  const program = new Command();

  program.name("mhttp").description("A curl-like HTTP tool").version("1.0.0");

  program.option("-X, --method <method>", "HTTP method", "GET");
  program.option(
    "-H, --header <header>",
    "HTTP header",
    (value: string, previous: string[]) => {
      return [...previous, value];
    },
    [] as string[],
  );
  program.option("-d, --data <data>", "Request body");
  program.option("-v, --verbose");

  program.argument("<url>").description("Target URL");

  program.showHelpAfterError(true);
  return program;
}

export function parseOptions(): RequestOptions {
  const program = createCLI();
  program.parse(process.argv);

  const opts = program.opts();

  const method = opts.method.toUpperCase();
  if (!HTTP_METHODS.includes(method)) {
    logger.error(
      `${method} is not a valid HTTP method. Available methods: ${HTTP_METHODS.join(", ")}`,
    );
    process.exit(1);
  }

  const headers: Record<string, string> = {};
  if (opts.header !== undefined) {
    opts.header.forEach((header: string) => {
      const [key, value] = header.split(":");
      if (key && value) {
        headers[key.trim()] = value.trim();
      }
    });
  }

  return {
    url: parseUrl(program.args[0]),
    method: method,
    headers: headers,
    data: opts.data,
    verbose: opts.verbose,
  };
}

function parseUrl(urlString: string): URL {
  try {
    const url = new URL(urlString);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url;
    } else {
      return new URL(`http://${urlString}`);
    }
  } catch {
    logger.error(`${urlString} is not a valid URL`);
    process.exit(1);
  }
}
