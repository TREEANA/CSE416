const { createProxyMiddleware } = require("http-proxy-middleware");

const API_KEY_CURRENCY = "b158cab8f2dc4fc3be4972f79b642122";

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://podo-backend.herokuapp.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
    })
  );
  app.use(
    "/external/currency",
    createProxyMiddleware({
      target: `https://api.currencyfreaks.com/latest?apikey=${API_KEY_CURRENCY}`,
      pathRewrite: { "^/external/currency": "" },
      changeOrigin: true,
    })
  );
};
