// This script documents the N4 exam data that was manually crafted
// based on authentic JLPT N4 curriculum and exam format
const n4Data = [
  {
    level: "N4",
    exam_number: 1,
    total_questions: 83,
    sections: [
      {
        section: "1",
        section_name: "文字語彙 (1) — Membaca Kanji",
        total_questions: 25,
        questions: [
          { number: 1, question: "1. 今日は天気がいいので、外で運動しました。", choices: { "1": "てんき", "2": "てんぎ", "3": "でんき", "4": "でんぎ" }, correct_answer: "1", correct_text: "てんき" },
          { number: 2, question: "2. 駅の近くに新しいスーパーができました。", choices: { "1": "ちかい", "2": "ちかく", "3": "とおい", "4": "とおく" }, correct_answer: "2", correct_text: "ちかく" },
          { number: 3, question: "3. 毎朝、新聞を読む習慣があります。", choices: { "1": "まいあさ", "2": "まいちょう", "3": "まいひ", "4": "まいにち" }, correct_answer: "1", correct_text: "まいあさ" },
          { number: 4, question: "4. 先週の旅行はとても楽しかったです。", choices: { "1": "せんしゅ", "2": "せんしゅう", "3": "さくしゅ", "4": "さくしゅう" }, correct_answer: "2", correct_text: "せんしゅう" },
          { number: 5, question: "5. この映画は有名な俳優が出ています。", choices: { "1": "ゆうめい", "2": "ゆめい", "3": "ゆうめ", "4": "ゆめ" }, correct_answer: "1", correct_text: "ゆうめい" },
          { number: 6, question: "6. 昨日、友達の誕生日パーティーに行きました。", choices: { "1": "たんじょうび", "2": "たんじょうひ", "3": "たんしょうび", "4": "たんしょうひ" }, correct_answer: "1", correct_text: "たんじょうび" },
          { number: 7, question: "7. 図書館でレポートを書きました。", choices: { "1": "としょかん", "2": "としょうかん", "3": "とうしょかん", "4": "とうしょうかん" }, correct_answer: "1", correct_text: "としょかん" },
          { number: 8, question: "8. 電車が遅れたので、授業に遅刻しました。", choices: { "1": "おそれた", "2": "おくれた", "3": "にげた", "4": "ながれた" }, correct_answer: "2", correct_text: "おくれた" },
          { number: 9, question: "9. 体の具合が悪いので、病院へ行きます。", choices: { "1": "ぐあい", "2": "ぐわい", "3": "くあい", "4": "くわい" }, correct_answer: "1", correct_text: "ぐあい" },
          { number: 10, question: "10. 荷物が重くて、一人では持てません。", choices: { "1": "おもくて", "2": "かるくて", "3": "おおきくて", "4": "ちいさくて" }, correct_answer: "1", correct_text: "おもくて" },
          { number: 11, question: "11. 日曜日に家族で映画を見に行きます。", choices: { "1": "にちようび", "2": "にちようひ", "3": "にちよび", "4": "にちよひ" }, correct_answer: "1", correct_text: "にちようび" },
          { number: 12, question: "12. 大学を卒業したら、就職したいです。", choices: { "1": "そつぎょう", "2": "そつぎよう", "3": "そつきょう", "4": "そつきよう" }, correct_answer: "1", correct_text: "そつぎょう" },
          { number: 13, question: "13. 彼女は音楽が得意で、よくピアノを弾きます。", choices: { "1": "おんらく", "2": "おんがく", "3": "おとらく", "4": "おとがく" }, correct_answer: "2", correct_text: "おんがく" },
          { number: 14, question: "14. 交差点で信号が赤に変わりました。", choices: { "1": "こうさてん", "2": "こうさいてん", "3": "こうさいてん", "4": "こうざてん" }, correct_answer: "1", correct_text: "こうさてん" },
          { number: 15, question: "15. 冬になると、空気が乾燥します。", choices: { "1": "かんそう", "2": "かんぞう", "3": "かんそ", "4": "かんぞ" }, correct_answer: "1", correct_text: "かんそう" },
          { number: 16, question: "16. 弟は今年、中学校に入学しました。", choices: { "1": "おとうと", "2": "おとと", "3": "いもうと", "4": "いもと" }, correct_answer: "1", correct_text: "おとうと" },
          { number: 17, question: "17. 試験の前に、しっかり復習しました。", choices: { "1": "ふくしゅ", "2": "ふくしゅう", "3": "ふっしゅ", "4": "ふっしゅう" }, correct_answer: "2", correct_text: "ふくしゅう" },
          { number: 18, question: "18. 料理が上手になるために、毎日練習しています。", choices: { "1": "りょうり", "2": "りょり", "3": "りょうれ", "4": "りょれ" }, correct_answer: "1", correct_text: "りょうり" },
          { number: 19, question: "19. この地域では、夏に祭りがあります。", choices: { "1": "まつり", "2": "まつれ", "3": "みつり", "4": "みつれ" }, correct_answer: "1", correct_text: "まつり" },
          { number: 20, question: "20. 会議は午後2時から始まります。", choices: { "1": "かいぎ", "2": "かいき", "3": "かえぎ", "4": "かえき" }, correct_answer: "1", correct_text: "かいぎ" },
          { number: 21, question: "21. 彼は正直な人で、嘘をつきません。", choices: { "1": "しょうじき", "2": "しょうじく", "3": "しょじき", "4": "しょじく" }, correct_answer: "1", correct_text: "しょうじき" },
          { number: 22, question: "22. 台風が近づいているので、外出しないでください。", choices: { "1": "たいふ", "2": "たいふう", "3": "だいふ", "4": "だいふう" }, correct_answer: "2", correct_text: "たいふう" },
          { number: 23, question: "23. 窓を開けると、涼しい風が入ってきました。", choices: { "1": "すずしい", "2": "すずしき", "3": "すずしく", "4": "すずしい" }, correct_answer: "1", correct_text: "すずしい" },
          { number: 24, question: "24. 引っ越しの準備で忙しくて、ゆっくりできません。", choices: { "1": "じゅんび", "2": "じゅんひ", "3": "じゅびん", "4": "じゅひん" }, correct_answer: "1", correct_text: "じゅんび" },
          { number: 25, question: "25. 父は毎朝、健康のためにジョギングをしています。", choices: { "1": "けんこう", "2": "けんごう", "3": "けんこ", "4": "けんご" }, correct_answer: "1", correct_text: "けんこう" }
        ]
      },
      {
        section: "2",
        section_name: "文字語彙 (2) — Kosakata & Pilihan Kata",
        total_questions: 23,
        questions: [
          { number: 26, question: "26. ここに名前をかいてください。", choices: { "1": "書いて", "2": "描いて", "3": "掛いて", "4": "懸いて" }, correct_answer: "1", correct_text: "書いて" },
          { number: 27, question: "27. 電話でこたえを聞きました。", choices: { "1": "読え", "2": "答え", "3": "数え", "4": "考え" }, correct_answer: "2", correct_text: "答え" },
          { number: 28, question: "28. 彼は（ ）が高くて、みんなに親切です。", choices: { "1": "こころ", "2": "はな", "3": "め", "4": "かお" }, correct_answer: "1", correct_text: "こころ" },
          { number: 29, question: "29. 薬を飲んだら、すぐに（ ）がよくなりました。", choices: { "1": "ぐあい", "2": "こころ", "3": "いろ", "4": "かたち" }, correct_answer: "1", correct_text: "ぐあい" },
          { number: 30, question: "30. 財布を（ ）してしまって、困っています。", choices: { "1": "なくした", "2": "みつけた", "3": "もらった", "4": "あげた" }, correct_answer: "1", correct_text: "なくした" },
          { number: 31, question: "31. 電車の中で（ ）を読んでいる人が多いです。", choices: { "1": "スマートフォン", "2": "パソコン", "3": "テレビ", "4": "ラジオ" }, correct_answer: "1", correct_text: "スマートフォン" },
          { number: 32, question: "32. 道が（ ）から、早めに出発しましょう。", choices: { "1": "こんでいる", "2": "すいている", "3": "ながれている", "4": "はしっている" }, correct_answer: "1", correct_text: "こんでいる" },
          { number: 33, question: "33. 天気予報によると、明日は雨が（ ）そうです。", choices: { "1": "ふる", "2": "あたる", "3": "でる", "4": "くる" }, correct_answer: "1", correct_text: "ふる" },
          { number: 34, question: "34. 彼女は（ ）が上手で、いつもきれいです。", choices: { "1": "おしゃれ", "2": "かがく", "3": "りょうり", "4": "うんどう" }, correct_answer: "1", correct_text: "おしゃれ" },
          { number: 35, question: "35. 仕事が（ ）になって、やっと休めます。", choices: { "1": "おわり", "2": "はじまり", "3": "まんなか", "4": "さいご" }, correct_answer: "1", correct_text: "おわり" },
          { number: 36, question: "36. この店は（ ）がいいので、いつも満員です。", choices: { "1": "ひょうばん", "2": "かかく", "3": "いろ", "4": "かたち" }, correct_answer: "1", correct_text: "ひょうばん" },
          { number: 37, question: "37. 雨が（ ）きたので、傘を持って出ました。", choices: { "1": "ふって", "2": "あがって", "3": "やんで", "4": "ながれて" }, correct_answer: "1", correct_text: "ふって" },
          { number: 38, question: "38. 子どものころ、よく（ ）で遊びました。", choices: { "1": "こうえん", "2": "かいしゃ", "3": "びょういん", "4": "ぎんこう" }, correct_answer: "1", correct_text: "こうえん" },
          { number: 39, question: "39. 荷物が（ ）て、エレベーターを使いました。", choices: { "1": "おもく", "2": "かるく", "3": "おおきく", "4": "ちいさく" }, correct_answer: "1", correct_text: "おもく" },
          { number: 40, question: "40. 食事の前に（ ）を洗います。", choices: { "1": "て", "2": "あし", "3": "かお", "4": "くち" }, correct_answer: "1", correct_text: "て" },
          { number: 41, question: "41. 電気を（ ）忘れて、部屋が暗くなってしまいました。", choices: { "1": "けすのを", "2": "つけるのを", "3": "いれるのを", "4": "だすのを" }, correct_answer: "1", correct_text: "けすのを" },
          { number: 42, question: "42. 彼は（ ）な性格で、何でも諦めません。", choices: { "1": "まじめ", "2": "のんき", "3": "うっかり", "4": "いいかげん" }, correct_answer: "1", correct_text: "まじめ" },
          { number: 43, question: "43. 明日の朝は早起きしなければならないから、（ ）に寝ます。", choices: { "1": "はやめ", "2": "おそめ", "3": "すこし", "4": "たくさん" }, correct_answer: "1", correct_text: "はやめ" },
          { number: 44, question: "44. 友達からプレゼントを（ ）、とてもうれしかったです。", choices: { "1": "もらって", "2": "あげて", "3": "やって", "4": "くれて" }, correct_answer: "1", correct_text: "もらって" },
          { number: 45, question: "45. 部屋の（ ）を開けて、換気しました。", choices: { "1": "まど", "2": "ドア", "3": "てんじょう", "4": "かべ" }, correct_answer: "1", correct_text: "まど" },
          { number: 46, question: "46. この映画は（ ）がとても面白いです。", choices: { "1": "ストーリー", "2": "カラー", "3": "サイズ", "4": "タイプ" }, correct_answer: "1", correct_text: "ストーリー" },
          { number: 47, question: "47. 試験の結果が（ ）て、とても緊張しました。", choices: { "1": "きになっ", "2": "おもしろくなっ", "3": "たのしくなっ", "4": "よくなっ" }, correct_answer: "1", correct_text: "きになっ" },
          { number: 48, question: "48. 病気が（ ）するように、薬を飲んでいます。", choices: { "1": "かいふく", "2": "はじまり", "3": "おわり", "4": "つづき" }, correct_answer: "1", correct_text: "かいふく" }
        ]
      },
      {
        section: "3",
        section_name: "文法 — Tata Bahasa",
        total_questions: 25,
        questions: [
          { number: 49, question: "49. 日本語を勉強し（ ）、もっと上手になりたいです。", choices: { "1": "ながら", "2": "ために", "3": "つつ", "4": "ても" }, correct_answer: "2", correct_text: "ために" },
          { number: 50, question: "50. 彼女が来る（ ）、準備を始めましょう。", choices: { "1": "まえに", "2": "あとで", "3": "とき", "4": "ために" }, correct_answer: "1", correct_text: "まえに" },
          { number: 51, question: "51. 薬を飲ん（ ）、早く寝てください。", choices: { "1": "で", "2": "から", "3": "ので", "4": "ても" }, correct_answer: "2", correct_text: "から" },
          { number: 52, question: "52. 友達（ ）プレゼントをもらいました。", choices: { "1": "に", "2": "で", "3": "から", "4": "を" }, correct_answer: "3", correct_text: "から" },
          { number: 53, question: "53. 先生（ ）日本語を教えていただきました。", choices: { "1": "が", "2": "に", "3": "で", "4": "を" }, correct_answer: "2", correct_text: "に" },
          { number: 54, question: "54. この仕事は私（ ）できません。", choices: { "1": "には", "2": "でも", "3": "だけ", "4": "しか" }, correct_answer: "1", correct_text: "には" },
          { number: 55, question: "55. 電車が遅れ（ ）、会議に間に合いませんでした。", choices: { "1": "たので", "2": "てから", "3": "ながら", "4": "ように" }, correct_answer: "1", correct_text: "たので" },
          { number: 56, question: "56. 毎日練習すれ（ ）、上手になります。", choices: { "1": "ば", "2": "から", "3": "ので", "4": "けど" }, correct_answer: "1", correct_text: "ば" },
          { number: 57, question: "57. 彼は一生懸命勉強し（ ）、試験に合格しました。", choices: { "1": "て", "2": "で", "3": "に", "4": "が" }, correct_answer: "1", correct_text: "て" },
          { number: 58, question: "58. 彼女はピアノ（ ）、ギターも弾けます。", choices: { "1": "だけでなく", "2": "しかなく", "3": "だけ", "4": "しか" }, correct_answer: "1", correct_text: "だけでなく" },
          { number: 59, question: "59. 今日（ ）昨日より暑いですね。", choices: { "1": "は", "2": "が", "3": "も", "4": "に" }, correct_answer: "1", correct_text: "は" },
          { number: 60, question: "60. 宿題を（ ）から、テレビを見てもいいですか。", choices: { "1": "した", "2": "して", "3": "する", "4": "しない" }, correct_answer: "1", correct_text: "した" },
          { number: 61, question: "61. もっと早く来（ ）よかったです。", choices: { "1": "れば", "2": "ば", "3": "ても", "4": "たら" }, correct_answer: "1", correct_text: "れば" },
          { number: 62, question: "62. 病気なの（ ）、学校へ行かなければなりません。", choices: { "1": "に", "2": "で", "3": "が", "4": "は" }, correct_answer: "1", correct_text: "に" },
          { number: 63, question: "63. 先生に（ ）、試験に合格しました。", choices: { "1": "おしえていただいて", "2": "おしえてあげて", "3": "おしえてもらって", "4": "おしえてくれて" }, correct_answer: "1", correct_text: "おしえていただいて" },
          { number: 64, question: "64. 子供の時（ ）、よく外で遊びました。", choices: { "1": "は", "2": "に", "3": "が", "4": "を" }, correct_answer: "1", correct_text: "は" },
          { number: 65, question: "65. 彼女はもうここ（ ）いません。", choices: { "1": "に", "2": "で", "3": "が", "4": "を" }, correct_answer: "1", correct_text: "に" },
          { number: 66, question: "66. 雨（ ）ふっています。", choices: { "1": "が", "2": "で", "3": "に", "4": "は" }, correct_answer: "1", correct_text: "が" },
          { number: 67, question: "67. 日本に来てから3年（ ）なります。", choices: { "1": "に", "2": "が", "3": "も", "4": "で" }, correct_answer: "1", correct_text: "に" },
          { number: 68, question: "68. 彼女はとても（ ）人です。やさしくて、思いやりがあります。", choices: { "1": "すてきな", "2": "おかしな", "3": "へんな", "4": "ひどい" }, correct_answer: "1", correct_text: "すてきな" },
          { number: 69, question: "69. 試験が終わっ（ ）、友達と遊びに行きます。", choices: { "1": "たら", "2": "から", "3": "ながら", "4": "ても" }, correct_answer: "1", correct_text: "たら" },
          { number: 70, question: "70. 病院（ ）薬をもらいました。", choices: { "1": "で", "2": "に", "3": "へ", "4": "から" }, correct_answer: "1", correct_text: "で" },
          { number: 71, question: "71. 私は毎朝、ジョギングをする（ ）にしています。", choices: { "1": "こと", "2": "もの", "3": "ため", "4": "ほう" }, correct_answer: "1", correct_text: "こと" },
          { number: 72, question: "72. この映画は子ども（ ）も楽しめます。", choices: { "1": "でも", "2": "しか", "3": "だけ", "4": "ばかり" }, correct_answer: "1", correct_text: "でも" },
          { number: 73, question: "73. 宿題をしない（ ）、先生に怒られました。", choices: { "1": "で", "2": "から", "3": "ので", "4": "て" }, correct_answer: "1", correct_text: "で" }
        ]
      },
      {
        section: "4",
        section_name: "読解 — Pemahaman Bacaan",
        total_questions: 10,
        questions: [
          { number: 74, question: "74. 次の文章を読んで、質問に答えてください。\n\n「私は毎日、朝6時に起きます。朝ごはんを食べてから、7時に家を出ます。電車で会社まで行きます。会社は駅から歩いて10分です。」\n\n筆者は何時に家を出ますか。", choices: { "1": "6時", "2": "7時", "3": "8時", "4": "9時" }, correct_answer: "2", correct_text: "7時" },
          { number: 75, question: "75. （前の文章を参照）会社は駅からどれくらいかかりますか。", choices: { "1": "5分", "2": "10分", "3": "15分", "4": "20分" }, correct_answer: "2", correct_text: "10分" },
          { number: 76, question: "76. 次のお知らせを読んでください。\n\n「図書館のお知らせ：本の貸出期間は2週間です。延長したい場合は、カウンターにお申し出ください。」\n\n本を借りてどのくらいで返さなければなりませんか。", choices: { "1": "1週間", "2": "2週間", "3": "3週間", "4": "1ヶ月" }, correct_answer: "2", correct_text: "2週間" },
          { number: 77, question: "77. 次のメッセージを読んでください。\n\n「田中さんへ：明日の会議は午後3時から始まります。場所は会議室Aです。準備をお願いします。」\n\n会議は何時から始まりますか。", choices: { "1": "午前3時", "2": "午後2時", "3": "午後3時", "4": "午後4時" }, correct_answer: "3", correct_text: "午後3時" },
          { number: 78, question: "78. （前のメッセージを参照）会議はどこで行われますか。", choices: { "1": "会議室A", "2": "会議室B", "3": "会議室C", "4": "会議室D" }, correct_answer: "1", correct_text: "会議室A" },
          { number: 79, question: "79. 次の文章を読んでください。\n\n「私の趣味は料理です。週末にはよく新しいレシピを試します。先週は友達を呼んで、イタリア料理を作りました。みんなにとても喜ばれました。」\n\n筆者は先週何をしましたか。", choices: { "1": "一人で食事した", "2": "友達を呼んでイタリア料理を作った", "3": "レストランに行った", "4": "料理教室に行った" }, correct_answer: "2", correct_text: "友達を呼んでイタリア料理を作った" },
          { number: 80, question: "80. 次のアナウンスを読んでください。\n\n「ただいまより店内のお客様にご案内いたします。現在、1階のエレベーターは点検中のため使用できません。大変ご不便をおかけしますが、階段またはエスカレーターをご利用ください。」\n\n今、何が使えませんか。", choices: { "1": "階段", "2": "エスカレーター", "3": "1階のエレベーター", "4": "2階のエレベーター" }, correct_answer: "3", correct_text: "1階のエレベーター" },
          { number: 81, question: "81. 次の文章を読んでください。\n\n「日本の四季はとても美しいです。春には桜、夏には花火、秋には紅葉、冬には雪景色が楽しめます。」\n\n秋には何が楽しめますか。", choices: { "1": "桜", "2": "花火", "3": "紅葉", "4": "雪景色" }, correct_answer: "3", correct_text: "紅葉" },
          { number: 82, question: "82. 次の掲示を読んでください。\n\n「ゴミの出し方についてのお知らせ：燃えるゴミは月・水・金曜日、燃えないゴミは第2・第4土曜日に出してください。」\n\n燃えるゴミは何曜日に出しますか。", choices: { "1": "月・水・金曜日", "2": "火・木・土曜日", "3": "月・火・水曜日", "4": "第2・第4土曜日" }, correct_answer: "1", correct_text: "月・水・金曜日" },
          { number: 83, question: "83. 次の文章を読んでください。\n\n「私は毎週土曜日、日本語学校で勉強しています。クラスには10人の学生がいて、先生はとても丁寧に教えてくれます。今学期は敬語を中心に勉強しています。」\n\n今学期は何を中心に勉強していますか。", choices: { "1": "漢字", "2": "会話", "3": "敬語", "4": "作文" }, correct_answer: "3", correct_text: "敬語" }
        ]
      }
    ]
  },
  {
    level: "N4",
    exam_number: 2,
    total_questions: 80,
    sections: [
      {
        section: "1",
        section_name: "文字語彙 (1) — Membaca Kanji",
        total_questions: 22,
        questions: [
          { number: 1, question: "1. 夏休みに海外旅行をしたいです。", choices: { "1": "かいがい", "2": "かいうち", "3": "うちがい", "4": "うちうち" }, correct_answer: "1", correct_text: "かいがい" },
          { number: 2, question: "2. 彼女は外国語が得意です。", choices: { "1": "がいこくご", "2": "そとこくご", "3": "がいくにご", "4": "そとくにご" }, correct_answer: "1", correct_text: "がいこくご" },
          { number: 3, question: "3. 先生の説明を注意して聞きました。", choices: { "1": "ちゅうい", "2": "ちゅい", "3": "ちゅうに", "4": "ちゅに" }, correct_answer: "1", correct_text: "ちゅうい" },
          { number: 4, question: "4. 彼は親切で、いつも笑顔です。", choices: { "1": "えがお", "2": "わらいがお", "3": "えかお", "4": "わらいかお" }, correct_answer: "1", correct_text: "えがお" },
          { number: 5, question: "5. 今日の夕食は家で食べます。", choices: { "1": "ゆうしょく", "2": "ゆしょく", "3": "ゆうしょ", "4": "ゆしょ" }, correct_answer: "1", correct_text: "ゆうしょく" },
          { number: 6, question: "6. この公園には大きな池があります。", choices: { "1": "いけ", "2": "みずうみ", "3": "かわ", "4": "うみ" }, correct_answer: "1", correct_text: "いけ" },
          { number: 7, question: "7. 友達と電話で話しました。", choices: { "1": "でんわ", "2": "でんは", "3": "てんわ", "4": "てんは" }, correct_answer: "1", correct_text: "でんわ" },
          { number: 8, question: "8. 彼女は毎日日記を書いています。", choices: { "1": "にっき", "2": "にっけ", "3": "にちき", "4": "にちけ" }, correct_answer: "1", correct_text: "にっき" },
          { number: 9, question: "9. 昨日の夜、星がきれいでした。", choices: { "1": "ほし", "2": "つき", "3": "たいよう", "4": "くも" }, correct_answer: "1", correct_text: "ほし" },
          { number: 10, question: "10. 朝、シャワーを浴びてから出かけます。", choices: { "1": "あさ", "2": "よる", "3": "ひる", "4": "ゆう" }, correct_answer: "1", correct_text: "あさ" },
          { number: 11, question: "11. 冬になると、雪が降ります。", choices: { "1": "ふゆ", "2": "はる", "3": "なつ", "4": "あき" }, correct_answer: "1", correct_text: "ふゆ" },
          { number: 12, question: "12. 来週、大切な試験があります。", choices: { "1": "たいせつ", "2": "だいせつ", "3": "たいせい", "4": "だいせい" }, correct_answer: "1", correct_text: "たいせつ" },
          { number: 13, question: "13. 先週末に映画を見ました。", choices: { "1": "せんしゅうまつ", "2": "せんしゅまつ", "3": "さくしゅうまつ", "4": "さくしゅまつ" }, correct_answer: "1", correct_text: "せんしゅうまつ" },
          { number: 14, question: "14. 子供の頃、よく公園で遊びました。", choices: { "1": "こども", "2": "こおども", "3": "こうども", "4": "こうこども" }, correct_answer: "1", correct_text: "こども" },
          { number: 15, question: "15. 空港まで迎えに行きます。", choices: { "1": "くうこう", "2": "くこう", "3": "そらこう", "4": "そこう" }, correct_answer: "1", correct_text: "くうこう" },
          { number: 16, question: "16. 彼は本当に親切な人です。", choices: { "1": "しんせつ", "2": "しんせい", "3": "しんせき", "4": "しんせく" }, correct_answer: "1", correct_text: "しんせつ" },
          { number: 17, question: "17. 部屋を掃除してから、出かけました。", choices: { "1": "そうじ", "2": "そじ", "3": "そうち", "4": "そち" }, correct_answer: "1", correct_text: "そうじ" },
          { number: 18, question: "18. 彼女はフランス語が話せます。", choices: { "1": "はなせます", "2": "かけます", "3": "よめます", "4": "きけます" }, correct_answer: "1", correct_text: "はなせます" },
          { number: 19, question: "19. 台所でご飯を作っています。", choices: { "1": "だいどころ", "2": "たいどころ", "3": "だいとこ", "4": "たいとこ" }, correct_answer: "1", correct_text: "だいどころ" },
          { number: 20, question: "20. 学校の前に自転車を止めました。", choices: { "1": "じてんしゃ", "2": "じでんしゃ", "3": "しでんしゃ", "4": "しでんじゃ" }, correct_answer: "1", correct_text: "じてんしゃ" },
          { number: 21, question: "21. 今日は仕事が早く終わりました。", choices: { "1": "はやく", "2": "おそく", "3": "おおく", "4": "すくなく" }, correct_answer: "1", correct_text: "はやく" },
          { number: 22, question: "22. 弟は来年、高校に入学します。", choices: { "1": "にゅうがく", "2": "にゅうかく", "3": "にゅがく", "4": "にゅかく" }, correct_answer: "1", correct_text: "にゅうがく" }
        ]
      },
      {
        section: "2",
        section_name: "文字語彙 (2) — Kosakata & Pilihan Kata",
        total_questions: 20,
        questions: [
          { number: 23, question: "23. アルバイトを（ ）て、お金を貯めています。", choices: { "1": "し", "2": "たべ", "3": "のん", "4": "み" }, correct_answer: "1", correct_text: "し" },
          { number: 24, question: "24. この本は（ ）が難しくて、よく分かりません。", choices: { "1": "ないよう", "2": "かたち", "3": "いろ", "4": "おもさ" }, correct_answer: "1", correct_text: "ないよう" },
          { number: 25, question: "25. 電車が（ ）ので、タクシーで行くことにしました。", choices: { "1": "こんでいる", "2": "はしっている", "3": "とまっている", "4": "きている" }, correct_answer: "1", correct_text: "こんでいる" },
          { number: 26, question: "26. 明日の天気が（ ）なので、傘を持っていきます。", choices: { "1": "しんぱい", "2": "たのしみ", "3": "うれしい", "4": "かなしい" }, correct_answer: "1", correct_text: "しんぱい" },
          { number: 27, question: "27. 仕事が終わってから、（ ）で食事をしました。", choices: { "1": "レストラン", "2": "スーパー", "3": "コンビニ", "4": "デパート" }, correct_answer: "1", correct_text: "レストラン" },
          { number: 28, question: "28. 新しい仕事に（ ）するのは大変です。", choices: { "1": "なれ", "2": "はじめ", "3": "おわり", "4": "つづけ" }, correct_answer: "1", correct_text: "なれ" },
          { number: 29, question: "29. 彼は（ ）な人で、約束を守ります。", choices: { "1": "まじめ", "2": "いいかげん", "3": "うっかり", "4": "のんき" }, correct_answer: "1", correct_text: "まじめ" },
          { number: 30, question: "30. 電話番号を（ ）に書きました。", choices: { "1": "メモ", "2": "テスト", "3": "レポート", "4": "ニュース" }, correct_answer: "1", correct_text: "メモ" },
          { number: 31, question: "31. この映画は（ ）が素晴らしいです。", choices: { "1": "えんぎ", "2": "かたち", "3": "いろ", "4": "おもさ" }, correct_answer: "1", correct_text: "えんぎ" },
          { number: 32, question: "32. 先生に質問して、（ ）が分かりました。", choices: { "1": "こたえ", "2": "もんだい", "3": "しつもん", "4": "いみ" }, correct_answer: "1", correct_text: "こたえ" },
          { number: 33, question: "33. 旅行の（ ）として、お土産を買いました。", choices: { "1": "おみやげ", "2": "りょこう", "3": "ひこうき", "4": "ホテル" }, correct_answer: "1", correct_text: "おみやげ" },
          { number: 34, question: "34. 仕事の（ ）が悪くて、上司に叱られました。", choices: { "1": "けっか", "2": "げんいん", "3": "もくてき", "4": "かてい" }, correct_answer: "1", correct_text: "けっか" },
          { number: 35, question: "35. この店は（ ）がとても安いです。", choices: { "1": "ねだん", "2": "かたち", "3": "いろ", "4": "おもさ" }, correct_answer: "1", correct_text: "ねだん" },
          { number: 36, question: "36. 彼女の（ ）に驚きました。とても上手でした。", choices: { "1": "うたごえ", "2": "かおいろ", "3": "てつき", "4": "あしもと" }, correct_answer: "1", correct_text: "うたごえ" },
          { number: 37, question: "37. 子供は（ ）に乗ることが好きです。", choices: { "1": "じてんしゃ", "2": "しんぶん", "3": "ほん", "4": "えんぴつ" }, correct_answer: "1", correct_text: "じてんしゃ" },
          { number: 38, question: "38. 電気が（ ）から、ろうそくに火をつけました。", choices: { "1": "きえた", "2": "ついた", "3": "でた", "4": "はいった" }, correct_answer: "1", correct_text: "きえた" },
          { number: 39, question: "39. 病気の時、（ ）が大切です。", choices: { "1": "やすみ", "2": "うごき", "3": "はしり", "4": "とびはね" }, correct_answer: "1", correct_text: "やすみ" },
          { number: 40, question: "40. 彼女は（ ）が上手で、コンクールで優勝しました。", choices: { "1": "ピアノ", "2": "りょうり", "3": "えいご", "4": "すいえい" }, correct_answer: "1", correct_text: "ピアノ" },
          { number: 41, question: "41. バスが（ ）ので、走って追いかけました。", choices: { "1": "でてしまった", "2": "きた", "3": "とまった", "4": "まった" }, correct_answer: "1", correct_text: "でてしまった" },
          { number: 42, question: "42. 友達の（ ）に行ったら、留守でした。", choices: { "1": "いえ", "2": "がっこう", "3": "かいしゃ", "4": "びょういん" }, correct_answer: "1", correct_text: "いえ" }
        ]
      },
      {
        section: "3",
        section_name: "文法 — Tata Bahasa",
        total_questions: 28,
        questions: [
          { number: 43, question: "43. 雨が降っている（ ）、外へ出かけたくないです。", choices: { "1": "ので", "2": "から", "3": "が", "4": "けど" }, correct_answer: "1", correct_text: "ので" },
          { number: 44, question: "44. 彼は日本語（ ）英語も話せます。", choices: { "1": "だけでなく", "2": "しか", "3": "だけ", "4": "ばかり" }, correct_answer: "1", correct_text: "だけでなく" },
          { number: 45, question: "45. 勉強しなかった（ ）、試験に落ちました。", choices: { "1": "から", "2": "ので", "3": "が", "4": "けど" }, correct_answer: "1", correct_text: "から" },
          { number: 46, question: "46. 彼女にプレゼント（ ）あげました。", choices: { "1": "を", "2": "が", "3": "に", "4": "で" }, correct_answer: "1", correct_text: "を" },
          { number: 47, question: "47. 明日のパーティーに行く（ ）、行かない（ ）、まだ決めていません。", choices: { "1": "か／か", "2": "し／し", "3": "て／て", "4": "で／で" }, correct_answer: "1", correct_text: "か／か" },
          { number: 48, question: "48. もし時間があれ（ ）、映画を見に行きましょう。", choices: { "1": "ば", "2": "て", "3": "から", "4": "ので" }, correct_answer: "1", correct_text: "ば" },
          { number: 49, question: "49. 彼（ ）と話すのはいつも楽しいです。", choices: { "1": "と", "2": "に", "3": "が", "4": "で" }, correct_answer: "1", correct_text: "と" },
          { number: 50, question: "50. 日本語を勉強しているうち（ ）、友達ができました。", choices: { "1": "に", "2": "で", "3": "が", "4": "を" }, correct_answer: "1", correct_text: "に" },
          { number: 51, question: "51. 仕事が終わっ（ ）、すぐに帰りました。", choices: { "1": "たら", "2": "から", "3": "ので", "4": "ながら" }, correct_answer: "1", correct_text: "たら" },
          { number: 52, question: "52. もっと早く起き（ ）よかったと思います。", choices: { "1": "れば", "2": "て", "3": "た", "4": "る" }, correct_answer: "1", correct_text: "れば" },
          { number: 53, question: "53. 電車に乗って（ ）、忘れ物に気づきました。", choices: { "1": "から", "2": "ので", "3": "が", "4": "けど" }, correct_answer: "1", correct_text: "から" },
          { number: 54, question: "54. 彼女はテニス（ ）得意です。", choices: { "1": "が", "2": "に", "3": "で", "4": "を" }, correct_answer: "1", correct_text: "が" },
          { number: 55, question: "55. 先生に質問する（ ）できます。", choices: { "1": "こと", "2": "もの", "3": "ほう", "4": "ため" }, correct_answer: "1", correct_text: "こと" },
          { number: 56, question: "56. この仕事は難しい（ ）、面白いです。", choices: { "1": "けど", "2": "から", "3": "ので", "4": "のに" }, correct_answer: "1", correct_text: "けど" },
          { number: 57, question: "57. 体の具合が悪い（ ）、病院へ行ってください。", choices: { "1": "なら", "2": "から", "3": "ので", "4": "が" }, correct_answer: "1", correct_text: "なら" },
          { number: 58, question: "58. 彼女は毎朝コーヒーを飲む（ ）にしています。", choices: { "1": "こと", "2": "もの", "3": "ため", "4": "ほう" }, correct_answer: "1", correct_text: "こと" },
          { number: 59, question: "59. 頑張れ（ ）、きっと合格できます。", choices: { "1": "ば", "2": "て", "3": "から", "4": "ので" }, correct_answer: "1", correct_text: "ば" },
          { number: 60, question: "60. 今日は（ ）暑くて、外に出たくないです。", choices: { "1": "とても", "2": "あまり", "3": "ぜんぜん", "4": "ちょっと" }, correct_answer: "1", correct_text: "とても" },
          { number: 61, question: "61. 友達（ ）贈り物をもらいました。", choices: { "1": "から", "2": "に", "3": "へ", "4": "で" }, correct_answer: "1", correct_text: "から" },
          { number: 62, question: "62. 宿題が（ ）から、テレビを見ます。", choices: { "1": "おわった", "2": "おわる", "3": "おわり", "4": "おわって" }, correct_answer: "1", correct_text: "おわった" },
          { number: 63, question: "63. 日本に来た時、日本語が全然（ ）ませんでした。", choices: { "1": "わかり", "2": "はなし", "3": "かき", "4": "よみ" }, correct_answer: "1", correct_text: "わかり" },
          { number: 64, question: "64. 図書館では静か（ ）してください。", choices: { "1": "に", "2": "で", "3": "を", "4": "が" }, correct_answer: "1", correct_text: "に" },
          { number: 65, question: "65. 彼は私（ ）日本語を教えてくれました。", choices: { "1": "に", "2": "が", "3": "で", "4": "を" }, correct_answer: "1", correct_text: "に" },
          { number: 66, question: "66. 天気が良い（ ）から、ピクニックに行きましょう。", choices: { "1": "の", "2": "こと", "3": "もの", "4": "ため" }, correct_answer: "1", correct_text: "の" },
          { number: 67, question: "67. この料理は辛く（ ）、食べられません。", choices: { "1": "て", "2": "から", "3": "ので", "4": "けど" }, correct_answer: "1", correct_text: "て" },
          { number: 68, question: "68. 試験のために一生懸命勉強（ ）います。", choices: { "1": "して", "2": "に", "3": "が", "4": "で" }, correct_answer: "1", correct_text: "して" },
          { number: 69, question: "69. 母（ ）作った料理はおいしいです。", choices: { "1": "が", "2": "に", "3": "で", "4": "を" }, correct_answer: "1", correct_text: "が" },
          { number: 70, question: "70. 彼女はいつも笑顔で、（ ）な人です。", choices: { "1": "あかるい", "2": "くらい", "3": "おとなしい", "4": "きびしい" }, correct_answer: "1", correct_text: "あかるい" }
        ]
      },
      {
        section: "4",
        section_name: "読解 — Pemahaman Bacaan",
        total_questions: 10,
        questions: [
          { number: 71, question: "71. 次の文章を読んでください。\n\n「私は毎朝、コーヒーを飲みながら新聞を読みます。これが私の朝のルーティンです。この習慣を続けて10年になります。」\n\n筆者は毎朝何をしますか。", choices: { "1": "コーヒーを飲みながら新聞を読む", "2": "テレビを見ながら朝食を食べる", "3": "音楽を聴きながら散歩する", "4": "ジョギングをしながら音楽を聴く" }, correct_answer: "1", correct_text: "コーヒーを飲みながら新聞を読む" },
          { number: 72, question: "72. 次の案内を読んでください。\n\n「水泳教室のご案内：毎週火曜日・木曜日、午後7時〜8時半。対象：18歳以上の方。参加費：月3,000円。申し込み先：受付まで。」\n\n水泳教室は何曜日に開催されますか。", choices: { "1": "月曜日・水曜日", "2": "火曜日・木曜日", "3": "水曜日・金曜日", "4": "木曜日・土曜日" }, correct_answer: "2", correct_text: "火曜日・木曜日" },
          { number: 73, question: "73. （前の案内を参照）参加費はいくらですか。", choices: { "1": "月1,000円", "2": "月2,000円", "3": "月3,000円", "4": "月4,000円" }, correct_answer: "3", correct_text: "月3,000円" },
          { number: 74, question: "74. 次の文章を読んでください。\n\n「私は先月、新しいスマートフォンを買いました。以前のものより画面が大きくて、写真がきれいに撮れます。でも、値段が高かったので、少し後悔しています。」\n\n筆者はなぜ後悔していますか。", choices: { "1": "スマートフォンの画面が小さいから", "2": "写真がきれいに撮れないから", "3": "値段が高かったから", "4": "使い方が難しいから" }, correct_answer: "3", correct_text: "値段が高かったから" },
          { number: 75, question: "75. 次のメモを読んでください。\n\n「田中様：山田さんから電話がありました。明日の打ち合わせの時間を午後2時から午後3時に変更したいとのことです。問題なければ、折り返し電話をお願いします。」\n\n打ち合わせの時間はどのように変わりますか。", choices: { "1": "午前10時から午前11時に変更", "2": "午後1時から午後2時に変更", "3": "午後2時から午後3時に変更", "4": "午後3時から午後4時に変更" }, correct_answer: "3", correct_text: "午後2時から午後3時に変更" },
          { number: 76, question: "76. 次の文章を読んでください。\n\n「日本では、春に花見をする習慣があります。友達や家族と公園に集まって、桜の木の下でお弁当を食べたり、お酒を飲んだりします。この時期、公園はとても賑やかになります。」\n\n花見はいつ行われますか。", choices: { "1": "夏", "2": "秋", "3": "冬", "4": "春" }, correct_answer: "4", correct_text: "春" },
          { number: 77, question: "77. （前の文章を参照）花見の時、人々は何をしますか。", choices: { "1": "山に登る", "2": "海で泳ぐ", "3": "公園でお弁当を食べたりお酒を飲んだりする", "4": "家でテレビを見る" }, correct_answer: "3", correct_text: "公園でお弁当を食べたりお酒を飲んだりする" },
          { number: 78, question: "78. 次の掲示板を読んでください。\n\n「本日のバスの運行について：○○線は工事のため、本日終日運休となります。代替交通機関として、臨時シャトルバスを運行します。詳細は窓口までお問い合わせください。」\n\n今日の○○線はどうなっていますか。", choices: { "1": "通常通り運行している", "2": "一部運休している", "3": "終日運休している", "4": "遅延している" }, correct_answer: "3", correct_text: "終日運休している" },
          { number: 79, question: "79. 次の文章を読んでください。\n\n「私の趣味はガーデニングです。毎週末、庭でいろいろな花や野菜を育てています。最近は、家庭菜園が流行っていて、自分で育てた野菜を食べるのが楽しみです。」\n\n筆者の趣味は何ですか。", choices: { "1": "料理", "2": "ガーデニング", "3": "スポーツ", "4": "音楽" }, correct_answer: "2", correct_text: "ガーデニング" },
          { number: 80, question: "80. （前の文章を参照）筆者は最近何が楽しみですか。", choices: { "1": "花を育てること", "2": "自分で育てた野菜を食べること", "3": "公園を散歩すること", "4": "友達とガーデニングをすること" }, correct_answer: "2", correct_text: "自分で育てた野菜を食べること" }
        ]
      }
    ]
  }
];

const fs = require('fs');
fs.writeFileSync('output.json', JSON.stringify(n4Data, null, 2));
console.log('Total questions exam 1:', n4Data[0].total_questions);
console.log('Total questions exam 2:', n4Data[1].total_questions);
console.log('Grand total:', n4Data[0].total_questions + n4Data[1].total_questions);
