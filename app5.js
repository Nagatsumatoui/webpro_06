"use strict";
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if( num==3 ) cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgement = ''; 
  if (hand === cpu) { 
      judgement = 'あいこ';
  } else if ( 
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー') 
  ) {
  // 今はダミーで人間の勝ちにしておく
  judgement = '勝ち';
  win += 1;
} else {
  judgement = '負け';
}
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  res.render( 'janken', display );
});

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});
// トップページ
app.get("/", (req, res) => {
  res.render("index");
});

// LoLトップチャンピオン一覧
let lolChamps = [
  { id: 1, name: "アーゴット", range: "Ranged", damage: "AD", role: "Fighter" },
  { id: 2, name: "アンベッサ", range: "Melee", damage: "AD", role: "Fighter / Assassin" },
  { id: 3, name: "イラオイ", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 4, name: "イレリア", range: "Melee", damage: "AD / Mixed", role: "Fighter" },
  { id: 5, name: "エイトロックス", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 6, name: "オーロラ", range: "Ranged", damage: "AP", role: "Mage" },
  { id: 7, name: "オラフ", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 8, name: "オーン", range: "Melee", damage: "Mixed", role: "Tank" },
  { id: 9, name: "カ・サンテ", range: "Melee", damage: "AD / Tank", role: "Tank / Fighter" },
  { id: 10, name: "カシオペア", range: "Ranged", damage: "AP", role: "Mage" },
  { id: 11, name: "カミール", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 12, name: "ガングプランク", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 13, name: "ガレン", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 14, name: "クイン", range: "Ranged", damage: "AD", role: "Marksman" },
  { id: 15, name: "グラガス", range: "Melee", damage: "AP", role: "Tank / Mage" },
  { id: 16, name: "グウェン", range: "Melee", damage: "AP / True", role: "Fighter" },
  { id: 17, name: "ケイル", range: "Ranged", damage: "Mixed", role: "Mage / Marksman" },
  { id: 18, name: "ケネン", range: "Ranged", damage: "AP", role: "Mage" },
  { id: 19, name: "サイオン", range: "Melee", damage: "AD / Tank", role: "Tank" },
  { id: 20, name: "ザーヘン", range: "Melee", damage: "AD", role: "Fighter / Assassin" },
  { id: 21, name: "ザック", range: "Melee", damage: "AP", role: "Tank" },
  { id: 22, name: "シェン", range: "Melee", damage: "Mixed", role: "Tank" },
  { id: 23, name: "ジェイス", range: "Ranged", damage: "AD", role: "Fighter / Marksman" },
  { id: 24, name: "ジャックス", range: "Melee", damage: "Mixed", role: "Fighter" },
  { id: 25, name: "シンジド", range: "Melee", damage: "AP", role: "Tank / Mage" },
  { id: 26, name: "セト", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 27, name: "ダリウス", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 28, name: "チョ＝ガス", range: "Melee", damage: "AP / True", role: "Tank / Mage" },
  { id: 29, name: "ティーモ", range: "Ranged", damage: "AP", role: "Mage / Marksman" },
  { id: 30, name: "トランドル", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 31, name: "トリンダメア", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 32, name: "ドクター・ムンド", range: "Melee", damage: "Mixed", role: "Tank" },
  { id: 33, name: "ナー", range: "Ranged", damage: "AD", role: "Fighter / Tank" },
  { id: 34, name: "ナサス", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 35, name: "パンテオン", range: "Melee", damage: "AD", role: "Fighter / Assassin" },
  { id: 36, name: "フィオラ", range: "Melee", damage: "AD / True", role: "Fighter" },
  { id: 37, name: "ブラッドミア", range: "Ranged", damage: "AP", role: "Mage" },
  { id: 38, name: "ポッピー", range: "Melee", damage: "AD", role: "Tank" },
  { id: 39, name: "ボリベア", range: "Melee", damage: "Mixed", role: "Fighter / Tank" },
  { id: 40, name: "マルファイト", range: "Melee", damage: "AP / Tank", role: "Tank" },
  { id: 41, name: "モルデカイザー", range: "Melee", damage: "AP", role: "Fighter" },
  { id: 42, name: "ヨリック", range: "Melee", damage: "Mixed", role: "Fighter" },
  { id: 43, name: "ヨネ", range: "Melee", damage: "Mixed", role: "Fighter / Assassin" },
  { id: 44, name: "ランブル", range: "Melee", damage: "AP", role: "Fighter / Mage" },
  { id: 45, name: "リヴェン", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 46, name: "レネクトン", range: "Melee", damage: "AD", role: "Fighter" },
  { id: 47, name: "ワーウィック", range: "Melee", damage: "Mixed", role: "Fighter" }
]

