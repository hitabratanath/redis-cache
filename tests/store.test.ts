import { test, expect } from "bun:test";
import Store from "../src/store";

test("set and get key", () => {
  const store = new Store();
  store.set("foo", "bar");
  expect(store.get("foo")).toBe("bar");
});

test("delete key", () => {
  const store = new Store();
  store.set("foo", "bar");
  expect(store.del("foo")).toBe(1);
  expect(store.get("foo")).toBeNull();
});

test("expire key after TTL", async () => {
  const store = new Store();
  store.set("foo", "bar");
  expect(store.expire("foo", 1)).toBe(true);
  await new Promise((r) => setTimeout(r, 1100));
  expect(store.get("foo")).toBeNull();
});

test("expire non-existent key returns false", () => {
  const store = new Store();
  expect(store.expire("nope", 1)).toBe(false);
});
