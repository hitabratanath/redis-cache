import Store from "../store";
import aof from "../persistence/aof";
import { serialize } from "../parser";

export function execute(store: Store, args: string[]): Buffer {
  const [key, val] = args;
  store.set(key, val);
  aof.append(`SET ${key} ${val}`);
  return serialize("OK");
}