// 一覧表示
app.get("/lol/champs", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('lol_list', {champs: lolChamps } );
});
//　新規作成フォーム
app.get("/lol/add", (req, res) => {
  res.render('lol_add');
});
//　新規作成の処理
app.post("/lol/add", (req, res) => {
  // 現在の最大IDを探して+1する（ID重複防止）
  const maxId = lolChamps.reduce((max, item) => item.id > max ? item.id : max, 0);
  const newId = maxId + 1;

  const newChamp = {
    id: newId,
    name: req.body.name,
    range: req.body.range,
    damage: req.body.damage,
    role: req.body.role
  };

  lolChamps.push(newChamp);
  res.redirect("/lol/champs"); 
});

//　詳細表示
app.get("/lol/champs/:id", (req, res) => {
  const id = req.params.id;
  const target = lolChamps.find(c => c.id == id);
  res.render("lol_detail", { champ: target });
});
//　編集フォーム
app.get("/lol/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = lolChamps.find(c => c.id === id);
  if (target) {
    res.render("lol_edit", { champ: target });
  } else {
    res.send("編集対象が見つかりません");
  }
});
//　編集の処理
app.post("/lol/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = lolChamps.findIndex(c => c.id === id);
  
  if (index !== -1) {
    lolChamps[index].name = req.body.name;
    lolChamps[index].range = req.body.range;
    lolChamps[index].damage = req.body.damage;
    lolChamps[index].role = req.body.role;
  }
  res.redirect("/lol/champs");
});
//　削除処理
app.get("/lol/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  lolChamps = lolChamps.filter(c => c.id !== id);
  res.redirect("/lol/champs");
});

