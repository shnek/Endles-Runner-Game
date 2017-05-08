var clock = new THREE.Clock();

var animations = [];


function createAnimations(){
    var grassTexture = new THREE.ImageUtils.loadTexture('img/run.png');
    console.log(grassTexture);
    var grass = new TextureAnimator(grassTexture, 10, 1, 10, 75);
    var grassMaterial = new THREE.MeshBasicMaterial( { map: grassTexture, side: THREE.DoubleSide })
    var grassGeometry = new THREE.PlaneGeometry( 1, 1, 1, 1);
    var grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
    grassMesh.position.set(0, 5, 0);
    scene.add(grassMesh);
    animations.push(grass);


    console.log("adding")
  
}

function updateAnimations(){
    // var delta = clock.getDelta();
    // animations.forEach(animation => {
    //     animation.update(1000*delta);
    // })
    
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	// how long has the current image been displayed?
	this.currentDisplayTime = 0;
	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}		
