var xhr = new XMLHttpRequest();
var url = "http://ext-api.info.iii-space.com/api/login_fz"
xhr.open("post",url+"?workcode=068108",true)
xhr.send();
xhr.onreadystatechange= function(){

};
if(xhr.readyState === 4){
    if(xhr.status === 200){
        var responseText =xhr.responseText;
    }
}