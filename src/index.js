if (process.env.NODE_ENV !== "test") {
  const Server = require("./server/app");
  const server = new Server();
  server.listen();
}
