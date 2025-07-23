import net from "net";
import config from "./config";
import { parse } from "./parser";
import Store from "./store";
import aof from "./persistence/aof";
import rdb from "./persistence/rdb";

const store = new Store();

rdb.load(store);
aof.replay(store);

const server = net.createServer((socket) => {
  socket.on("data", (buffer) => {
    // TODO: parse, dispatch commands, write responses
  });
});

server.listen(config.PORT, () => {
  console.log(`Redis-clone listening on port ${config.PORT}`);
});

setInterval(() => rdb.save(store), config.SNAPSHOT_INTERVAL);
setInterval(() => aof.compact(store), config.COMPACT_INTERVAL);
