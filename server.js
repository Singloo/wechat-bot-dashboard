const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const devProxy = {
  '/api': {
    target: 'http://localhost:5000/',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
  },
};
app.prepare().then(() => {
  const server = express();
  const proxyMiddleware = require('http-proxy-middleware');
  Object.keys(devProxy).forEach(function (context) {
      server.use(proxyMiddleware(context, devProxy[context]))
  })
  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('/detail', (req, res) => {
    return app.render(req, res, '/detail', req.query);
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
