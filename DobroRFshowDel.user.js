// ==UserScript==
// @name           DobroRFshowDel
// @description    Показывает скрытые ОП-ом посты прямо в треде
// @namespace      dobro
// @version        0.1
// @author         lain-dono
// @license        WTFPL
// @include        https://dobrochan.ru/rf/res/*
// @include        https://dobrochan.org/rf/res/*
// @include        https://dobrochan.com/rf/res/*
// @include        http://dobrochan.ru/rf/res/*
// @include        http://dobrochan.org/rf/res/*
// @include        http://dobrochan.com/rf/res/*
// @include        https://dobrochan.ru/rf/mad/*
// @include        https://dobrochan.org/rf/mad/*
// @include        https://dobrochan.com/rf/mad/*
// @include        http://dobrochan.ru/rf/mad/*
// @include        http://dobrochan.org/rf/mad/*
// @include        http://dobrochan.com/rf/mad/*
// @description    Показывает скрытые ОП-ом посты прямо в треде
// ==/UserScript==

// El Psy Congroo!
function main() {
    // нам нужен тоько rf и mad
    if(window.location.toString().indexOf('rf/res') == 0
    || window.location.toString().indexOf('rf/mad') == 0) return;
    
    document.addEventListener('DOMContentLoaded', function() {
        var $abbrev = document.querySelector('.abbrev span a');
        // а вдруг оп ничего не удалял
        if(!$abbrev) return;
    
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.onreadystatechange = function(data) {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var tmp = document.createElement('div');
                tmp.innerHTML = xmlhttp.responseText;
                var thread = document.querySelector('.thread')
                var posts = document.querySelectorAll('.post');
                var posts_i = 1;
                // проходимся по удаленным постам
                [].forEach.call(tmp.querySelectorAll('.thread .replypost'), function(p, i, del) {
                    // вычисляем пост к которому надо добавить удаленный
                    while(posts[posts_i] && (p.id > posts[posts_i].id)) {posts_i++;}
                    if(posts[posts_i]) {
                        thread.insertBefore(p, posts[posts_i]);
                    } else {
                        // если все неудаленные посты закончились, то добавляем в конец
                        thread.appendChild(p);
                    }
                });
            }
        };
    
        xmlhttp.open("GET", $abbrev.href, true);
        xmlhttp.send(); // подгружаем посты
    });
}

var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);

