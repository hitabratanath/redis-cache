/**
 * Centralizes environment variables and default values.
 *
 * Validates them and makes them available from a single location.
 */
const config = {
  /**
   * Port number the server listens on.
   *
   * Defaults to 6379 (Redis default).
   */
  PORT: Number(process.env.PORT) || 6379,

  /**
   * Path to the AOF file.
   *
   * Defaults to ./data/appendonly.aof.
   */
  AOF_PATH: process.env.AOF_PATH || "./data/appendonly.aof",

  /**
   * Path to the RDB file.
   *
   * Defaults to ./data/dump.rdb.json.
   */
  RDB_PATH: process.env.RDB_PATH || "./data/dump.rdb.json",

  /**
   * Interval in milliseconds between RDB snapshots.
   *
   * Defaults to 1 minute.
   */
  SNAPSHOT_INTERVAL: Number(process.env.SNAPSHOT_INTERVAL) || 60000,

  /**
   * Interval in milliseconds between AOF compactions.
   *
   * Defaults to 5 minutes.
   */
  COMPACT_INTERVAL: Number(process.env.COMPACT_INTERVAL) || 300000,

  /**
   * 3 log levels: DEBUG, INFO, ERROR
   *
   * Defaults to INFO
   * INFO - Only log info messages
   * DEBUG - Log info and debug messages
   * ERROR - Log info, debug, and error messages
   */
  LOG_LEVEL: process.env.LOG_LEVEL || "INFO",
};

export default config;
