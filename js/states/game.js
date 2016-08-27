/* Define a Game state for our game
 * The game state will handle the actual gameplay of our game.
 */
var Game = function () {};
Game.prototype = {

    preload: function () {
        /* display darkolivegreen for this state */
        this.stage.backgroundColor = '#556B2F';
    },

    create: function () {
        /* start the game over state */
        setTimeout(function () {
            this.game.state.start('GameOver');
        }, 3000);
    },

    update: function () {

    }
};
