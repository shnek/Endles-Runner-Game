var pressed = [];
var first = 0;


window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false); 
window.addEventListener('touchstart', touchStartEvent, false);
window.addEventListener('touchend', touchStartEvent, false);

function handleKeyDown(event){
    var index = pressed.indexOf(event.key.toLowerCase());
    if(index > -1){
        // Don't do anything because the key is already pressed (it's in the array of pressed keys)
    }else{
        // Add current key to the array of pressed keys.
        pressed.push(event.key.toLowerCase());
    }
}

function handleKeyUp(event){
    var index = pressed.indexOf(event.key.toLowerCase());
    if(index > -1){
        // If we can find the current key being released in the array of currently pressed keys, we remove it from there!
        pressed.splice(index, 1);
    }
}

function touchStartEvent(event){
    var arr = Object.keys(event.touches).map(function(k){
        return event.touches[k];
    });
    pressed.length = 0;
    arr.forEach(touch => {
        // console.log(touch.clientX + ":" + touch.clientY);
        if(touch.clientY < gameHeight/2){
            pressed.push(' ');
        } else if(touch.clientX > gameWidth/2){
            pressed.push('d');
        } else {
            pressed.push('a');
        }
    })
    // console.log(gameWidth + ":" + gameHeight)
    // for(i = 0; i < event.touches.length; i++){
    //     console.log(event.touches.i.clientX);
    // }
    // if(first == 0){
    //     pressed.push('d');
    //     first += 1;
    // }else if(first == 1){
    //     pressed.push(' ');
    //     first += 1;
    // }

}

function touchEndEvent(event){
    // console.log(event.touches);
    if(first == 2){
        pressed.splice(pressed.indexOf(" "), 1);
        first -= 1;
    }else if(first == 1){
        pressed.splice(pressed.indexOf('d'), 1);
        first -= 1;
    }

}