const { createProxyMiddleware } = require("http-proxy-middleware");

const API_KEY_CURRENCY = "b158cab8f2dc4fc3be4972f79b642122";
const API_KEY_IMAGE = "dx0q9mebc";

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
  app.use(
    "/external/image",
    createProxyMiddleware({
      target: `https://api.cloudinary.com/v1_1/${API_KEY_IMAGE}/image/upload`,
      pathRewrite: { "^/external/image": "" },
      changeOrigin: true,
    })
  );
};
