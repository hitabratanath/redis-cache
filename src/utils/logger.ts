import config from "../config";

/**
 * Logs an informational message if the log level is INFO or DEBUG.
 * Use this function to log important but non-critical information.
 */
function info(msg: string): void {
  if (config.LOG_LEVEL === "INFO" || config.LOG_LEVEL === "DEBUG") {
    console.log(`[INFO] ${msg}`);
  }
}

/**
 * Logs an error message if the log level is DEBUG or ERROR.
 * Use this function to log critical errors that should be visible when debugging or running in production.
 */
function error(msg: string): void {
  if (config.LOG_LEVEL === "DEBUG" || config.LOG_LEVEL === "ERROR") {
    console.error(`[ERROR] ${msg}`);
  }
}

/**
 * Logs a performance-related message if the log level is DEBUG.
 * Use this function to log performance-related metrics or events when debugging.
 */
function perf(msg: string): void {
  if (config.LOG_LEVEL === "DEBUG") {
    console.log(`[PERF] ${msg}`);
  }
}

/**
 * Logger utility providing methods for different log levels.
 */
const logger = { info, error, perf };

export default logger;
