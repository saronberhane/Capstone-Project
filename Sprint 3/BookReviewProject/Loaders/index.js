const app = require("./server");
const db = require("./db");

module.exports = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });

  db();
};
