/* Define a MainMenu state for our game
 * The main menu state will allow us to list the all of the options available to the player
 * such as: start game, continue, credits, options, etc.
 */
var MainMenu = function () {};
var music;
MainMenu.prototype = {
    init: function () {
        style.fill = "#fff";
    },
    
    preload: function () {
        /* display slategrey for this state */
        this.stage.backgroundColor = '#000000';
    },

    create: function () {
        /* create our background */
        var background = this.game.add.sprite(0,0,'cave');
        //background.alpha = 0.6;
        /* create our music */
        music = this.game.add.audio('menuMusic', 1, true);
        music.play();
        /* create our title text */
        var titleText = game.add.text(0,0,"Ludum Dare 36",style);
        titleText.setTextBounds(0, 100, 800, -50);
        var titleText = game.add.text(0,0,"Caveman Runner",style);
        titleText.setTextBounds(0, 100, 800, 150);
        /* start game text */
        var startText = game.add.text(0,0,"Play",style);
        /* sets the bounds of the text to center it */
        startText.setTextBounds(0, 100, 800, 500);
        /* if the start text is clicked, start the game state */
        startText.inputEnabled = true;
        startText.events.onInputUp.add(function () {
            music.stop();
            this.game.state.start('Game'); 
        });
        /* adds a hover effect to our play button */
        startText.events.onInputOver.add(function () {
            startText.fill= "#a6a6a6";
        });
        startText.events.onInputOut.add(function (target) {
            startText.fill= "#fff";
        });
        var instructionsText = game.add.text(0,0,"How To Play",style);
        /* sets the bounds of the text to center it */
        instructionsText.setTextBounds(0, 100, 800, 700);
        /* if the start text is clicked, start the game state */
        instructionsText.inputEnabled = true;
        instructionsText.events.onInputUp.add(function () {
            music.stop();
            this.game.state.start('Instructions'); 
        });
        /* adds a hover effect to our instructions button */
        instructionsText.events.onInputOver.add(function () {
            instructionsText.fill= "#a6a6a6";
        });
        instructionsText.events.onInputOut.add(function (target) {
            instructionsText.fill= "#fff";
        });
    }

};
