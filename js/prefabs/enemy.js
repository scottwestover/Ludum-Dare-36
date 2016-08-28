var Enemy = function(parentObj,x, y){
    Phaser.Sprite.call(this, parentObj.game, x, y, 'enemy_caveman');
    parentObj.setObjectProperties(this, parentObj.game, true, false);
    this.body.velocity.x = 120 / 2;
    this.body.bounce.x = 1;
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(-0.65,0.65);
    this.parentObj = parentObj;
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(){
    this.parentObj.game.physics.arcade.collide(this, this.parentObj.edgesLayer, function(tempEnemy, edge){
        if(tempEnemy.body.velocity.x < 0){
            tempEnemy.body.velocity.x = -120 /2;
        }else{
            tempEnemy.body.velocity.x = 120 /2;
        }
    }, null,this);
    this.scale.x = -0.65 * (this.body.velocity.x/Math.abs(this.body.velocity.x));
    this.parentObj.game.physics.arcade.collide(this, this.parentObj.mapLayer);
    this.parentObj.enemyFollow(this);
}