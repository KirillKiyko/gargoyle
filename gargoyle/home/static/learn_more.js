function getMore(lang){
if(document.getElementById('learn_check_' + lang).checked="true"){
        document.getElementById('learn_modal-' + lang).style.transform = "translateX(0)";
    } else {
        document.getElementById('learn_modal-' + lang).style.transform = "translateX(100%)";
    }
}
