var pressed = [];

window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false); 

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
