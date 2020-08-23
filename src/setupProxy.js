const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/starter/province",
    createProxyMiddleware({
      target: "https://api.rajaongkir.com/",
      changeOrigin: true,
    })
  );
};

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:3000",
//       changeOrigin: true,
//     })
//   );
// };
