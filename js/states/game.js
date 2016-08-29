/* Define a Game state for our game
 * The game state will handle the actual gameplay of our game.
 */
var Game = function (game) {
    mapData = null;
    mapLayer = null;
    ladderLayer = null;
    vineLayer = null;
    exitLayer = null;
    edgesLayer = null;
    canClimb = false;
    player = null;
    enemy = null;
    fire = null;
    fireCollected = false;
    gameState = null;
    background = null;
    canCross = false;
    spear = null;
    spearCollected = 0;
    stick = null;
    spearHead = null;
    stickCollected = false;
    spearHeadCollected = false;
    music = null;
    attackKey = null;
    attackSpear = null;
    walk = null;
    randomLocations = null;
    birds = null;
    fly = null;
    totalBirds = 0;
    parent = null;
    enemyGroup = null;
    heart = null;
    part1 = null;
    part2 = null;
    throwSpear = null;
    winningSound = null;
    climbingSound = null;
    enemyRunSound = null;
    playerDieSound = null;
    enemyDieSound = null;
    itemPickUpSound = null;
    climbing = 0;
    enemyRunning = 0;
};

Game.prototype = {
    
    preload: function () {
         spearCollected = 0;
        /* display darkolivegreen for this state */
        this.game.stage.backgroundColor = '#73DCFF';
        gameState = this.game.state;
        fireCollected = false;
        /* choose random locations for items */
        randomLocations = this.chooseLocation();
        parent = this;
    },

    create: function () {
        
        /* create our enemy group */
        //enemyGroup = this.game.add.group();
        
        // Define movement constants
        this.MAX_SPEED = 120; // pixels/second
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 350;
        
        /* create our background */
        background = this.game.add.sprite(0,0,'background');
        background.alpha = 0.6;
        
        /* load our map data */
        this.initMapData();
        this.game.physics.arcade.enable([this.mapLayer]);
        
        /* create our birds */
        this.createBirds();
        
        /* create our player */
        player = new Player(this.game, 390, 559);

        /* create our enemies*/        
        enemy = new Enemy(parent, 220, 530);
        this.game.add.existing(enemy);
        
        enemy2 = new Enemy(parent,752, 239);
        this.game.add.existing(enemy2);
        //enemyGroup.add(enemy2);
        enemy3 = new Enemy(parent,145, 336);
        this.game.add.existing(enemy3);
        //enemyGroup.add(enemy2);
        
        /* create the fire object */
        fire = this.game.add.sprite(randomLocations[0].x, randomLocations[0].y, 'fire');
        this.setObjectProperties(fire, this.game, true, true);
        fire.scale.setTo(1.5, 1.5);
        
        /* create the spear object */
        spear = this.game.add.sprite(16, 16, 'spear');
        this.setObjectProperties(spear, this.game, true, true);
        spear.scale.setTo(2,2);
        spear.alpha = 0;
        
        /* create the weapon object */
        attackSpear = this.game.add.weapon(1, 'spear');
        attackSpear.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        attackSpear.bulletSpeed = -400;
        attackSpear.fireRate = 100;
        attackSpear.bulletLifespan = 1000;
        attackSpear.bulletGravity = (0,0);
        attackSpear.trackSprite(player, 0, 0, true);
        attackSpear.bulletAngleOffset = 45;
        
        /* create the spear head object */
        spearHead = this.game.add.sprite(randomLocations[1].x, randomLocations[1].y, 'spearHead');
        this.setObjectProperties(spearHead, this.game, true, true);
        
        /* create the stick object */
        stick = this.game.add.sprite(randomLocations[2].x, randomLocations[2].y, 'stick');
        this.setObjectProperties(stick, this.game, true, true);
        
        /* enable collisions on the map */
        this.initMapCollisions(this.destroyAll);
        
        /* enable keyboard controls */
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.S
        ]);
        
        /* create our music */
        music = this.game.add.audio('bgMusic', 1, true);
        music.play();
        part1 = this.game.add.audio('spearPart1');
        part2 = this.game.add.audio('spearPart2');
        throwSpear = this.game.add.audio('spearThrow');
        winningSound = this.game.add.audio('winningSound');
        climbingSound = this.game.add.audio('climbingSound');
        enemyRunSound = this.game.add.audio('enemyRunSound');
        playerDieSound = this.game.add.audio('playerDieSound');
        enemyDieSound = this.game.add.audio('enemyDieSound');
        itemPickUpSound = this.game.add.audio('itemPickUpSound');
        
        enemyRunSound.onStop.add(this.soundStopped, this);
        climbingSound.onStop.add(this.soundStopped, this);
        
        /* create our lives */
        for(var i = 0; i < lives; i ++) {
            var x = 752 - (i * 16);
            heart = this.game.add.sprite(x, 32, 'heart');
            this.setObjectProperties(heart, this.game, true, true);
        }

    },

    update: function () {
        /* check for collisions */
        this.game.physics.arcade.collide(player, this.mapLayer);
        this.game.physics.arcade.collide(player, this.ladderLayer);
        this.game.physics.arcade.collide(player, this.exitLayer);
        this.game.physics.arcade.collide(player, this.vineLayer);
        //this.game.physics.arcade.collide(player, this.edgesLayer);
        this.game.physics.arcade.collide(enemy, this.edgesLayer);
        this.game.physics.arcade.collide(fire, this.mapLayer);
        this.game.physics.arcade.collide(enemy, attackSpear);
        this.game.physics.arcade.collide(enemy, this.mapLayer);
        //enemy movement
        
        /* check for item collisions */
        this.itemCollisionUpdate();
        if(spearHeadCollected && stickCollected) {
            spear.alpha = 1;
            spearCollected++;
            spearHeadCollected = false;
            stickCollected = false;
            itemPickUpSound.play();
        }
        
        /*check for collision between player and enemy*/
        if(this.game.physics.arcade.collide(player, enemy)){
            playerDieSound.play();
            this.destroyAll();
            lives--;
            if(lives == 0){
                this.game.state.start('GameOver');
            }
            else {
                this.game.state.start('Game');
            }
        }
        if(this.game.physics.arcade.collide(player, enemy3)){
            playerDieSound.play();
            this.destroyAll();
            lives--;
            if(lives == 0){
                this.game.state.start('GameOver');
            }
            else {
                this.game.state.start('Game');
            }
        }
        if(this.game.physics.arcade.collide(player, enemy2)){
            playerDieSound.play();
            this.destroyAll();
            lives--;
            if(lives == 0){
                this.game.state.start('GameOver');
            }
            else {
                this.game.state.start('Game');
            }
        }
        
        /* check for player input */
        this.playerInputUpdate();
        
        if (this.game.physics.arcade.collide(enemy, attackSpear.bullets))
        {
            enemy.kill();
            enemyDieSound.play();
        }
         if (this.game.physics.arcade.collide(enemy2, attackSpear.bullets))
        {
            enemy2.kill();
            enemyDieSound.play();
        }
         if (this.game.physics.arcade.collide(enemy3, attackSpear.bullets))
        {
            enemy3.kill();
            enemyDieSound.play();
        }
        
        /* see if birds are out of bounds */
        if(birds.worldPosition.x > 840) {
            if(totalBirds == 1){
            birds.destroy();
            totalBirds = 0;
            var randomNum = Math.floor(Math.random() * 6 + 1);
            this.game.time.events.add(Phaser.Timer.SECOND * randomNum, this.createBirds, this);
            }
        }
    },
    
    
    enemyFollow: function(tempEnemy){
        var close = Math.abs(player.x - tempEnemy.x) < 50 && Math.abs(player.y - tempEnemy.y) < 35;
       if(close){
            tempEnemy.body.velocity.x = Math.min(this.MAX_SPEED * 2, 
            Math.max(4 * (player.x - tempEnemy.x), -this.MAX_SPEED * 2)) ;
            if(enemyRunning == 0) {
                enemyRunSound.play();
                enemyRunning = 1;
            }
        }
        return close;
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
    
    attackInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.S);
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
        this.edgesLayer = this.mapData.createLayer('edges');
        this.game.add.existing(this.edgesLayer);
    },
    
    initMapCollisions: function(des) {
        this.mapLayer.enableBody = true;
        player.body.collideWorldBounds = true;
        this.mapData.setCollisionBetween(0,2000,true,this.mapLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.ladderLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.edgesLayer);
        this.mapData.setTileIndexCallback(10, function() {
            parent.checkTiles(true, false);
        }, this.game, this.ladderLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.exitLayer);
        this.mapData.setTileIndexCallback(13, function() {
            if(fireCollected){
                winningSound.play();
                des();
                gameState.start('Level2');
            }
        }, this.game, this.exitLayer);
        this.mapData.setCollisionBetween(0,2000,true,this.vineLayer);
        this.mapData.setTileIndexCallback(68, function() {
            parent.checkTiles(false, true);
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
    
    playerInputUpdate: function() {
        if (this.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            player.body.velocity.x = -this.MAX_SPEED;
            attackSpear.bulletSpeed = -400;
            attackSpear.bulletAngleOffset = 225;
            player.scale.setTo(0.65,0.65);
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            player.body.velocity.x = this.MAX_SPEED;
            attackSpear.bulletSpeed = 400;
            attackSpear.bulletAngleOffset = 45;
            player.scale.setTo(-0.65,0.65);
        }
        // for testing purposes - DELETE or uncomment later
        /*
        else if (this.spacebarInputIsActive()) {
            player.body.velocity.y = -this.MAX_SPEED;
        }
        */
        else {
            // Stop the player from moving horizontally
            player.body.velocity.x = 0;
        }
        if (this.upInputIsActive()) {
            canClimb = true;
            canCross = true;
            parent.checkTiles(false, false);
        }
        else {
            canClimb = false;
            canCross = false;
        }
        if(this.attackInputIsActive()) {
            if(spearCollected > 0){
                //spearCollected -= 1;
                //spear.alpha = 0;
                attackSpear.fire();
                throwSpear.play();
            }
        }
    },
    
    itemCollisionUpdate: function() {
        /* fire collected */
        if(this.game.physics.arcade.collide(player, fire)){
            fireCollected = true;
            itemPickUpSound.play();
            fire.destroy();
        }
        /* spear collected */
        if(this.game.physics.arcade.collide(player, spear)){
            spearCollected++;
            spear.destroy();
        }
        /* spear head collected */
        if(this.game.physics.arcade.collide(player, spearHead)){
            spearHeadCollected = true;
            part1.play();
            spearHead.destroy();
        }
        /* stick collected */
        if(this.game.physics.arcade.collide(player, stick)){
            stickCollected = true;
            part2.play();
            stick.destroy();
        }
    },
    
    createBirds: function() {
        birds = new Bird(this.game, -20, 32);
        totalBirds = 1;
    },
    
    checkTiles: function(bool, bool2) {
        if (canClimb && bool) {
            player.body.velocity.y = -100;
            if(climbing == 0) {
                climbingSound.play();
                climbing = 1;
            }
        }
        if (canCross && bool2) {
            player.body.velocity.y = 0;
            //player.body.allowGravity = false;
        }
    },
    
    chooseLocation: function() {
        var spots = [{"x":129, "y":109},{"x":120, "y":336},{"x":467, "y":430},{"x":752, "y":239},{"x":32, "y":176},{"x":32,"y":432}];
        var results = [];
        for (var i = 0; i < 3; i++){
            var counter = 6 - i;
            var randomNum = Math.floor(Math.random() * counter);
            var choice = spots[randomNum];
            spots.splice(randomNum,1);
            results.push(choice);
        }
        return results;
    },
    
    destroyAll: function() {
        music.stop();
        //enemy2.destroy();
        //enemy3.destroy();
        //enemy.destroy();
        music.destroy();
        birds.destroy();
        spear.destroy();
        spearHead.destroy();
        stick.destroy();
        fire.destroy();
        //player.destroy();
    },
    
    soundStopped: function(sound) {
        if (sound.name === "enemyRunSound") {
            enemyRunning = 0;
        }
        if(sound.name === "climbingSound") {
            climbing = 0;
        }
    }
};