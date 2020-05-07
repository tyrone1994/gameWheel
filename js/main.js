var game;
var model;
var emitter;
var G;
var controller;
window.onload = function() {

    var isMobile = navigator.userAgent.indexOf("Mobile");
        if (isMobile == -1) {
            isMobile = navigator.userAgent.indexOf("Tablet");
        }

    if (isMobile == -1) {
        var config = {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 600,
            height: 800,
            parent: "thegame",
            scene: [SceneLoad, SceneTitle,SceneMain, SceneOver]
        };
    } else {
            var config = {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 600,
                height: 800,
            parent: "thegame",
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver]
        };
    }

    
    model = new Model();
    G = new Constants();
    model.isMobile = isMobile;
    game = new Phaser.Game(config);
}