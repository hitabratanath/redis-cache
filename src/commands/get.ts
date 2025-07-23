import Store from "../store";
import { serialize } from "../parser";

export function execute(store: Store, args: string[]): Buffer {
  const [key] = args;
  const val = store.get(key);
  return serialize(val);
}
