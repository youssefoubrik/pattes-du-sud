import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

async function readPassword() {
  if (!process.stdin.isTTY) {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    return Buffer.concat(chunks).toString("utf8").replace(/\r?\n$/, "");
  }

  process.stdout.write("Admin password (16+ characters): ");
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  return new Promise((resolve) => {
    let password = "";
    function finish(value) {
      process.stdin.removeListener("keypress", onKeypress);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write("\n");
      resolve(value);
    }
    function onKeypress(character, key) {
      if (key.ctrl && key.name === "c") {
        finish("");
        process.exitCode = 130;
      } else if (key.name === "return" || key.name === "enter") {
        finish(password);
      } else if (key.name === "backspace") {
        password = Array.from(password).slice(0, -1).join("");
      } else if (!key.ctrl && !key.meta && character) {
        password += character;
      }
    }
    process.stdin.on("keypress", onKeypress);
    process.stdin.resume();
  });
}

const password = await readPassword();
if (process.exitCode === 130) process.exit();
if (password.length < 16) {
  console.error("Use a password of at least 16 characters.");
  process.exit(1);
}
const salt = randomBytes(16).toString("hex");
console.log(`${salt}:${scryptSync(password, salt, 32).toString("hex")}`);
