$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if message.image {
      var html = //メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = //メッセージに画像が含まれない場合のHTMLを作る
    }
    return html
  }

  $(".main_chat__form__submit").on("click", function(e){
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
  })
});