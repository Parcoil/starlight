// This file overwrites the stock UV config.js

self.__uv$config = {
  prefix: "/stars/results/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/stars/uv.handler.js",
  client: "/stars/uv.client.js",
  bundle: "/stars/uv.bundle.js",
  config: "/stars/uv.config.js",
  sw: "/stars/uv.sw.js",
};
