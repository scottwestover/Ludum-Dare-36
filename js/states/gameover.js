/* Define a GameOver state for our game
 * The game over state will display when our game ends. This state will allow the player
 * to restart the game, or to navigate back to the main menu state.
 */
var GameOver = function () {};
GameOver.prototype = {

    preload: function () {
        /* display maroon for this state */
        this.stage.backgroundColor = '#800000';
    },

    create: function () {
        /* start the main menu state */
        setTimeout(function () {
            //this.game.state.start('MainMenu');
            this.game.state.start('Game');
        }, 3000);
    }

};
