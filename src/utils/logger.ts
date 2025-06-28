class Logger {
  private debug = false;

  constructor() {
    this.log = this.log.bind(this);
    this.error = this.error.bind(this);
  }

  configure(options: { debug?: boolean }) {
    this.debug = !!options.debug;
  }

  log(message: string) {
    this.debug && console.log(`\x1b[90m${message}\x1b[0m`);
  }

  error(message: string) {
    this.debug
      ? console.error(`\x1b[31mError: ${message}\x1b[0m`)
      : errorBox(message);

    process.exit(1);
  }
}

function errorBox(message: string) {
  const red = "\x1b[31m";
  const reset = "\x1b[0m";

  const border =
    `${red}┌${"─".repeat(message.length + 2)}┐\n` +
    `│ ${message} │\n` +
    `└${"─".repeat(message.length + 2)}┘${reset}`;
  console.error(border);
}

const logger = new Logger();
export default logger;
