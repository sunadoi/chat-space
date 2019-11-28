$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html = `<div class="main_chat__contents__content">
                    <div class="main_chat__contents__content__user">
                      <div class="main_chat__contents__content__user__name">
                        ${message.user_name}
                      </div>
                      <div class="main_chat__contents__content__user__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main_chat__contents__content__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src="${message.image.url}" alt="Test image">
                    </div>
                  </div>`
    } else {
      var html = `<div class="main_chat__contents__content">
                    <div class="main_chat__contents__content__user">
                      <div class="main_chat__contents__content__user__name">
                        ${message.user_name}
                      </div>
                      <div class="main_chat__contents__content__user__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main_chat__contents__content__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
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
      $('.main_chat__form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});