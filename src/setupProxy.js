const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://podo-backend.herokuapp.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
    })
  );
};
