function errorBox(message: string) {
  const red = "\x1b[31m";
  const reset = "\x1b[0m";

  const border =
    `${red}┌${"─".repeat(message.length + 2)}┐\n` +
    `│ ${message} │\n` +
    `└${"─".repeat(message.length + 2)}┘${reset}`;
  console.error(border);
}
