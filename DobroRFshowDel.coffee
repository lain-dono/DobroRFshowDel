main = ->
  # нам нужен тоько rf и mad
  return  if window.location.toString().indexOf("rf/res") is 0 or window.location.toString().indexOf("rf/mad") is 0

  document.addEventListener "DOMContentLoaded", ->
    $abbrev = document.querySelector(".abbrev span a")

    return  unless $abbrev # а вдруг оп ничего не удалял

    xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = (data) ->
      if xmlhttp.readyState is 4 and xmlhttp.status is 200
        tmp = document.createElement("div")
        tmp.innerHTML = xmlhttp.responseText
        thread = document.querySelector(".thread")
        posts = document.querySelectorAll(".post")
        posts_i = 1

        # проходимся по удаленным постам
        [].forEach.call tmp.querySelectorAll(".thread .replypost"), (p, i, del) ->
          # вычисляем пост к которому надо добавить удаленный
          posts_i++  while posts[posts_i] and (p.id > posts[posts_i].id)
          if posts[posts_i]
            thread.insertBefore p, posts[posts_i]
          else # если все неудаленные посты закончились, то добавляем в конец
            thread.appendChild p

    xmlhttp.open "GET", $abbrev.href, true
    xmlhttp.send() # подгружаем посты

script = document.createElement "script"
script.textContent = "(#{ main.toString() })();"
document.body.appendChild script