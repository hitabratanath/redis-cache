import { serialize } from "../parser";

export function execute(): Buffer {
  return serialize("PONG");
}