// トップレーン 主要コアアイテムデータ
// LoLアイテムデータ（タイプ別・五十音順）
let lolItems = [
  // --- Assassin ---
  { id: 1, name: "アクシオム アーク", price: 2750, type: "Assassin", stats: "+55 AD / +18 Lethality / +20 AH" },
  { id: 2, name: "アンブラル グレイブ", price: 2500, type: "Assassin", stats: "+55 AD / +10 AH / +15 Lethality" },
  { id: 3, name: "オポチュニティー", price: 2700, type: "Assassin", stats: "+55 AD / +18 Lethality" },
  { id: 4, name: "コレクター", price: 3000, type: "Assassin", stats: "+50 AD / +25% Crit / +10 Lethality" },
  { id: 5, name: "セリルダの怨恨", price: 3000, type: "Assassin", stats: "+45 AD / +15 AH / +35% Armor Pen" },
  { id: 6, name: "毒蛇の牙", price: 2500, type: "Assassin", stats: "+55 AD / +15 Lethality" },
  { id: 7, name: "ナイト エッジ", price: 3000, type: "Assassin", stats: "+50 AD / +250 HP / +15 Lethality" },
  { id: 8, name: "ヒュブリス", price: 2950, type: "Assassin", stats: "+60 AD / +18 Lethality / +10 AH" },
  { id: 9, name: "プロフェイン ハイドラ", price: 2850, type: "Assassin", stats: "+55 AD / +18 Lethality / +10 AH" },
  { id: 10, name: "ボルテイク サイクロソード", price: 3000, type: "Assassin", stats: "+55 AD / +18 Lethality / +10 AH" },
  { id: 11, name: "妖夢の霊剣", price: 2800, type: "Assassin", stats: "+55 AD / +18 Lethality / +4% MS" },
  { id: 12, name: "赤月の刃", price: 2900, type: "Assassin", stats: "+60 AD / +15 AH" },

  // --- Fighter ---
  { id: 13, name: "ウィッツ エンド", price: 2800, type: "Fighter", stats: "+50% AS / +45 MR / +20% Tenacity" },
  { id: 14, name: "ガーディアン エンジェル", price: 3200, type: "Fighter", stats: "+45 AD / +55 Armor" },
  { id: 15, name: "ケミパンク チェーンソード", price: 3100, type: "Fighter", stats: "+45 AD / +450 HP / +15 AH" },
  { id: 16, name: "サンダード スカイ", price: 3100, type: "Fighter", stats: "+400 HP / +40 AD / +10 AH" },
  { id: 17, name: "ショウジンの矛", price: 3100, type: "Fighter", stats: "+450 HP / +45 AD" },
  { id: 18, name: "ステラックの篭手", price: 3200, type: "Fighter", stats: "+400 HP / +20% Tenacity" },
  { id: 19, name: "ストライドブレイカー", price: 3300, type: "Fighter", stats: "+450 HP / +40 AD / +25% AS" },
  { id: 20, name: "タイタン ハイドラ", price: 3300, type: "Fighter", stats: "+40 AD / +600 HP" },
  { id: 21, name: "デス ダンス", price: 3300, type: "Fighter", stats: "+60 AD / +50 Armor / +15 AH" },
  { id: 22, name: "トリニティ フォース", price: 3333, type: "Fighter", stats: "+333 HP / +36 AD / +30% AS / +15 AH" },
  { id: 23, name: "ハルブレイカー", price: 3000, type: "Fighter", stats: "+40 AD / +500 HP / +4% MS" },
  { id: 24, name: "ブラック クリーバー", price: 3000, type: "Fighter", stats: "+40 AD / +400 HP / +20 AH" },
  { id: 25, name: "マナムネ", price: 2900, type: "Fighter", stats: "+35 AD / +500 Mana / +15 AH" },
  { id: 26, name: "マルモティウスの胃袋", price: 3100, type: "Fighter", stats: "+60 AD / +40 MR / +15 AH" },
  { id: 27, name: "マーキュリアル シミター", price: 3200, type: "Fighter", stats: "+50 AD / +35 MR / +10% Life Steal" },
  { id: 28, name: "ムラマナ", price: 2900, type: "Fighter", stats: "+35 AD / +860 Mana / +15 AH" },
  { id: 29, name: "ラヴァナス ハイドラ", price: 3300, type: "Fighter", stats: "+65 AD / +15 AH / +12% Life Steal" },
  { id: 30, name: "ルインドキング ブレード", price: 3200, type: "Fighter", stats: "+40 AD / +25% AS / +10% Life Steal" },
  { id: 31, name: "実験的ヘクスプレート", price: 3000, type: "Fighter", stats: "+450 HP / +40 AD / +20% AS" },
  { id: 32, name: "覇王のブラッドメイル", price: 3300, type: "Fighter", stats: "+550 HP / +30 AD" },

  // --- Mage ---
  { id: 33, name: "アークエンジェル スタッフ", price: 2900, type: "Mage", stats: "+70 AP / +600 Mana / +25 AH" },
  { id: 34, name: "クリプトブルーム", price: 3000, type: "Mage", stats: "+75 AP / +20 AH / +30% Magic Pen" },
  { id: 35, name: "黒炎のトーチ", price: 2800, type: "Mage", stats: "+80 AP / +600 Mana / +20 AH" },
  { id: 36, name: "コズミック ドライブ", price: 3000, type: "Mage", stats: "+350 HP / +70 AP / +25 AH / +5% MS" },
  { id: 37, name: "シャドウフレイム", price: 3200, type: "Mage", stats: "+110 AP / +15 Magic Pen" },
  { id: 38, name: "ストームサージ", price: 2800, type: "Mage", stats: "+90 AP / +15 Magic Pen / +6% MS" },
  { id: 39, name: "セラフ エンブレイス", price: 2900, type: "Mage", stats: "+70 AP / +1000 Mana / +25 AH" },
  { id: 40, name: "ゾーニャの砂時計", price: 3250, type: "Mage", stats: "+105 AP / +50 Armor" },
  { id: 41, name: "ナッシャー トゥース", price: 2900, type: "Mage", stats: "+80 AP / +50% AS / +15 AH" },
  { id: 42, name: "バンシー ヴェール", price: 3000, type: "Mage", stats: "+105 AP / +40 MR" },
  { id: 43, name: "ブラッドレターの呪い", price: 2900, type: "Mage", stats: "+400 HP / +65 AP / +15 AH" },
  { id: 44, name: "ヘクステック ロケットベルト", price: 2650, type: "Mage", stats: "+300 HP / +70 AP / +20 AH" },
  { id: 45, name: "ホライゾン フォーカス", price: 2750, type: "Mage", stats: "+125 AP / +25 AH" },
  { id: 46, name: "ヴォイド スタッフ", price: 3000, type: "Mage", stats: "+95 AP / +40% Magic Pen" },
  { id: 47, name: "マリグナンス", price: 2700, type: "Mage", stats: "+90 AP / +600 Mana / +15 AH" },
  { id: 48, name: "モレロノミコン", price: 2850, type: "Mage", stats: "+350 HP / +75 AP / +15 AH" },
  { id: 49, name: "ライアンドリーの仮面", price: 3000, type: "Mage", stats: "+300 HP / +60 AP" },
  { id: 50, name: "ラバドン デスキャップ", price: 3500, type: "Mage", stats: "+130 AP" },
  { id: 51, name: "リーライ クリスタル セプター", price: 2600, type: "Mage", stats: "+400 HP / +65 AP" },
  { id: 52, name: "リッチ ベイン", price: 2900, type: "Mage", stats: "+100 AP / +10 AH / +4% MS" },
  { id: 53, name: "リフトメーカー", price: 3100, type: "Mage", stats: "+70 AP / +350 HP / +15 AH" },
  { id: 54, name: "ルーデン コンパニオン", price: 2750, type: "Mage", stats: "+100 AP / +600 Mana / +10 AH" },
  { id: 55, name: "ロッド オブ エイジス", price: 2600, type: "Mage", stats: "+350 HP / +500 Mana / +45 AP" },

  // --- Marksman ---
  { id: 56, name: "イモータル シールドボウ", price: 3000, type: "Marksman", stats: "+55 AD / +25% Crit" },
  { id: 57, name: "インフィニティ エッジ", price: 3450, type: "Marksman", stats: "+65 AD / +25% Crit / +40% Crit Dmg" },
  { id: 58, name: "エッセンス リーバー", price: 2900, type: "Marksman", stats: "+60 AD / +25% Crit / +15 AH" },
  { id: 59, name: "グインソー レイジブレード", price: 3000, type: "Marksman", stats: "+30 AD / +30 AP / +25% AS" },
  { id: 60, name: "クラーケン スレイヤー", price: 3000, type: "Marksman", stats: "+45 AD / +40% AS / +4% MS" },
  { id: 61, name: "スタティック シヴ", price: 2700, type: "Marksman", stats: "+45 AD / +30% AS / +4% MS" },
  { id: 62, name: "テルミヌス", price: 3000, type: "Marksman", stats: "+30 AD / +35% AS" },
  { id: 63, name: "ドミニク リガード", price: 3100, type: "Marksman", stats: "+35 AD / +25% Crit / +40% Armor Pen" },
  { id: 64, name: "ナヴォリ フリッカーブレード", price: 2650, type: "Marksman", stats: "+40% AS / +25% Crit / +4% MS" },
  { id: 65, name: "ファントム ダンサー", price: 2650, type: "Marksman", stats: "+65% AS / +25% Crit / +10% MS" },
  { id: 66, name: "ブラッドサースター", price: 3400, type: "Marksman", stats: "+80 AD / +15% Life Steal" },
  { id: 67, name: "モータル リマインダー", price: 3300, type: "Marksman", stats: "+35 AD / +25% Crit / +35% Armor Pen" },
  { id: 68, name: "ユン・タル ワイルドアロー", price: 3000, type: "Marksman", stats: "+55 AD / +35% AS" },
  { id: 69, name: "ラピッド ファイアキャノン", price: 2650, type: "Marksman", stats: "+35% AS / +25% Crit / +4% MS" },
  { id: 70, name: "ルナーン ハリケーン", price: 2650, type: "Marksman", stats: "+40% AS / +25% Crit / +4% MS" },

  // --- Support ---
  { id: 71, name: "アーデント センサー", price: 2600, type: "Support", stats: "+45 AP / +125% Mana Regen / +10% Heal&Shield" },
  { id: 72, name: "シュレリアの戦歌", price: 2200, type: "Support", stats: "+50 AP / +25 AH / +125% Mana Regen / +4% MS" },
  { id: 73, name: "ジーク コンバージェンス", price: 2200, type: "Support", stats: "+300 HP / +25 Armor / +25 MR / +10 AH" },
  { id: 74, name: "ソラリのロケット", price: 2200, type: "Support", stats: "+200 HP / +25 Armor / +25 MR / +10 AH" },
  { id: 75, name: "帝国の指令", price: 2750, type: "Support", stats: "+55 AP / +200 HP / +20 AH / +100% Mana Regen" },
  { id: 76, name: "ドーンコア", price: 2900, type: "Support", stats: "+45 AP / +100% Mana Regen / +16% Heal&Shield" },
  { id: 77, name: "ビジラント ワードストーン", price: 2300, type: "Support", stats: "+250 HP / +20 AH / +25 Armor / +30 MR" },
  { id: 78, name: "フロー ウォーター スタッフ", price: 2600, type: "Support", stats: "+35 AP / +15 AH / +10% Heal&Shield / +125% Mana Regen" },
  { id: 79, name: "ヘリアの残響", price: 2600, type: "Support", stats: "+35 AP / +200 HP / +20 AH / +125% Mana Regen" },
  { id: 80, name: "ミカエルの祝福", price: 2300, type: "Support", stats: "+250 HP / +12% Heal&Shield / +100% Mana Regen / +15 AH" },
  { id: 81, name: "ムーンストーンの再生", price: 2900, type: "Support", stats: "+25 AP / +200 HP / +20 AH / +125% Mana Regen" },
  { id: 82, name: "騎士の誓い", price: 2300, type: "Support", stats: "+200 HP / +100% HP Regen / +40 Armor / +10 AH" },
  { id: 83, name: "リデンプション", price: 2300, type: "Support", stats: "+200 HP / +100% Mana Regen / +15 AH / +10% Heal&Shield" },

  // --- Tank ---
  { id: 84, name: "アビサル マスク", price: 2850, type: "Tank", stats: "+350 HP / +45 MR / +15 AH" },
  { id: 85, name: "アイスボーン ガントレット", price: 2900, type: "Tank", stats: "+300 HP / +50 Armor / +15 AH" },
  { id: 86, name: "エバー・チェンジング・ジャック＝ショー", price: 3200, type: "Tank", stats: "+350 HP / +45 Armor / +45 MR" },
  { id: 87, name: "終わりなき絶望", price: 2800, type: "Tank", stats: "+400 HP / +25 Armor / +25 MR / +10 AH" },
  { id: 88, name: "ケイニック ルーケルン", price: 2900, type: "Tank", stats: "+400 HP / +80 MR / +100% HP Regen" },
  { id: 89, name: "心の鋼", price: 3000, type: "Tank", stats: "+900 HP / +100% HP Regen" },
  { id: 90, name: "サンファイア イージス", price: 2700, type: "Tank", stats: "+350 HP / +50 Armor / +10 AH" },
  { id: 91, name: "自然の力", price: 2800, type: "Tank", stats: "+400 HP / +55 MR / +4% MS" },
  { id: 92, name: "先人の道標", price: 2400, type: "Tank", stats: "+250 HP / +40 Armor / +4% MS" },
  { id: 93, name: "スピリット ビサージュ", price: 2700, type: "Tank", stats: "+400 HP / +50 MR / +10 AH / +100% HP Regen" },
  { id: 94, name: "ソーンメイル", price: 2450, type: "Tank", stats: "+150 HP / +75 Armor" },
  { id: 95, name: "デッド マン プレート", price: 2900, type: "Tank", stats: "+350 HP / +55 Armor / +4% MS" },
  { id: 96, name: "フィンブルウィンター", price: 2400, type: "Tank", stats: "+550 HP / +860 Mana / +15 AH" },
  { id: 97, name: "フローズン ハート", price: 2500, type: "Tank", stats: "+75 Armor / +400 Mana / +20 AH" },
  { id: 98, name: "冬の訪れ", price: 2400, type: "Tank", stats: "+550 HP / +500 Mana / +15 AH" },
  { id: 99, name: "ホロウ レディアンス", price: 2800, type: "Tank", stats: "+400 HP / +40 MR / +100% HP Regen / +10 AH" },
  { id: 100, name: "ランデュイン オーメン", price: 2700, type: "Tank", stats: "+75 Armor / +350 HP" },
  { id: 101, name: "ワーモグ アーマー", price: 3100, type: "Tank", stats: "+1000 HP / +100% HP Regen" }
];
// --- アイテム一覧表示 ---
app.get("/lol/items", (req, res) => {
  res.render("lol_items", { items: lolItems });
});
//　新規作成フォーム
app.get("/lol/items/add", (req, res) => {
  res.render("lol_item_add");
});
//　新規作成の処理
app.post("/lol/items/add", (req, res) => {
  const maxId = lolItems.reduce((max, item) => item.id > max ? item.id : max, 0);
  const newId = maxId + 1;
  
  const newItem = {
    id: newId,
    name: req.body.name,
    price: Number(req.body.price), 
    type: req.body.type,
    stats: req.body.stats
  };

  lolItems.push(newItem);
  res.redirect("/lol/items");
});
// アイテム詳細表示
app.get("/lol/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = lolItems.find(item => item.id === id);
    res.render("lol_item_detail", { item: target });
});
//　編集のフォーム
app.get("/lol/items/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = lolItems.find(item => item.id === id);
  if (target) {
    res.render("lol_item_edit", { item: target });
  } else {
    res.send("編集対象のアイテムが見つかりません");
  }
});
//　編集の処理
app.post("/lol/items/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = lolItems.findIndex(item => item.id === id);
  
  if (index !== -1) {
    lolItems[index].name = req.body.name;
    lolItems[index].price = Number(req.body.price);
    lolItems[index].type = req.body.type;
    lolItems[index].stats = req.body.stats;
  }
  res.redirect("/lol/items");
});
//　削除処理
app.get("/lol/items/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  lolItems = lolItems.filter(item => item.id !== id);
  res.redirect("/lol/items");
});

