document.getElementById("saveName").addEventListener("click", function(){
    var nameField = document.getElementById("name");
    if(nameField.value) setUsername(nameField.value);
})

// Set the username onload if user has it saved in browser local storage
var localname = localStorage.getItem("shnek-name");
if(localname) setUsername(localname);

var name;
var oldHighscore = 0;
function setUsername(username){
    name = username;
    localStorage.setItem("shnek-name", username);
    document.getElementById("name").setAttribute('placeholder', username);
    firebase.database().ref('users/' + name).once('value').then(function(snapshot){
        if(snapshot.val()){
            oldHighscore = snapshot.val().highscore;
        } else oldHighscore = 0;
    })
}

function saveHighscore(){
    if(name && points > oldHighscore){
        const set = {
            "highscore": points
        };
        firebase.database().ref('users/' + name).set(set);
        oldHighscore = points;
    }
}
getLeaderboard();

function getLeaderboard(){
    firebase.database().ref('users/').once('value').then(function(snapshot){
        var leaderboard = [];
        for(playerName in snapshot.val()){
            leaderboard.push({
                score: snapshot.val()[playerName].highscore,
                name: playerName
            });
        }
        leaderboard.sort((a,b) => {return a.score < b.score});
        console.log(leaderboard);
        var lbPlaceholder = document.getElementById("leaderboard");
        while(lbPlaceholder.childElementCount > 1){
            lbPlaceholder.removeChild(lbPlaceholder.lastChild);
        }
        leaderboard.forEach(e => {
            var scoreLine = document.createElement("li");
            scoreLine.innerText = e.name + ": " + e.score;
            lbPlaceholder.appendChild(scoreLine);
        })
    })

}

