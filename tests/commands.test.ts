import { test, expect } from "bun:test";
import Store from "../src/store";
import { execute as ping } from "../src/commands/ping";
import { execute as setCmd } from "../src/commands/set";
import { execute as getCmd } from "../src/commands/get";
import { execute as delCmd } from "../src/commands/del";
import { execute as expireCmd } from "../src/commands/expire";

test("PING returns PONG", () => {
  const store = new Store();
  expect(ping(store, [])).toBe("+PONG\r\n");
});

test("SET and GET", () => {
  const store = new Store();
  expect(setCmd(store, ["foo", "bar"]).toString()).toBe("+OK\r\n");
  expect(getCmd(store, ["foo"]).toString()).toBe("$3\r\nbar\r\n");
});

test("GET nonexistent key returns nil", () => {
  const store = new Store();
  expect(getCmd(store, ["nope"]).toString()).toBe("$-1\r\n");
});

test("DEL returns count", () => {
  const store = new Store();
  setCmd(store, ["a", "b"]);
  expect(delCmd(store, ["a"]).toString()).toBe(":1\r\n");
  expect(delCmd(store, ["a"]).toString()).toBe(":0\r\n");
});

test("EXPIRE sets TTL and key expires", async () => {
  const store = new Store();
  setCmd(store, ["a", "b"]);
  expect(expireCmd(store, ["a", "1"]).toString()).toBe(":1\r\n");
  await new Promise((r) => setTimeout(r, 1100));
  expect(getCmd(store, ["a"]).toString()).toBe("$-1\r\n");
});
