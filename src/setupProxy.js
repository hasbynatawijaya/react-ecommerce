const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/province",
    createProxyMiddleware({
      target: "https://api.rajaongkir.com/starter",
      changeOrigin: true,
    })
  );
};
