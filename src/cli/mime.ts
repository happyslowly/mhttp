export const mimeToExtension: Record<string, string> = {
  // === Images ===
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/vnd.microsoft.icon": "ico",
  "image/x-icon": "ico",

  // === Audio ===
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
  "audio/aac": "aac",
  "audio/mp4": "m4a",

  // === Video ===
  "video/mp4": "mp4",
  "video/avi": "avi",
  "video/mov": "mov",
  "video/wmv": "wmv",
  "video/ogg": "ogv",
  "video/webm": "webm",

  // === Documents ===
  "application/pdf": "pdf",
  "application/zip": "zip",
  "application/x-tar": "tar",
  "application/x-gzip": "gz",
  "application/x-bzip2": "bz2",
  "application/x-7z-compressed": "7z",
  "application/x-rar-compressed": "rar",
  "application/x-shockwave-flash": "swf",

  // === Office Files ===
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-word.document.macroEnabled.12": "docm",
  "application/vnd.ms-word.template.macroEnabled.12": "dotm",

  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel.sheet.macroEnabled.12": "xlsm",
  "application/vnd.ms-excel.template.macroEnabled.12": "xltm",
  "application/vnd.ms-excel.addin.macroEnabled.12": "xlam",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.12": "xlsb",

  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.ms-powerpoint.presentation.macroEnabled.12": "pptm",
  "application/vnd.ms-powerpoint.template.macroEnabled.12": "potm",
  "application/vnd.ms-powerpoint.slideshow.macroEnabled.12": "ppsm",
  "application/vnd.ms-powerpoint.addin.macroEnabled.12": "ppam",

  // === Text/Code ===
  "text/plain": "txt",
  "text/html": "html",
  "text/css": "css",
  "text/javascript": "js",
  "application/json": "json",
  "application/xml": "xml",
  "text/xml": "xml",
  "application/javascript": "js",

  // === Other Common ===
  "application/octet-stream": "bin",
  "application/x-executable": "exe",
  "application/x-dos-executable": "exe",
  "application/x-msdownload": "exe",
  "application/x-sh": "sh",
  "application/x-perl": "pl",
  "application/x-python": "py",
  "application/x-ruby": "rb",
  "application/x-php": "php",
  "application/x-java": "java",
  "application/x-csharp": "cs",
  "application/x-typescript": "ts",
  "application/x-latex": "tex",
  "application/x-tex": "tex",
  "application/x-compressed-tar": "tar.gz",
  "application/x-tar-gz": "tar.gz",
  "application/gzip": "gz",
  "application/x-bzip": "bz2",
  "application/x-lzip": "lz",
  "application/x-lzma": "lzma",
  "application/x-xz": "xz",
  "application/x-compress": "Z",
  "application/x-ace-compressed": "ace",
  "application/x-arj": "arj",
  "application/x-cpio": "cpio",
  "application/x-dms": "dms",
  "application/x-iso9660-image": "iso",
  "application/x-rpm": "rpm",
  "application/x-sql": "sql",

  // === Fonts ===
  "font/woff": "woff",
  "font/woff2": "woff2",
  "font/ttf": "ttf",
  "font/otf": "otf",

  // === Web Formats ===
  "application/x-web-app-manifest+json": "webapp",
  "application/manifest+json": "webmanifest",
  "application/x-chrome-extension": "crx",
  "application/x-opera-extension": "oex",
  "application/x-firefox-extension": "xpi",
  "application/x-mozilla-addon": "xpi",

  // === Database ===
  "application/x-sqlite3": "sqlite",
  "application/x-mysql-dump": "sql",
  "application/x-mysql": "sql",

  // === Configuration ===
  "application/x-yaml": "yaml",
  "application/x-yml": "yml",
  "application/x-toml": "toml",
  "application/x-ini": "ini",
  "application/x-properties": "properties",
  "application/x-dotenv": "env",

  // === E-books ===
  "application/epub+zip": "epub",
  "application/x-mobipocket-ebook": "mobi",
  "application/vnd.amazon.ebook": "azw",
  "application/x-cbr": "cbr",
  "application/x-cbz": "cbz",
};
