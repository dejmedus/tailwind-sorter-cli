class Logger {
  private debug = false;

  constructor() {
    this.log = this.log.bind(this);
    this.warning = this.warning.bind(this);
    this.error = this.error.bind(this);
  }

  configure(options: { debug?: boolean }) {
    this.debug = !!options.debug;
  }

  log(message: string) {
    this.debug && console.log(`\x1b[90m${message}\x1b[0m`);
  }

  warning(message: string) {
    this.debug
      ? console.log(`\x1b[33mWarning: ${message}\x1b[0m`)
      : outputBox(message, "warning");
  }

  error(message: string) {
    this.debug
      ? console.error(`\x1b[31mError: ${message}\x1b[0m`)
      : outputBox(message);

    process.exit(1);
  }
}

function outputBox(message: string, type: "warning" | "error" = "error") {
  const color = type === "warning" ? "\x1b[33m" : "\x1b[31m";
  const reset = "\x1b[0m";

  const border =
    `${color}┌${"─".repeat(message.length + 2)}┐\n` +
    `│ ${message} │\n` +
    `└${"─".repeat(message.length + 2)}┘${reset}`;
  console.error(border);
}

/**
 * Error and logs helper.
 * When debug mode is enabled, `log()` prints messages and `error()` prints full error output.
 */
const logger = new Logger();
export default logger;