// Valorant エージェントデータ
let valoAgents = [
  { 
    id: 1, name: "ジェット", role: "Duelist", 
    abilities: "アップドラフト：ジェットを上に向かって飛ばす．高所に登るだけでなく，壁や遮蔽物を飛び越える．\nテイルウィンド：1回目の使用で準備状態に，2回目の使用でダッシュできる．ダッシュは前後左右に可能．\nクラウドバースト：着弾するとスモークを展開するけむり玉を投げる．\nブレードストーム：5本のナイフを構え，左クリックで1本ずつ，右クリックで構えているナイフを全て発射する．" 
  },
  { 
    id: 2, name: "レイズ", role: "Duelist", 
    abilities: "ブラストパック：レイズ自身が高く飛び上がることができ，敵に当てれば強制的に移動させることもできる．\nペイント弾：グレネードは爆発すると更に4個の小型爆薬を放出し，地面にバウンドした後に爆発する．\nブームボット：ボットは真っ直ぐ進むが，壁などにぶつかると反射する．前方に敵がいると反応し，追尾して近づくと飛び上がり爆発する．\nショーストッパー：着弾地点から離れるほどダメージは減少するが，直撃させずともある程度の範囲までダメージを与えられる．" 
  },
  { 
    id: 3, name: "フェニックス", role: "Duelist", 
    abilities: "ブレイズ：視線を遮り，通り抜けたプレイヤーにダメージを与える炎の壁を作り出す．\nカーブボール：カーブして飛ぶフレアを投げ，見た者の視界を奪う．\nホットハンズ：一定時間燃え広がる火の玉を投げる．敵にはダメージを与え，自分は回復する．\nラン・イット・バック：倒されても，効果時間が切れても，HP満タンでこのスキルを使用した地点に戻る．" 
  },
  { 
    id: 4, name: "レイナ", role: "Duelist", 
    abilities: "リーア：破壊可能なエーテルの眼を出現させ，これを見ている敵の視界を悪化させる．\nデバウアー：倒した敵の魂を消費して，短時間で急速に体力を回復する．\nディスミス：倒した敵の魂を消費して，短時間実体のない存在（無敵）となる．\nエンプレス：射撃，装備，リロード速度が向上し，敵を倒すと効果時間が更新される．" 
  },
  { 
    id: 5, name: "ヨル", role: "Duelist", 
    abilities: "フェイクアウト：足音を鳴らすデコイを前方に送る．\nブラインドサイド：壁に当たると反射するフラッシュを投げる．\nゲートクラッシュ：テレポートするための裂け目を前方に送るか設置し，再発動でそこへワープする．\nディメンショナルドリフト：別次元に入り込み，敵から視認されず，攻撃も受けない状態になる．" 
  },
  { 
    id: 6, name: "ネオン", role: "Duelist", 
    abilities: "リレーボルト：一度だけ反射するエネルギーボルトを投げ，着弾地点をスタンさせる．\nハイギア：移動速度が上昇する．スライディングも使用可能になる．\nファストレーン：視界を遮り，触れた敵にダメージを与える電気の壁を左右に展開する．\nオーバードライブ：移動精度が高く，即着弾する強力な電撃ビームを指先から放つ．" 
  },
  { 
    id: 7, name: "アイソ", role: "Duelist", 
    abilities: "コンティンジェンシー：銃弾を防ぐエネルギーの壁を前方に押し出す．\nアンダーカット：壁を貫通するボルトを放ち，触れた敵を「脆弱」状態にする．\nダブルタップ：敵を倒すと出現するオーブを撃つことで，あらゆるダメージを一度だけ無効化するシールドを得る．\nキルコントラクト：異次元の決闘場を展開し，捉えた敵と1対1の撃ち合いを行う．" 
  },

  { 
    id: 8, name: "セージ", role: "Sentinel", 
    abilities: "バリアオーブ：頑丈な氷の壁を作り出す．\nスロウオーブ：地面に氷のフィールドを展開し，敵の足を遅くする．\nヒーリングオーブ：味方または自分自身の体力を回復する．\nリザレクション：倒された味方を蘇生させ，体力を全快させる．" 
  },
  { 
    id: 9, name: "サイファー", role: "Sentinel", 
    abilities: "トラップワイヤー：敵が引っかかると動きを制限し，位置を特定するワイヤーを設置する．\nサイバーケージ：視界を遮る檻を遠隔操作で起動する．\nスパイカメラ：カメラを設置し，離れた場所の様子を確認したり，ダーツで敵をマーキングしたりできる．\nニューラルセフト：倒した敵の死体を使って，生きている全敵プレイヤーの位置を特定する．" 
  },
  { 
    id: 10, name: "キルジョイ", role: "Sentinel", 
    abilities: "ナノスワーム：起動するとダメージを与えるナノボットの群れを展開するグレネード．\nアラームボット：範囲内に入った敵を追尾し，爆発して「脆弱」状態にするボット．\nタレット：180度の視界を持ち，敵を見つけると自動で射撃するタレットを設置する．\nロックダウン：一定時間後に範囲内の敵すべてを拘束状態にする装置を設置する．" 
  },
  { 
    id: 11, name: "チェンバー", role: "Sentinel", 
    abilities: "トレードマーク：範囲内に入った敵を検知し，スロウフィールドを展開するトラップ．\nヘッドハンター：ADS（覗き込み）可能な強力なヘヴィーピストルを装備する．\nランデヴー：テレポートアンカーを設置し，範囲内にいれば即座にそこへワープできる．\nツール・ド・フォース：直撃すれば即死級の威力を持つスナイパーライフルを召喚する．" 
  },
  { 
    id: 12, name: "デッドロック", role: "Sentinel", 
    abilities: "グラヴィネット：着弾地点の敵を強制的にしゃがませ，移動速度を低下させるネットを投げる．\nソニックセンサー：足音や射撃音などの「音」に反応して敵をスタンさせるセンサーを設置する．\nバリアメッシュ：敵の移動を阻む十字型のバリアを展開する．\nアナイアレーション：敵をコクーン（繭）に閉じ込め，拘束してキルするナノワイヤーを放つ．" 
  },
  { 
    id: 13, name: "ヴァイス", role: "Sentinel", 
    abilities: "アークローズ：設置型のフラッシュ．壁の裏側にも設置でき，再利用が可能．\nシアー：敵が通過すると背後に壁が出現し，孤立させるトラップ．\nレイザーヴァイン：地面に設置し，起動すると敵にダメージを与えて足止めする茨を展開する．\nスチールガーデン：範囲内の敵のメイン武器を一定時間使用不能（ジャム）にする．" 
  },
  { 
    id: 14, name: "ヴィトー", role: "Sentinel", 
    abilities: "チョークホールド：敵の首元を狙うような動作で拘束し，行動不能にする．\nインターセプター：飛来するプロジェクタイル（投擲物）を撃ち落とすデバイスを展開する．\nクロスカット：X字状に切り裂くエネルギー波を放ち，エリアを分断する．\nエヴォリューション：自身または味方のアーマーを強化し，耐久力を向上させる．" 
  },

  { 
    id: 15, name: "ブリーチ", role: "Initiator", 
    abilities: "アフターショック：壁越しに爆発を起こし，大ダメージを与える．\nフラッシュポイント：壁越しに強烈な光を放ち，敵の視界を奪う．\nフォールトライン：チャージして強力な地震を起こし，範囲内の敵をスタンさせる．\nローリングサンダー：広範囲に地鳴りを発生させ，敵をノックバックさせてスタンさせる．" 
  },
  { 
    id: 16, name: "ソーヴァ", role: "Initiator", 
    abilities: "オウルドローン：空飛ぶドローンを操作して偵察し，ダーツで敵をマーキングする．\nショックボルト：着弾すると爆発してダメージを与える矢を放つ．\nリコンボルト：着弾地点周辺の敵の位置を検知して表示する矢を放つ．\nハンターズフューリー：壁を貫通するエネルギーブラストを3発放ち，ダメージと位置表示を与える．" 
  },
  { 
    id: 17, name: "スカイ", role: "Initiator", 
    abilities: "リグロース：範囲内にいる味方の体力を回復する（自分は回復できない）．\nトレイルブレイザー：操作可能なタスマニアタイガーを召喚し，敵に飛びかかってスタンさせる．\nガイディングライト：操作可能な鷹を放ち，炸裂させて敵の視界を奪う．\nシーカー：近くの敵3体を追尾する精霊を放ち，視界を悪化させる．" 
  },
  { 
    id: 18, name: "KAY/O", role: "Initiator", 
    abilities: "フラグ/メント：地面に張り付き，複数回爆発してダメージを与える．\nフラッシュ/ドライブ：投げると爆発して視界を奪うフラッシュバン．\nゼロ/ポイント：ナイフを投げ，刺さった範囲内の敵のアビリティを封印（抑制）する．\nヌル/コマンド：パルスを放ち周囲の敵を抑制状態にする．倒されても味方に修理（蘇生）してもらえる．" 
  },
  { 
    id: 19, name: "フェイド", role: "Initiator", 
    abilities: "プラウラー：視界に入った敵や恐怖の痕跡を自動追尾し，視界を悪化させる．\nシーズ：敵を捕らえて範囲内に拘束し，聴覚を奪って腐敗ダメージを与える．\nホウント：ウォッチャーを投げ，視界に入った敵の位置を特定し「恐怖の痕跡」を残す．\nナイトフォール：闇の波を放ち，敵の位置を特定して腐敗させ，聴覚を奪う．" 
  },
  { 
    id: 20, name: "ゲッコー", role: "Initiator", 
    abilities: "モッシュピット：広範囲に広がり，少し遅れて大爆発するスライムを投げる．\nウィングマン：敵をスタンさせる．また，スパイクの設置や解除を任せることができる．\nディジー：敵を検知するとプラズマを発射し，視界を奪う．\nスラッシュ：操作可能な暴れ回るクリーチャーとなり，敵に飛び込んで拘束する．" 
  },

  { 
    id: 21, name: "オーメン", role: "Controller", 
    abilities: "シュラウドステップ：短い距離をテレポートする．\nパラノイア：壁を貫通する影を放ち，触れた敵の視界を奪う．\nダークカヴァー：距離を調整して，視界を遮る影のスモークを設置する．\nフロム・ザ・シャドウズ：マップ上の好きな場所にテレポートできる．" 
  },
  { 
    id: 22, name: "ブリムストーン", role: "Controller", 
    abilities: "スティムビーコン：範囲内の味方の移動速度と射撃速度を上昇させる．\nインセンディアリー：地面を炎上させ，ダメージを与えるグレネードを撃ち出す．\nスカイスモーク：マップを指定して，長時間持続するスモークを空から投下する．\nオービタルストライク：指定した地点に高威力のレーザー攻撃を行い，継続ダメージを与える．" 
  },
  { 
    id: 23, name: "ヴァイパー", role: "Controller", 
    abilities: "スネークバイト：地面に酸の海を作り，敵にダメージを与えて「脆弱」にする．\nポイズンクラウド：設置型のガス発生器を投げ，起動すると毒のスモークを作る．\nトキシックスクリーン：長いガス発生器の列を展開し，起動すると毒の壁を作る．\nヴァイパーズピット：周囲に巨大な毒の雲を作り出し，中の敵の視界と最大体力を奪う．" 
  },
  { 
    id: 24, name: "アストラ", role: "Controller", 
    abilities: "グラビティウェル：スターを起動し，敵を中心に吸い込んで「脆弱」にする．\nノヴァパルス：スターを起動し，範囲内の敵をスタンさせる．\nネビュラ：スターを起動し，スモークを展開する．\nコズミックディバイド：マップ全体を分断する巨大な壁を作り，音と銃弾を遮断する．" 
  },
  { 
    id: 25, name: "ハーバー", role: "Controller", 
    abilities: "カスケード：壁をすり抜ける水の波を前方に送り出し，敵の視界を遮る．\nコーヴ：銃弾を防ぐ水のシールド（スモーク）を投げる．\nハイタイド：軌道を操作できる水の壁を地面に走らせる．\nレコニング：地面に間欠泉を召喚し，エリア内の敵を順次スタンさせる．" 
  },
  { 
    id: 26, name: "クローヴ", role: "Controller", 
    abilities: "ピック・ミー・アップ：敵を倒して生命力を吸収し，一時的に移動速度と体力を得る．\nメドル：破片を投げ，範囲内の敵に「腐敗」効果を与える．\nルース：視界を遮る雲を発生させる．倒された後でも使用可能．\nノット・デッド・イェット：倒された直後に復活できる．ただし短時間以内にキルかアシストを取らないと消滅する．" 
  }
];

