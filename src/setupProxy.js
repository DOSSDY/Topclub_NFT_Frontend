const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/collection",
    createProxyMiddleware({
      target: "https://c-collectible-static.s3.ap-southeast-1.amazonaws.com",
      changeOrigin: true,
    })
  );
};
