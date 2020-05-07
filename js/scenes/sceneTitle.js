class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("title", "images/gameTitle.png");
        this.load.image("sceneBack", "images/wallpaper2.jpg")
    }
    create() {

        this.backImage=this.add.image(game.config.width/2,game.config.height/2,"sceneBack");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene:this});
        var sb = new SoundButtons({scene:this});
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});

        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        // this.alignGrid.showNumbers();
        

        var title = this.add.image(0,0, 'title');
        Align.scaleToGameW(title,.8);
        this.alignGrid.placeAtIndex(38, title);

        var btnStart = new FlatButton({scene:this, key:'button1', text:'start', event:'start_game'});
        this.alignGrid.placeAtIndex(93, btnStart);

        console.log('start',btnStart)

        emitter.on('start_game', this.startGame, this);

        var mediaManager = new MediaManager({
            scene: this
        });
        mediaManager.setBackgroundMusic("backgroundMusic");
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    update() {}
} 