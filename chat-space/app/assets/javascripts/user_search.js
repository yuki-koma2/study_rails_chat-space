//参考[https://qiita.com/yuki-n/items/fdc5f7d5ac2f128221d1]

// $(document).on('turbolinks:load', function(){
$(function () {
  var search_user_list = $("#user-search-result");
  console.log('search_use_list');
  console.log(search_user_list);

  function builtHTMLUser(user_list) {
    console.log(user_list);
    console.log(user_list[0]);
    console.log(user_list[0].name);
    console.log(user_list[0].email);
    user_list.forEach(function(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                  </div>`;
      console.log(html);
      search_user_list.append(html);
    });
  };

  function builtHTML_noUser() {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name"> NO USER IS HERE</p>
                </div>`;
    console.log(html);
    search_user_list.append(html);
  }

  $(document).on('keyup', '#user-search-field', function(e){
    e.preventDefault();
    var input = $.trim($(this).val()); //前後の不要な空白を取り除いた($.trim(...);)上でinputという変数に(var input =)代入
    console.log(input);

    $.ajax({
     url: '/users', //urlを指定
     type: 'GET', //メソッドを指定
     data: ('keyword=' + input), //コントローラーに渡すデータを'keyword=input(入力された文字)'にするように指定
     processData: false,
     contentType: false,
     dataType: 'json' //データ形式を指定
   })
   .done(function(data){
     console.log('done');
     console.log(data);

    $('.chat-group-user').remove();

    if(data.length !== 0){
      builtHTMLUser(data);
      console.log('user list built done');
    }else{
      builtHTML_noUser();
      console.log('nouser built done');
    };
   })
   .fail(function(XMLHttpRequest,textStatus,errorThrown){
     alert('error');
     console.log(XMLHttpRequest.status);
     console.log(textStatus);
     console.log(errorThrown);
   })
   .always(function(){
     console.log('always log');
   });
  });
});