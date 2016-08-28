var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'caveman');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.enableBody = true;
    //this.body.allowGravity = false;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.65,0.65);
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
    this.MAX_SPEED2 = 120;
    
    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    this.playerInputUpdate();
}

Player.prototype.playerInputUpdate = function() {
    if (this.leftInputIsActive()) {
        // If the LEFT key is down, set the player velocity to move left
        this.body.velocity.x = -this.MAX_SPEED2;
        this.scale.setTo(0.65,0.65);
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, set the player velocity to move right
        this.body.velocity.x = this.MAX_SPEED2;
        this.scale.setTo(-0.65,0.65);
    }
    else {
        // Stop the player from moving horizontally
        this.body.velocity.x = 0;
    }
}

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
Player.prototype.leftInputIsActive = function() {
    var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.x < game.width/4);
    return isActive; 
}

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
Player.prototype.rightInputIsActive = function() {
    var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.x > game.width/2 + this.game.width/4);
    return isActive; 
}