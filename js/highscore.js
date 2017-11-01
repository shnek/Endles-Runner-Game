document.getElementById("saveName").addEventListener("click", function(){
    console.log('clicked');
    var name = document.getElementById("name").value;
    if(name) localStorage.setItem("shnek-name", name);
})

var username = localStorage.getItem("shnek-name");
if(username) document.getElementById("name").setAttribute('placeholder', username);