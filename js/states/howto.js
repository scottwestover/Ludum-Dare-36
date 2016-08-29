/* Define a MainMenu state for our game
 * The main menu state will allow us to list the all of the options available to the player
 * such as: start game, continue, credits, options, etc.
 */
var Instructions = function () {};
var music;
Instructions.prototype = {
    init: function () {
        style.fill = "#fff";
    },
    
    preload: function () {
        /* display slategrey for this state */
        this.stage.backgroundColor = '#000000';
    },

    create: function () {
        /* create our music */
        music = this.game.add.audio('menuMusic', 1, true);
        music.play();
        /* create our title text */
        var titleText = game.add.text(0,0,"How To Play",style);
        titleText.setTextBounds(0, 100, 800, -50);
        
        /* Instructions text */
        var instruct1 = game.add.text(0,0,"Use the arrow keys to move the main character.",style1);
        instruct1.setTextBounds(0, 100, 800, 150);
        var instruct4 = game.add.text(0,0,"Press 'S' to attack with the spear.",style1);
        instruct4.setTextBounds(0, 100, 800, 210);
        var instruct2 = game.add.text(0,0,"Collect the spear and stick head objects",style1);
        instruct2.setTextBounds(0, 100, 800, 300);
        var instruct3 = game.add.text(0,0,"to create a spear, which will allow you to attack.",style1);
        instruct3.setTextBounds(0, 100, 800, 355);
        var instruct5 = game.add.text(0,0,"Collect the fire object and get",style1);
        instruct5.setTextBounds(0, 100, 800, 455);
        var instruct6 = game.add.text(0,0,"back to your cave to win the level.",style1);
        instruct6.setTextBounds(0, 100, 800, 520);
        var instruct7 = game.add.text(0,0,"You can climb and hang from vines",style1);
        instruct7.setTextBounds(0, 100, 800, 600);
        var instruct8 = game.add.text(0,0,"with the up Arrow.",style1);
        instruct8.setTextBounds(0, 100, 800, 650);
        
        /* start game text */
        var startText = game.add.text(0,0,"Back To Menu",style);
        /* sets the bounds of the text to center it */
        startText.setTextBounds(0, 100, 800, 800);
        /* if the start text is clicked, start the game state */
        startText.inputEnabled = true;
        startText.events.onInputUp.add(function () {
            music.stop();
            this.game.state.start('MainMenu'); 
        });
        /* adds a hover effect to our play button */
        startText.events.onInputOver.add(function () {
            startText.fill= "#a6a6a6";
        });
        startText.events.onInputOut.add(function (target) {
            startText.fill= "#fff";
        });
    }

};
