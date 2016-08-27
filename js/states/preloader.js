/* Define a Preloader state for our game
 * The preloader state will load all of our assets that are used in our game,
 * load and create all of our states, and when it is done, it will start
 * the main menu.
 */
var Preloader = function () {};
Preloader.prototype = {

    init: function () {
        /* initialize our progress bar and logo */
        this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loadingBar");
        this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
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
        /* load all of the assets for our game */
    },

    create: function () {
        /* add the rest of our states to our game */
        game.state.add('MainMenu', MainMenu);
        game.state.add('Game', Game);
        game.state.add('GameOver', GameOver);
        /* start the main menu state */
        setTimeout(function () {
            this.game.state.start('MainMenu');
        }, 3000);
    }

};
