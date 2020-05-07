class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload() {
        this.bar = new Bar({scene:this, x:240, y:320});
        this.progText = this.add.text(game.config.width/2, game.config.height/2,"0%", {color:'#ffffff', fontSize:game.config.width/20});
        this.progText.setOrigin(0.5,0.5);
        this.load.on('progress', this.onProgress, this);

        this.load.image("luckyWheel", "images/wheel.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("button2", "images/ui/buttons/2/5.png");
        this.load.image("pin" , "images/pin.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("wheels", "images/ui/wheel.png");

        this.load.image("gameOver", "images/gameOver.png");

        this.load.image("gameBack", "images/gameBack.png");

        this.load.spritesheet("titleBack", "images/sceneBack1.png", {frameWidth: 120, frameHeight: 200});

        // this.load.audio('cat', ['audio/meow.mp3', 'audio/meow.ogg']);
        // this.load.audio('backgroundMusic', ["audio/background.mp3", "audio/background.ogg"]);
        
        this.load.image("toggleBack","images/toggles/1.png");
        this.load.image("toggleBack2","images/toggles/5.png");
        this.load.image("frozen","images/toggles/2.png");
        this.load.image("greenMoney","images/toggles/1.png");
        this.load.image("devil","images/toggles/6.png");
        this.load.image("greyMan","images/toggles/4.png");
        this.load.image("sfxOff","images/icons/sfx_off.png");
        this.load.image("sfxOn","images/icons/sfx_on.png");
        this.load.image("musicOn","images/icons/music_on.png");
        this.load.image("musicOff","images/icons/music_off.png");

        this.load.audio("backgroundMusic",['audio/background2.mp3', 'audio/background2.ogg']);
    }

    onProgress(value) {
        console.log(value);
        this.bar.setPercent(value);
        var per = Math.floor(value*100);
        this.progText.setText(per+"%");
    }

   create() {
        this.scene.start("SceneTitle");
   }
}
