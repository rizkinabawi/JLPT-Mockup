/**
 * generate-mixed-packets.mjs
 * Pools all N1 and N4 questions, then generates 12 varied packets each
 * by seeded-shuffle sampling — no external deps required.
 *
 * Usage: node scripts/generate-mixed-packets.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "../artifacts/jlpt-mocktest/public");

// ── Seeded RNG (LCG) ─────────────────────────────────────────────────────────
function makeRng(seed) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return ((s >>> 0) / 0x100000000);
  };
}
function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Load source JSONs ─────────────────────────────────────────────────────────
function load(file) {
  const raw = JSON.parse(readFileSync(join(PUBLIC, file), "utf8"));
  return Array.isArray(raw) ? raw : [raw];
}

const n1src = load("N1_1775317089807.json");
const n4src = load("N4_data.json");

// ── Build question pools per section index ────────────────────────────────────
function buildPools(packets) {
  const pools = [];
  packets.forEach((exam) => {
    exam.sections.forEach((sec, si) => {
      if (!pools[si]) pools[si] = [];
      (sec.questions || []).forEach((q) => pools[si].push(q));
    });
  });
  // Deduplicate by question text (in case same question appears in multiple packets)
  return pools.map((pool) => {
    const seen = new Set();
    return pool.filter((q) => {
      const key = q.question.slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });
}

// ── Generate N packets from pools ─────────────────────────────────────────────
function generatePackets({ level, pools, sectionTitles, pickCounts, numPackets }) {
  console.log(`\n[${level}] Pool sizes: ${pools.map((p, i) => `S${i}:${p.length}`).join("  ")}`);

  const packets = [];

  for (let pIdx = 0; pIdx < numPackets; pIdx++) {
    const sections = [];
    let globalNum = 1;

    pools.forEach((pool, si) => {
      const pick = pickCounts[si];
      const seed = (pIdx + 1) * 7919 + si * 31337 + level.charCodeAt(1);
      const rng = makeRng(seed);
      const sampled = shuffle(pool, rng).slice(0, pick);

      // Renumber questions sequentially
      const questions = sampled.map((q) => ({
        ...q,
        number: globalNum++,
      }));

      sections.push({
        title: sectionTitles[si] || `Section ${si + 1}`,
        questions,
      });
    });

    const totalQ = sections.reduce((s, sec) => s + sec.questions.length, 0);

    packets.push({
      level,
      exam_number: pIdx + 1,
      total_questions: totalQ,
      sections,
      generated_at: new Date().toISOString(),
      mix_version: "v1",
    });

    console.log(`  Packet ${pIdx + 1}: ${totalQ} questions`);
  }

  return packets;
}

// ═══════════════════════════════════════════════════════════════════════════════
// N1  (source: 94q = 44 vocab/grammar + 50 reading)
// Target per packet: 35 + 40 = 75 questions
// ═══════════════════════════════════════════════════════════════════════════════
const n1pools = buildPools(n1src);
const n1packets = generatePackets({
  level: "N1",
  pools: n1pools,
  sectionTitles: ["文字・語彙・文法", "読解"],
  pickCounts: [28, 18],   // 46 per packet — ~70% of each pool → good variety
  numPackets: 12,
});

// ═══════════════════════════════════════════════════════════════════════════════
// N4  (source: 161q = 47+41+53+20)
// Target per packet: 24+21+27+10 = 82 questions
// ═══════════════════════════════════════════════════════════════════════════════
const n4pools = buildPools(n4src);
const n4packets = generatePackets({
  level: "N4",
  pools: n4pools,
  sectionTitles: ["文字・語彙", "語彙・文法", "文法・読解", "読解"],
  pickCounts: [24, 21, 27, 10],  // 82 per packet
  numPackets: 12,
});

// ── Write output ──────────────────────────────────────────────────────────────
const n1out = join(PUBLIC, "N1_mixed.json");
const n4out = join(PUBLIC, "N4_mixed.json");

writeFileSync(n1out, JSON.stringify(n1packets, null, 2));
writeFileSync(n4out, JSON.stringify(n4packets, null, 2));

console.log(`\n✓ Wrote ${n1out}  (${n1packets.length} packets)`);
console.log(`✓ Wrote ${n4out}  (${n4packets.length} packets)`);
console.log("\nNext: update EXAM_FILES in App.tsx + bump EXAMS_VERSION");
