/* Define a Game state for our game
 * The game state will handle the actual gameplay of our game.
 */
var Game = function () {
    this.mapData;
    this.mapLayer;
    this.ladderLayer;
    this.vineLayer;
    this.exitLayer;
};
var canClimb = false;
var player;
var enemy;
var fire;
var fireCollected = false;
var gameState;
var background;
var canCross = false;
var spear;
var spearCollected = 0;
var stick;
var spearHead;
var music;
Game.prototype = {

    preload: function () {
        /* display darkolivegreen for this state */
        this.game.stage.backgroundColor = '#73DCFF';
        gameState = this.game.state;
    },

    create: function () {
        
        // Define movement constants
        this.MAX_SPEED = 150; // pixels/second
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 350;
        
        /* create our background */
        background = this.game.add.sprite(0,0,'background');
        background.alpha = 0.6;
        
        /* load our map data */
        this.initMapData();
        this.game.physics.arcade.enable([this.mapLayer]);
        
        /* create our player */
        player = this.game.add.sprite(351, 559, 'phaser', 15);
        this.setObjectProperties(player, this.game, true, false);
        
        /* create one enemy */
        enemy = this.game.add.sprite(200, 520, 'phaser', 14);
        this.setObjectProperties(enemy, this.game, true, false);
        enemy.body.velocity.x = this.MAX_SPEED / 2;
        
        /* create the fire object */
        fire = this.game.add.sprite(129, 109, 'fire');
        this.setObjectProperties(fire, this.game, true, true);
        fire.scale.setTo(1.5, 1.5);
        
        /* create the spear object */
        spear = this.game.add.sprite(16, 16, 'spear');
        this.setObjectProperties(spear, this.game, true, true);
        
        /* create the spear head object */
        spearHead = this.game.add.sprite(120, 336, 'spearHead');
        this.setObjectProperties(spearHead, this.game, true, true);
        
        /* create the stick object */
        stick = this.game.add.sprite(467, 430, 'stick');
        this.setObjectProperties(stick, this.game, true, true);
        
        /* enable collisions on the map */
        this.initMapCollisions();
        
        /* enable keyboard controls */
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);
        
        /* create our music */
        music = this.game.add.audio('bgMusic', 1, true);
        music.play();
        
    
        /* start the game over state */
        /*
        setTimeout(function () {
            this.game.state.start('GameOver');
        }, 3000);
        */
    },

    update: function () {

        /* check for collisions */
        this.game.physics.arcade.collide(player, this.mapLayer);
        this.game.physics.arcade.collide(player, this.ladderLayer);
        this.game.physics.arcade.collide(player, this.exitLayer);
        this.game.physics.arcade.collide(player, this.vineLayer);
        //enemy movement
        this.game.physics.arcade.collide(enemy, this.mapLayer, function(enemy, platform){
            if((enemy.body.velocity.x > 0 && enemy.x > platform.x + (platform.width - enemy.width))
            ||(enemy.body.velocity.x < 0 && enemy.x < platform.x)){ 
                enemy.body.velocity.x *= -1;
            }
        });
        if(this.game.physics.arcade.collide(player, fire)){
            fireCollected = true;
            fire.destroy();
        }
        if(this.game.physics.arcade.collide(player, spear)){
            spearCollected++;
            spear.destroy();
            console.log(spearCollected);
        }
        /*check for collision between player and enemy*/
        if(this.game.physics.arcade.collide(player, enemy)){
            music.stop();
            music.destroy();
            this.game.state.start('Game');
        }
        
        this.game.physics.arcade.collide(fire, this.mapLayer);
        /* check for player input */
        if (this.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            player.body.velocity.x = -this.MAX_SPEED;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            player.body.velocity.x = this.MAX_SPEED;
        }
        // for testing purposes - DELETE or uncomment later
        else if (this.spacebarInputIsActive()) {
            player.body.velocity.y = -this.MAX_SPEED;
        }else {
            // Stop the player from moving horizontally
            player.body.velocity.x = 0;
        }
        if (this.upInputIsActive()) {
            canClimb = true;
            canCross = true;
            checkTiles(false, false);
        }
        else {
            canClimb = false;
            canCross = false;
        }
        
    },
    
    // This function should return true when the player activates the "go left" control
    // In this case, either holding the right arrow or tapping or clicking on the left
    // side of the screen.
    leftInputIsActive: function() {
         var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x < this.game.width/4);

        return isActive;
    },
    
    enemyFollow: function(){
       // enemy.body.velocity.x = Math.min(MAX_SPEED, Math.max(player.x - enemy.x, -MAX_SPEED)) ;
    },
    
    // This function should return true when the player activates the "go right" control
    // In this case, either holding the right arrow or tapping or clicking on the right
    // side of the screen.
    rightInputIsActive: function() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

        return isActive;
    },
    
    spacebarInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        return isActive;
    },
    
    upInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
        return isActive;
    },
    
    initMapData: function() {
        this.mapData = this.game.add.tilemap('level1');
        this.mapData.addTilesetImage('tilesheet1');
        this.mapLayer = this.mapData.createLayer('level1');
        this.game.add.existing(this.mapLayer);
        this.ladderLayer = this.mapData.createLayer('ladder');
        this.game.add.existing(this.ladderLayer);
        this.vineLayer = this.mapData.createLayer('vines');
        this.game.add.existing(this.vineLayer);
        this.exitLayer = this.mapData.createLayer('exit');
        this.game.add.existing(this.exitLayer);
    },
    
    initMapCollisions: function() {
        this.mapLayer.enableBody = true;
        player.body.collideWorldBounds = true;
        this.mapData.setCollisionBetween(0,2000,true,this.mapLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.ladderLayer);
        this.mapData.setTileIndexCallback(10, function() {
            checkTiles(true, false);
        }, this.game, this.ladderLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.exitLayer);
        this.mapData.setTileIndexCallback(13, function() {
            if(fireCollected){
                gameState.start('GameOver');
            }
        }, this.game, this.exitLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.vineLayer);
        this.mapData.setTileIndexCallback(68, function() {
            checkTiles(false, true);
        }, this.game, this.vineLayer);
    },
    
    setObjectProperties: function(obj, game, bodyEnable, cantMove) {
        game.physics.arcade.enable([obj]);
        obj.enableBody = bodyEnable;
        obj.physicsBodyType = Phaser.Physics.ARCADE;
        if(cantMove){
           obj.body.moves = false;
        }
    },
    
};

function checkTiles(bool, bool2) {
    if (canClimb && bool) {
        player.body.velocity.y = -100;
    }
    if (canCross && bool2) {
        player.body.velocity.y = 0;
        //player.body.allowGravity = false;
    }
}