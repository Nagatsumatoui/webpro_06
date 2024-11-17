# webpro_06

## このプログラムについて

## ファイル一覧
ファイル | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル


```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|nol| loose
```

ファイル | 説明
-|-
app5.js | プログラム本体
public/taipu.html | ポケモンのタイプ開始画面
views/taipu.ejs | ポケモンのタイプテンプレートファイル

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["効果抜群"]
loose["いまひとつ"]

start --> if
if -->|yes| win
win --> end1
if -->|nol| loose
```