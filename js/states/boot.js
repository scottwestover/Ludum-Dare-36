/* Create yourphaser game object, and insert it into the div on the index.html */
var game = new Phaser.Game(800, 608, Phaser.AUTO, 'game');
/* Define a Boot state for our game
 * The boot state will load all of our assets for pre-loader state
 * and then start that state.
 */
var Boot = function () {};
Boot.prototype = {

    preload: function () {
        /* load the assets for our preloader */
        this.game.load.script('preloader', 'js/states/preloader.js');
        this.game.load.image('loadingBar', 'assets/images/loading.png');
        this.game.load.script('utils', 'js/utils.js');
    },

    create: function () {
        /* add the preloader state to our game */
        game.state.add('Preloader', Preloader);
        /* start the preloader state */
        this.game.state.start('Preloader');
    }

};
/* add the boot state to our game and start it */
game.state.add('Boot', Boot);
game.state.start('Boot');
