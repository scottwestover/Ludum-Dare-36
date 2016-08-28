/* Define a GameOver state for our game
 * The game over state will display when our game ends. This state will allow the player
 * to restart the game, or to navigate back to the main menu state.
 */
var GameOver = function () {};
GameOver.prototype = {
    
    init: function () {
        style.fill = "#fff";
    },

    preload: function () {
        /* display maroon for this state */
        this.stage.backgroundColor = '#000000';
        lives = 3;
    },

    create: function () {
         /* play again game text */
        var playAgainText = game.add.text(0,0,"Play Again",style);
        /* sets the bounds of the text to center it */
        playAgainText.setTextBounds(0, 100, 800, 200);
        /* if the start text is clicked, start the game state */
        playAgainText.inputEnabled = true;
        playAgainText.events.onInputUp.add(function () { this.game.state.start('Game'); });
        /* adds a hover effect to our play button */
        playAgainText.events.onInputOver.add(function () {
            playAgainText.fill= "#a6a6a6";
        });
        playAgainText.events.onInputOut.add(function (target) {
            playAgainText.fill= "#fff";
        });
        /* main menu game text */
        var menuText = game.add.text(0,0,"Main Menu",style);
        /* sets the bounds of the text to center it */
        menuText.setTextBounds(0, 100, 800, 500);
        /* if the menu text is clicked, start the menu state */
        menuText.inputEnabled = true;
        menuText.events.onInputUp.add(function () { this.game.state.start('MainMenu'); });
        /* adds a hover effect to our menu button */
        menuText.events.onInputOver.add(function () {
            menuText.fill= "#a6a6a6";
        });
        menuText.events.onInputOut.add(function (target) {
            menuText.fill= "#fff";
        });
    }

};
