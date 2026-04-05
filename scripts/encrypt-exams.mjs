/**
 * encrypt-exams.mjs
 * Encrypts all exam JSON files using AES-256-GCM.
 * Output: <name>.enc.json in the same public/ directory.
 *
 * The encryption key is read from:
 *   VITE_EXAM_KEY environment variable (hex string, 64 chars = 32 bytes)
 *
 * Usage:
 *   VITE_EXAM_KEY=<hexkey> node scripts/encrypt-exams.mjs
 *   OR (if VITE_EXAM_KEY already in environment):
 *   node scripts/encrypt-exams.mjs
 *
 * For Vercel: set VITE_EXAM_KEY in project env vars, then run as pre-build step.
 */

import { createCipheriv, randomBytes } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "../artifacts/jlpt-mocktest/public");

const KEY_HEX = process.env.VITE_EXAM_KEY;
if (!KEY_HEX || KEY_HEX.length !== 64) {
  console.error("❌  VITE_EXAM_KEY env var is missing or not 64 hex chars.");
  console.error("   Generate one with:  node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"");
  process.exit(1);
}

const KEY = Buffer.from(KEY_HEX, "hex");

const EXAM_FILES = [
  "N5_mixed.json",
  "N4_mixed.json",
  "N3_1775316511181.json",
  "N2_1775317079866.json",
  "N1_mixed.json",
];

let ok = 0;
for (const file of EXAM_FILES) {
  const inputPath = join(PUBLIC, file);
  const outputPath = join(PUBLIC, file.replace(".json", ".enc.json"));

  const plaintext = readFileSync(inputPath, "utf8");
  const iv = randomBytes(12); // 96-bit IV (recommended for GCM)

  const cipher = createCipheriv("aes-256-gcm", KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag(); // 16-byte authentication tag

  // Concatenate ciphertext + tag — Web Crypto API expects them together
  const combined = Buffer.concat([encrypted, tag]);

  const output = {
    v: 1,
    iv: iv.toString("base64"),
    data: combined.toString("base64"),
  };

  writeFileSync(outputPath, JSON.stringify(output));
  console.log(`  ✓ ${file}  →  ${file.replace(".json", ".enc.json")}`);
  ok++;
}

console.log(`\nEncrypted ${ok}/${EXAM_FILES.length} files successfully.`);
console.log("Remember to set VITE_EXAM_KEY in your Vercel project environment variables!");
