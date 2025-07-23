import { test, expect } from "bun:test";
import { parse, serialize } from "../src/parser";

test("simple string RESP", () => {
  expect(parse(Buffer.from("+OK\r\n"))).toBe("OK");
  expect(serialize("OK").toString()).toBe("+OK\r\n");
});

test("integer RESP", () => {
  expect(parse(Buffer.from(":123\r\n"))).toBe(123);
  expect(serialize(123).toString()).toBe(":123\r\n");
});

test("bulk string RESP", () => {
  expect(parse(Buffer.from("$5\r\nhello\r\n"))).toBe("hello");
  expect(serialize("hello").toString()).toBe("$5\r\nhello\r\n");
});

test("nil bulk string", () => {
  expect(parse(Buffer.from("$-1\r\n"))).toBeNull();
});

test("array RESP", () => {
  const buf = Buffer.from("*2\r\n$3\r\nfoo\r\n$3\r\nbar\r\n");
  expect(parse(buf)).toEqual(["foo", "bar"]);
  expect(serialize(["foo", "bar"]).toString()).toBe(buf.toString());
});
