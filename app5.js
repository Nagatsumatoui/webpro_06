const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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


app.get("/taipu", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 18 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'ノーマル';
  else if( num==2 ) cpu = '水';
  else if( num==3 ) cpu = '草';
  else if( num==4 ) cpu = '火';
  else if( num==5 ) cpu = '電気';
  else if( num==6 ) cpu = '地面';
  else if( num==7 ) cpu = '氷';
  else if( num==8 ) cpu = '格闘';
  else if( num==9 ) cpu = '毒';
  else if( num==10 ) cpu = '飛行';
  else if( num==11 ) cpu = 'エスパー';
  else if( num==12 ) cpu = '虫';
  else if( num==13 ) cpu = '岩';
  else if( num==14 ) cpu = 'ゴースト';
  else if( num==15 ) cpu = 'ドラゴン';
  else if( num==16 ) cpu = 'アク';
  else if( num==17 ) cpu = '鋼';
  else if( num==18 ) cpu = 'フェアリー';
  // ここに勝敗の判定を入れる
  let judgement = ''; 
  if (hand === cpu) { 
      judgement = '通常';
  } else if ( 
    (hand === '水' && cpu === '火') ||
    (hand === '水' && cpu === '地面') ||
    (hand === '水' && cpu === '岩') ||
    (hand === '草' && cpu === '水') ||
    (hand === '草' && cpu === '地面') ||
    (hand === '草' && cpu === '岩') ||
    (hand === '火' && cpu === '草') ||
    (hand === '火' && cpu === '虫') ||
    (hand === '火' && cpu === '氷') ||
    (hand === '火' && cpu === '鋼') ||
    (hand === '電気' && cpu === '水') ||
    (hand === '電気' && cpu === '飛行') ||
    (hand === '地面' && cpu === '火') ||
    (hand === '地面' && cpu === '電気') ||
    (hand === '地面' && cpu === '毒') ||
    (hand === '地面' && cpu === '岩') ||
    (hand === '地面' && cpu === '鋼') ||
    (hand === '氷' && cpu === '草') ||
    (hand === '氷' && cpu === '地面') ||
    (hand === '氷' && cpu === '飛行') ||
    (hand === '氷' && cpu === 'ドラゴン') ||
    (hand === '格闘' && cpu === 'ノーマル') ||
    (hand === '毒' && cpu === '草') ||
    (hand === '毒' && cpu === 'フェアリー') ||
    (hand === '飛行' && cpu === '格闘') ||
    (hand === '飛行' && cpu === '虫') ||
    (hand === '飛行' && cpu === '草') ||
    (hand === 'エスパー' && cpu === '格闘') ||
    (hand === 'エスパー' && cpu === '毒') ||
    (hand === '虫' && cpu === '草') ||
    (hand === '虫' && cpu === 'エスパー') ||
    (hand === '虫' && cpu === 'アク') ||
    (hand === '岩' && cpu === '火') ||
    (hand === '岩' && cpu === '氷') ||
    (hand === '岩' && cpu === '飛行') ||
    (hand === '岩' && cpu === '虫') ||
    (hand === 'ゴースト' && cpu === 'ゴースト') ||
    (hand === 'ドラゴン' && cpu === 'ドラゴン') ||
    (hand === 'アク' && cpu === 'エスパー') ||
    (hand === 'アク' && cpu === 'ゴースト') ||
    (hand === '鋼' && cpu === '氷') ||
    (hand === '鋼' && cpu === '岩') ||
    (hand === '鋼' && cpu === 'フェアリー') ||
    (hand === 'フェアリー' && cpu === '格闘') ||
    (hand === 'フェアリー' && cpu === 'アク') ||
    (hand === 'フェアリー' && cpu === 'ドラゴン') 
  ) {
  // 今はダミーで人間の勝ちにしておく
  judgement = '効果抜群';
  win += 1;
} else {
  judgement = 'いまひとつ';
}
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  res.render( 'taipu', display );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
