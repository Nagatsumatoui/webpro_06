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
loose --> end2
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
end2["終了"]
end3["終了"]
end4["終了"]
if{"条件に合うか"}
win["効果抜群"]
loose["いまひとつ"]
draw["通常"]
noeffect["効果なし"]

start --> if
if --> win
win --> end1
if -->  loose
loose --> end2
if --> draw
draw --> end3
if --> noeffect
noeffect --> end4
```
###このファイルの機能
ポケモンのタイプを打つとcpuがランダムで出してくるタイプとの相性がわかる．
ファイル | タイプ
-|-
 -| ノーマル
 -| 炎
 -| 水
 -| 草
 -| 電気
 -| 地面
 -| 氷
 -| 格闘
 -| 毒
 -| 飛行
 -| エスパー
 -| 虫
 -| 岩
 -| ゴースト
 -| ドラゴン
 -| アク
 -| 鋼
 -| フェアリー


ファイル | 説明
-|-
app5.js | プログラム本体
public/saikoro.html | サイコロの開始画面
views/saikoro.ejs | サイコロのテンプレートファイル

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if --> win
win --> end1
if --> loose
loose --> end2
```