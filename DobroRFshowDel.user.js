// ==UserScript==
// @name           DobroRFshowDel
// @description    Показывает скрытые ОП-ом посты прямо в треде
// @namespace      dobro
// @version        0.1
// @author         lain-dono
// @license        GPL
// @include        https://dobrochan.ru/rf/res/*
// @include        https://dobrochan.org/rf/res/*
// @include        https://dobrochan.com/rf/res/*
// @include        http://dobrochan.ru/rf/res/*
// @include        http://dobrochan.org/rf/res/*
// @include        http://dobrochan.com/rf/res/*
// ==/UserScript==

// Подгружаем JQuery во имя добра
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// собсно сам код здесь
function main() {

// совместимость с hanabira.js и его jquery версии 1.3.2
jQuery.noConflict();

(function($){

  if(window.location.toString().indexOf('rf/res') != 0) {

    // ссылка на удаленные посты
    var $abbrev_href = $('.abbrev span a').attr('href')

    // получаем посты
    $.ajax({
      url: $abbrev_href,
      type: 'get',
      dataType: 'html',
      dataFilter: function(html) {
        //вырезем мусор из полученной страницы
        return $(html).find('.thread');
      },
      success: function($html) {

        // сначала проходимся по постам
        $('.thread .replypost').each(function(index){
          var $this = $(this);
          var id = $this.attr('id').replace('post_','');
          // нам нужны те, что перед этим постом
          $html.find('.post').each(function() {
            var $el = $(this);
            // те что после нинужны
            if($el.attr('id').replace('post_','') > id)
              return false;
            // почему не вставляется просто $el? потому и хак
            var $new = $('<table>', {
              class: $el.attr('class'),
              id: $el.attr('id'),
              html: $el.html(),
            }).insertBefore($this);

            $el.remove(); // ну всё... вырезем!

          });
        }); // \thread.each

        var last = $('.thread .replypost:last');

        // то что осталось в конец
        $html.find('.post').each(function() {
          var $el = $(this);

          // опять этот грязный хак
          var $new = $('<table>', {
            class: $el.attr('class'),
            id: $el.attr('id'),
            html: $el.html(),
          }).insertAfter(last);

          last = $el; // это мы на память
        });

      } // \success-func
    }); // \$.ajax

  } // \if(window.locat....)

})(jQuery);
}

addJQuery(main); // El Psy Congroo!
