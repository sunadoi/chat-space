$(function(){
  function buildHTML(message){
    var html_user = `<div class="main_chat__contents__content__user">
                        <div class="main_chat__contents__content__user__name">
                          ${message.user_name}
                        </div>
                        <div class="main_chat__contents__content__user__time">
                          ${message.created_at}
                        </div>
                      </div>`
    if (message.content && message.image) {
      var html = `<div class="main_chat__contents__content" data-id=${message.id}>` +
                    html_user +              
                    `<div class="main_chat__contents__content__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src="${message.image}" alt="Test image">
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="main_chat__contents__content" data-id=${message.id}>` +
                    html_user +
                    `<div class="main_chat__contents__content__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="main_chat__contents__content" data-id=${message.id}>` +
                    html_user +              
                    `<div class="main_chat__contents__content__text">
                      <img class="lower-message__image" src="${message.image}" alt="Test image">
                    </div>
                  </div>`
    }
    return html
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__contents').append(html);
      $('.main_chat__contents').animate({ scrollTop: $('.main_chat__contents')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.main_chat__form__content__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.main_chat__contents__content:last').data('id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          console.log(insertHTML)
          $('.main_chat__contents').append(insertHTML);
          $('.main_chat__contents').animate({ scrollTop: $('.main_chat__contents')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    };
  };
  setInterval(reloadMessages, 7000);
});