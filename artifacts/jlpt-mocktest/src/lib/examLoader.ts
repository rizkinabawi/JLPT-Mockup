/**
 * examLoader.ts
 * Fetches and decrypts exam data files.
 *
 * - If VITE_EXAM_KEY is set at build time → loads .enc.json and decrypts with AES-256-GCM
 * - If not set (local dev without key) → falls back to plain .json
 */

import { Exam } from "../types/exam";

const KEY_HEX: string = import.meta.env.VITE_EXAM_KEY ?? "";

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(hex.length / 2);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return arr;
}

function base64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const buffer = new ArrayBuffer(bin.length);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

let _cryptoKey: CryptoKey | null = null;
async function getCryptoKey(): Promise<CryptoKey> {
  if (_cryptoKey) return _cryptoKey;
  const keyBytes = hexToBytes(KEY_HEX);
  _cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  return _cryptoKey;
}

async function decryptPayload(payload: { v: number; iv: string; data: string }): Promise<string> {
  const key = await getCryptoKey();
  const iv = base64ToBytes(payload.iv);
  const combined = base64ToBytes(payload.data); // ciphertext + 16-byte GCM tag

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    combined
  );

  return new TextDecoder().decode(decrypted);
}

// ── Public API ────────────────────────────────────────────────────────────────

const ENCRYPTED = Boolean(KEY_HEX && KEY_HEX.length === 64);

export async function loadExamFile(filename: string): Promise<Exam[]> {
  const base = import.meta.env.BASE_URL ?? "/";

  if (ENCRYPTED) {
    // Fetch encrypted file
    const encFilename = filename.replace(".json", ".enc.json");
    const resp = await fetch(base + encFilename);
    if (!resp.ok) {
      console.warn(`[examLoader] Failed to fetch encrypted ${encFilename}, status ${resp.status}`);
      return [];
    }
    try {
      const payload = await resp.json();
      const plaintext = await decryptPayload(payload);
      const data = JSON.parse(plaintext);
      return Array.isArray(data) ? (data as Exam[]) : [data as Exam];
    } catch (err) {
      console.error(`[examLoader] Decryption failed for ${encFilename}:`, err);
      return [];
    }
  } else {
    // Fallback: plain JSON (local dev without key)
    const resp = await fetch(base + filename);
    if (!resp.ok) return [];
    const data = await resp.json();
    return Array.isArray(data) ? (data as Exam[]) : [data as Exam];
  }
}
