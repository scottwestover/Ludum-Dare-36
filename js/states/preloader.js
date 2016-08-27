/* Define a Preloader state for our game
 * The preloader state will load all of our assets that are used in our game,
 * load and create all of our states, and when it is done, it will start
 * the main menu.
 */
var Preloader = function () {};
Preloader.prototype = {

    preload: function () {
        /* display lime for this state */
        this.stage.backgroundColor = '#00ff00';
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
