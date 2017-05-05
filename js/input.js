var pressed = [];


window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false); 
window.addEventListener('touchstart', touchEvent, false);
window.addEventListener('touchend', touchEvent, false);

function handleKeyDown(event){
    var index = pressed.indexOf(event.key.toLowerCase());
    if(index > -1){
        // Don't do anything because the key is already pressed (it's in the array of pressed keys)
    }else{
        // Add current key to the array of pressed keys.
        pressed.push(event.key.toLowerCase());
    }
    if(event.key == "Enter"){
        start();
    }
}

function handleKeyUp(event){
    var index = pressed.indexOf(event.key.toLowerCase());
    if(index > -1){
        // If we can find the current key being released in the array of currently pressed keys, we remove it from there!
        pressed.splice(index, 1);
    }
}

function touchEvent(event){
    // Convert JSON having touch events as entries to array for easier processing
    var arr = Object.keys(event.touches).map(function(k){
        return event.touches[k];
    });
    // Zeroing array everytime we add new touchEvent in order to not worry about removing stuff from array or adding twice.
    pressed.length = 0;
    arr.forEach(touch => {
        if(touch.clientY < gameHeight/2){
            pressed.push(' ');
        } else if(touch.clientX > gameWidth/2){
            pressed.push('d');
        } else {
            pressed.push('a');
        }
    })

}
