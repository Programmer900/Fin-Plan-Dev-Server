const path = require('path');
const nodeFetch = require('node-fetch');
const express = require('express');

// @ts-ignore
global.fetch = nodeFetch;

const dist = '../dist';

// This contains a list of static routes (assets)
/** @type {import('../dist/server/package.json')} */
const {
  ssr: { assets },
} = require(`${dist}/server/package.json`);

/** @type {import('../dist/client/ssr-manifest.json')} */
const manifest = require(`${dist}/client/ssr-manifest.json`);

// This is the server renderer we just built
/** @type { import('../dist/server/main')} */
const { default: renderPage } =
  /* @ts-ignore */
  require(`${dist}/server`);

const server = express();

process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----');
  console.log(error);
  console.log('----- Exception origin -----');
  console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----');
  console.log(promise);
  console.log('----- Reason -----');
  console.log(reason);
});

for (const asset of assets || []) {
  server.use(
    `/${asset}`,
    express.static(path.join(__dirname, `${dist}/client/${asset}`), {
      maxAge: '24h',
    }),
  );
}

server.get('*', async (request, response) => {
  try {
    const url = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const { html, status, statusText, headers } = await renderPage(url, {
      manifest,
      preload: true,
      request,
      response,
    });

    response.writeHead(status || 200, statusText || headers, headers);
    response.end(html);
  } catch (e) {
    console.error(e);
  }
});

server.get('/blog', (req, res) => {
  console.log(req, res);
  res.writeHead(200);
  res.end(`<h1> Blog </h1>`);
});

const port = process.env.PORT || 3000;
console.log(`Server started: http://localhost:${port}`);
server.listen(port);
