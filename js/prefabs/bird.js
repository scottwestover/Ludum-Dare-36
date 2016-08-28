var Bird = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'birds');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.body.velocity.x = 150;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(-0.75,0.75);
    this.animations.add('fly', [0,1,2,3,4]);
    this.animations.play('fly', 7, true);
    
    game.add.existing(this);
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
}