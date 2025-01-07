"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});
document.querySelector('#like').addEventListener('click', () => {
    const id = prompt("いいねする投稿のIDを入力してください:");
    const params = {
        method: "POST",
        body: 'id=' + id,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch("/like", params)
        .then(response => response.json())
        .then(data => alert("いいね数: " + data.likes))
        .catch(err => console.error(err));
});

document.querySelector('#edit').addEventListener('click', () => {
    const id = prompt("編集する投稿のIDを入力してください:");
    const newMessage = prompt("新しいメッセージを入力してください:");
    const params = {
        method: "POST",
        body: `id=${id}&message=${newMessage}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch("/edit", params)
        .then(response => response.json())
        .then(data => alert("編集しました"))
        .catch(err => console.error(err));
});
document.querySelector('#delete').addEventListener('click', () => {
    const id = prompt("削除する投稿のIDを入力してください:");
    const params = {
        method: "POST",
        body: 'id=' + id,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch("/delete", params)
        .then(response => response.json())
        .then(data => alert("削除しました"))
        .catch(err => console.error(err));
});

document.querySelector('#search-btn').addEventListener('click', () => {
    const keyword = document.querySelector('#search').value;
    const params = {
        method: "POST",
        body: 'keyword=' + keyword,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch("/search", params)
        .then(response => response.json())
        .then(data => {
            bbs.innerHTML = ""; // 結果を表示
            for (let post of data.results) {
                const cover = document.createElement('div');
                cover.className = 'cover';
                cover.innerText = `${post.name}: ${post.message}`;
                bbs.appendChild(cover);
            }
        })
        .catch(err => console.error(err));
});

for (let mes of response.messages) {
    console.log(mes); // 表示する投稿
    let cover = document.createElement('div');
    cover.className = 'cover';
    
    // 投稿IDを表示
    let id_area = document.createElement('span');
    id_area.className = 'id';
    id_area.innerText = `[ID: ${mes.id}] `;
    
    let name_area = document.createElement('span');
    name_area.className = 'name';
    name_area.innerText = mes.name;

    let mes_area = document.createElement('span');
    mes_area.className = 'mes';
    mes_area.innerText = mes.message;

    cover.appendChild(id_area); // IDを表示に追加
    cover.appendChild(name_area);
    cover.appendChild(mes_area);

    bbs.appendChild(cover);
}
