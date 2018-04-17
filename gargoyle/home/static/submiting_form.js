function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$(document).ready(function(){
    $("#test").submit(function(event){
       event.preventDefault();
       $.ajax({
           url: "/",
           type: "POST",
           data: {contact_name : $('#contact_name').val(),
                  contact_email: $('#contact_email').val(),
                  content: $('#content').val(),
                  csrfmiddlewaretoken:getCookie('csrftoken')},

           success : function(json) {
               $('#form-success').text('Thank you for your message');

               $('#form-success').css('animation', 'success 5s ease-in-out alternate');

               setTimeout("$('#form-success').css('animation', 'none')", 5000);

               $("#test")[0].reset();

               $('[for=contact_name]').removeClass('active');
               $('[for=contact_email]').removeClass('active');
               $('[for=content]').removeClass('active');
           },

           error : function(xhr,errmsg,err) {
               $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                   " <a href='#' class='close'>&times;</a></div>");
               console.log(xhr.status + ": " + xhr.responseText);
           }
       });
       return false;
    });
});