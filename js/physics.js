function fall(object, targetY){
    
    if(object.position.y > targetY + 2.8){
        if(object.downSpeed){
            if(object.position.y - object.downSpeed < targetY + 1){
                object.position.y = targetY + 2.8
            } else {
                object.position.y -= object.downSpeed;
                object.downSpeed += G_FORCE;
            }
        }else{
            object.downSpeed = G_FORCE;
        }
    }else{
        
        if(object.jump){
            object.downSpeed = -SPEED;
            object.position.y -= object.downSpeed;
            object.downSpeed += G_FORCE;
            
        } else if(object.downSpeed){
            if(object.downSpeed >=  0){
                object.downSpeed = 0;
            }
            object.falling = false;
            object.position.y = getGroundY(object, currentGround) + 0.3;
        }
    }
}

function move(object){
    
    if(object.speed || object.speed == 0){
        if(pressed.indexOf("d") > -1){
            object.moveRight = true;
        }else {
            object.moveRight = false;
        }
        
        if(pressed.indexOf("a") > -1){
            object.moveLeft = true; 
        }else{
            object.moveLeft = false;
        }

        if(object.moveRight){
        
            object.speed += HORIZONTAL_SPEED;
            object.speed = (object.speed / TOP_SPEED) > 1 ? TOP_SPEED : object.speed;
     
        }else if(object.speed > 0){
            object.speed -= HORIZONTAL_SPEED;
            object.speed = object.speed < 0.001 ? 0 : object.speed;
        }
        
        if(object.moveLeft){
            object.speed -= HORIZONTAL_SPEED;
            object.speed = (object.speed / TOP_SPEED) < -1 ? -TOP_SPEED : object.speed;
        }else if(object.speed < 0){
            object.speed += HORIZONTAL_SPEED;
            object.speed = object.speed > -0.001 ? 0 : object.speed;
        }

        object.position.x += object.speed;
    

    }else{
        object.speed = 0;
    }
    var groundY = getGroundY(object, currentGround) + 0.3;
    if(object.position.y < groundY){
        object.position.y = groundY;
    }
   
    if(pressed.indexOf(" ") > -1){
        object.jump = true;
        object.falling = true;
    }else{
        object.jump = false;
    }
}