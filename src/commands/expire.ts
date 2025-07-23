import Store from "../store";
import aof from "../persistence/aof";
import { serialize } from "../parser";

export function execute(store: Store, args: string[]): Buffer {
  const [key, secStr] = args;
  const res = store.expire(key, Number(secStr));
  aof.append(`EXPIRE ${key} ${secStr}`);
  return serialize(res ? 1 : 0);
}
