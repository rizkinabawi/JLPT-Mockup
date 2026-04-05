import kuromoji from 'kuromoji';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('artifacts/jlpt-mocktest/public');
const FILES = [
  'N3_1775316511181.json',
  'N2_1775317079866.json',
  'N1_1775317089807.json',
];

// ── Kana helpers ─────────────────────────────────────────────────────────────
function katakanaToHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, c =>
    String.fromCharCode(c.charCodeAt(0) - 0x60)
  );
}
function stripLengthMarkers(str) {
  return str.replace(/[ーっッ]/g, '').replace(/[ぁぃぅぇぉゃゅょ]/g, c => {
    const m = { ぁ:'あ',ぃ:'い',ぅ:'う',ぇ:'え',ぉ:'お',ゃ:'や',ゅ:'ゆ',ょ:'よ' };
    return m[c] || c;
  });
}
function normalizeKana(str) {
  return stripLengthMarkers(katakanaToHiragana(str));
}
function readingsMatch(a, b) {
  return normalizeKana(a) === normalizeKana(b);
}
function isAllHiragana(str) {
  return /^[\u3040-\u309f\u30fc]+$/.test(str);
}
function hasKanji(str) {
  return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str);
}

// ── Mark the first occurrence of surfaceForm in the question text ────────────
function addMarkers(question, surfaceForm) {
  const stripNum = question.replace(/^\d+\.\s*/, '');
  const idx = question.indexOf(surfaceForm);
  if (idx === -1) return question;
  return question.slice(0, idx) + '《' + surfaceForm + '》' + question.slice(idx + surfaceForm.length);
}

// ── kuromoji builder ──────────────────────────────────────────────────────────
async function buildTokenizer() {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build((err, tokenizer) => {
      if (err) reject(err);
      else resolve(tokenizer);
    });
  });
}

// ── Find target word using sliding window over tokens ─────────────────────────
function findTarget(tokens, correctReading) {
  for (let windowSize = 1; windowSize <= 3; windowSize++) {
    for (let i = 0; i <= tokens.length - windowSize; i++) {
      const window = tokens.slice(i, i + windowSize);
      const surface = window.map(t => t.surface_form).join('');
      const reading = window.map(t => katakanaToHiragana(t.reading || t.surface_form)).join('');
      if (hasKanji(surface) && readingsMatch(reading, correctReading)) {
        return surface;
      }
    }
  }
  return null;
}

async function main() {
  console.log('Loading kuromoji tokenizer...');
  const tokenizer = await buildTokenizer();
  console.log('Tokenizer ready.\n');

  for (const filename of FILES) {
    const filepath = path.join(PUBLIC_DIR, filename);
    const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    let stats = { marked: 0, skipped: 0, notTypeA: 0, failed: 0 };

    for (const exam of data) {
      for (const section of exam.sections) {
        if (!section.questions) continue;

        for (const q of section.questions) {
          // Step 1: Strip any existing (possibly wrong) markers from previous run
          q.question = q.question.replace(/《/g, '').replace(/》/g, '');

          // Step 2: Determine if this is a kanji-reading (Type A) question
          //   → All choices must be pure hiragana (no kanji, no katakana except ー)
          const choices = Object.values(q.choices);
          const allHiraganaChoices = choices.every(c => isAllHiragana(c.trim()));
          if (!allHiraganaChoices) {
            stats.notTypeA++;
            continue;
          }

          // Step 3: The sentence must contain kanji (otherwise nothing to underline)
          const rawText = q.question.replace(/^\d+\.\s*/, '');
          if (!hasKanji(rawText)) {
            stats.notTypeA++;
            continue;
          }

          // Step 4: The sentence must NOT be a fill-in-blank (（ ）) or have ( )
          // For fill-in-blank questions, even if choices are hiragana, the blank is the target
          if (rawText.includes('（') || rawText.includes('(')) {
            stats.notTypeA++;
            continue;
          }

          const correctReading = q.correct_text || choices[Number(q.correct_answer) - 1];
          if (!correctReading) { stats.failed++; continue; }

          // Step 5: Use kuromoji to find the target kanji compound
          const tokens = tokenizer.tokenize(rawText);
          const target = findTarget(tokens, correctReading);

          if (target) {
            q.question = addMarkers(q.question, target);
            stats.marked++;
          } else {
            stats.failed++;
            console.log(`  [NO MATCH] ${filename} Q${q.number}: "${rawText.slice(0,50)}" → "${correctReading}"`);
          }
        }
      }
    }

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✓ ${filename}: marked=${stats.marked}, skipped=${stats.skipped}, notTypeA=${stats.notTypeA}, failed=${stats.failed}`);
  }

  console.log('\nDone. Remember to bump EXAMS_VERSION in App.tsx so browsers reload.');
}

main().catch(console.error);
