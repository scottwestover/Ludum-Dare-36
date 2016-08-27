/* Define a MainMenu state for our game
 * The main menu state will allow us to list the all of the options available to the player
 * such as: start game, continue, credits, options, etc.
 */
var MainMenu = function () {};
MainMenu.prototype = {

    preload: function () {
        /* display slategrey for this state */
        this.stage.backgroundColor = '#708090';
    },

    create: function () {
        /* start the game state */
        setTimeout(function () {
            this.game.state.start('Game');
        }, 3000);
    }

};