// エージェント一覧表示
app.get("/valorant/agents", (req, res) => {
  res.render("valorant_list", { agents: valoAgents });
});

//　新規作成フォーム
app.get("/valorant/agents/add", (req, res) => {
  res.render("valorant_add");
});

// 新規作成処理
app.post("/valorant/agents/add", (req, res) => {
  const maxId = valoAgents.reduce((max, item) => item.id > max ? item.id : max, 0);
  const newId = maxId + 1;
  
  const newAgent = {
    id: newId,
    name: req.body.name,
    role: req.body.role,
    abilities: req.body.abilities
  };

  valoAgents.push(newAgent);
  res.redirect("/valorant/agents");
});

// 詳細表示
app.get("/valorant/agents/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = valoAgents.find(item => item.id === id);
    res.render("valorant_detail", { agent: target });
});

// 編集フォーム
app.get("/valorant/agents/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = valoAgents.find(item => item.id === id);
  if (target) {
    res.render("valorant_edit", { agent: target });
  } else {
    res.send("編集対象が見つかりません");
  }
});

// 編集処理
app.post("/valorant/agents/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = valoAgents.findIndex(item => item.id === id);
  
  if (index !== -1) {
    valoAgents[index].name = req.body.name;
    valoAgents[index].role = req.body.role;
    valoAgents[index].abilities = req.body.abilities;
  }
  res.redirect("/valorant/agents");
});

// 削除処理
app.get("/valorant/agents/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  valoAgents = valoAgents.filter(item => item.id !== id);
  res.redirect("/valorant/agents");
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
