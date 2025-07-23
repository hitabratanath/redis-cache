import Store from "../store";
import aof from "../persistence/aof";
import { serialize } from "../parser";

export function execute(store: Store, args: string[]): Buffer {
  const [key] = args;
  const count = store.del(key);
  aof.append(`DEL ${key}`);
  return serialize(count);
}
