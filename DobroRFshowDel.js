// Generated by CoffeeScript 1.4.0
(function() {
  var main, script;

  main = function() {
    if (window.location.toString().indexOf("rf/res") === 0 || window.location.toString().indexOf("rf/mad") === 0) {
      return;
    }
    return document.addEventListener("DOMContentLoaded", function() {
      var $abbrev, xmlhttp;
      $abbrev = document.querySelector(".abbrev span a");
      if (!$abbrev) {
        return;
      }
      xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(data) {
        var posts, posts_i, thread, tmp;
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          tmp = document.createElement("div");
          tmp.innerHTML = xmlhttp.responseText;
          thread = document.querySelector(".thread");
          posts = document.querySelectorAll(".post");
          posts_i = 1;
          return [].forEach.call(tmp.querySelectorAll(".thread .replypost"), function(p, i, del) {
            while (posts[posts_i] && (p.id > posts[posts_i].id)) {
              posts_i++;
            }
            if (posts[posts_i]) {
              return thread.insertBefore(p, posts[posts_i]);
            } else {
              return thread.appendChild(p);
            }
          });
        }
      };
      xmlhttp.open("GET", $abbrev.href, true);
      return xmlhttp.send();
    });
  };

  script = document.createElement("script");

  script.textContent = "(" + (main.toString()) + ")();";

  document.body.appendChild(script);

}).call(this);