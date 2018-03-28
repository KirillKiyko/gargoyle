// sanity check
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
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
           url: "/", // the endpoint
           type: "POST", // http method
           data: {contact_name : $('#contact_name').val(),
                  contact_email: $('#contact_email').val(),
                  content: $('#content').val(),
                  csrfmiddlewaretoken:getCookie('csrftoken')}, // data sent with the post request

           // handle a successful response
           success : function(json) {
               console.log(json);
               $('#form-success').text('Thank you for your message');
               $('#form-success').show();
               $('#contact_name').val('');
               $('#contact_email').val('');
               $('#content').val('');
               console.log("success"); // another sanity check
           },

           // handle a non-successful response
           error : function(xhr,errmsg,err) {
               $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                   " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
               console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
           }
       });
       return false;
    });
});