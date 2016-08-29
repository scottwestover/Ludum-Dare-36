/* Define a Preloader state for our game
 * The preloader state will load all of our assets that are used in our game,
 * load and create all of our states, and when it is done, it will start
 * the main menu.
 */
var Preloader = function () {};
var lives = 3;
Preloader.prototype = {

    init: function () {
        /* initialize our progress bar and logo */
        this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loadingBar");
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.status]);
    },

    preload: function () {
        /* display lime for this state */
        this.stage.backgroundColor = '#000000';
        /* display our progress bar and logo */
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);
        /* load the assets for our states */
        this.game.load.script('menu', 'js/states/menu.js');
        this.game.load.script('game', 'js/states/game.js');
        this.game.load.script('gameover', 'js/states/gameover.js');
        this.game.load.script('style', 'js/style.js');
        this.game.load.script('style1', 'js/style1.js');
        this.game.load.script('level2Script', 'js/states/level2.js');
        this.game.load.script('instructions', 'js/states/howto.js');
        this.game.load.script('playerScript', 'js/prefabs/player.js');
        this.game.load.script('enemyScript', 'js/prefabs/enemy.js');
        this.game.load.script('birdScript', 'js/prefabs/bird.js');
        /* load all of the assets for our game */
        this.game.load.tilemap('level1', 'assets/images/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level2', 'assets/images/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilesheet1', 'assets/images/tilesheet1.png');
        this.game.load.spritesheet('phaser', 'assets/images/tilesheet1.png', 16, 16);
        this.game.load.image('fire', 'assets/images/fire.png');
        this.game.load.image('background', 'assets/images/forest.png');
        this.game.load.image('spear', 'assets/images/spear.png');
        this.game.load.image('spearHead', 'assets/images/spearHead.png');
        this.game.load.image('stick', 'assets/images/stick.png');
        this.game.load.spritesheet('caveman', 'assets/images/spritesheet_caveman.png', 32, 32);
        this.game.load.spritesheet('enemy_caveman', 'assets/images/spritesheet_caveman_enemy.png', 32, 32);
        this.game.load.spritesheet('birds', 'assets/images/birds.png', 32, 32, 12);
        this.game.load.image('heart', 'assets/images/heart.png');
        this.game.load.image('cave', 'assets/images/cave.jpg');
        /* load the audio for our game */
        this.game.load.audio('bgMusic', 'assets/audio/Overworld.mp3');
        this.game.load.audio('menuMusic', 'assets/audio/Menu.mp3');
        this.game.load.audio('spearPart1', 'assets/audio/spearPart1.mp3');
        this.game.load.audio('spearPart2', 'assets/audio/spearPart2.mp3');
        this.game.load.audio('climbingSound', 'assets/audio/climbing.mp3');
        this.game.load.audio('enemyDieSound', 'assets/audio/enemyDie.mp3');
        this.game.load.audio('enemyRunSound', 'assets/audio/enemyRun.mp3');
        this.game.load.audio('itemPickUpSound', 'assets/audio/itemPickup.mp3');
        this.game.load.audio('playerDieSound', 'assets/audio/playerDie.mp3');
        this.game.load.audio('winningSound', 'assets/audio/winning.mp3');
        this.game.load.audio('spearThrow', 'assets/audio/spearThrow.mp3');
    },

    create: function () {
        /* add the rest of our states to our game */
        game.state.add('MainMenu', MainMenu);
        game.state.add('Game', Game);
        game.state.add('GameOver', GameOver);
        game.state.add('Level2', Level2);
        game.state.add('Instructions', Instructions);
        /* start the main menu state */
        setTimeout(function(){ 
            this.game.state.start('MainMenu');
            //this.game.state.start('Game');
            //this.game.state.start('Level2');
        }, 500);
    }

};
