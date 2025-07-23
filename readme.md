# Redis‑Clone (Node.js + TypeScript)

A minimal Redis‑style in‑memory key/value store with AOF & RDB persistence (no Pub/Sub).  
Clients speak the Redis RESP protocol over raw TCP (port 6379 by default).

---

## 📂 Project Structure

```
.
├── package.json              # npm metadata & scripts
├── .env                      # environment overrides (PORT, paths, intervals…)
├── tsconfig.json              # TypeScript compiler options
├── README.md                 # this documentation
├── src/                      # all TypeScript source code
│
│   ├── index.ts              # ▶️ Entry point: load persistence, start TCP server, schedule snapshots/compaction
│   ├── config.ts              # ⚙️ Reads .env or defaults: server port, file paths, intervals
│   ├── parser.ts             # 🔄 RESP protocol parser & serializer
│   ├── store.ts              # 🗄️ In‑memory Map + TTL logic (get, set, del, expire)
│   │
│   ├── commands/             #  📦 Command handlers
│   │   ├── get.ts            #   • `GET key` → bulk‑string or nil
│   │   ├── set.ts            #   • `SET key value` → +OK (and AOF append)
│   │   ├── del.ts            #   • `DEL key` → integer count (and AOF append)
│   │   ├── expire.ts         #   • `EXPIRE key seconds` → integer (and AOF append)
│   │   └── ping.ts           #   • `PING` → +PONG
│   │
│   ├── persistence/          # 💾 Persistence modules
│   │   ├── aof.ts            #   • AOF append(log), replay on startup, compaction
│   │   └── rdb.ts            #   • RDB snapshot dump & load (JSON)
│   │
│   └── utils/                # 🛠️ Helpers
│       └── logger.ts         #   • Simple timestamped console logger
│
├── data/                     # Runtime‑generated persistence files
│
│   ├── appendonly.aof        #   • AOF log of write commands
│   └── dump.rdb.json         #   • Latest RDB snapshot
│
└── tests/                    # 🧪 Jest test suites
    ├── store.test.ts         #   • In‑memory store & TTL behavior
    ├── parser.test.ts        #   • RESP parser/serializer edge cases
    ├── commands.test.ts      #   • GET/SET/DEL/EXPIRE/PING integration
    └── integration.test.ts   #  • End‑to‑end server + redis‑cli compatibility
```

---

## 🔍 File Descriptions

- **package.json**  
  npm metadata, dependencies, and scripts:

  ```json
  {
    "scripts": {
      "build": "tsc",
      "start": "node dist/index.js",
      "test": "jest"
    }
  }
  ```

- **.env**  
  Override defaults for:

  - `PORT` (TCP port, default 6379)
  - `AOF_PATH` & `RDB_PATH`
  - `SNAPSHOT_INTERVAL` & `COMPACT_INTERVAL` (in ms)

- **tsconfig.json**  
  TypeScript compiler options (ES2020, CommonJS, outDir `dist`, etc.)

- **src/index.ts**

  - Loads config
  - `rdb.load()` → restores snapshot
  - `aof.replay()` → replays write log
  - Starts TCP server on `config.PORT`
  - Parses RESP frames → dispatches to command modules → writes RESP replies
  - Schedules `rdb.save()` & `aof.compact()`

- **src/config.ts**  
  Centralizes environment variables and default values.

- **src/parser.ts**  
  Implements RESP parsing and serialization:

  - `parse(buffer: Buffer): any`
  - `serialize(data: any): Buffer`

- **src/store.ts**  
  In‑memory store with TTL support:

  - Methods: `get(key)`, `set(key,value)`, `del(key)`, `expire(key,secs)`
  - Automatically expires keys via timers.

- **src/commands/\*.ts**  
  Handlers for each Redis command:

  - Export `execute(args: string[]): Buffer`
  - Invoke store methods and append to AOF when needed.

- **src/persistence/aof.ts**

  - `append(cmdLine: string): void`
  - `replay(store: Store): void`
  - `compact(store: Store): void`

- **src/persistence/rdb.ts**

  - `save(store: Store): void`
  - `load(store: Store): void`

- **src/utils/logger.ts**  
  Timestamped console logging utility.

- **data/**  
  Generated at runtime:

  - `appendonly.aof`
  - `dump.rdb.json`

- **tests/**  
  Jest tests for:
  - Core store & TTL logic
  - RESP parser correctness
  - Command handler integration
  - End‑to-end server behavior using a real RESP client

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   bun i
   ```

2. **Configure**  
   Copy `.env.example` → `.env` and edit if needed.

3. **Run the dev server**

   ```bash
   bun run dev
   ```

4. **Run tests**

   ```bash
   bun run test
   ```
