const cors = require("cors");

function register(app) {
  app.use(cors());
}

return (module.exports = {
  register
});
