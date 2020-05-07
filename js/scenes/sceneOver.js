class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
        this.highScore;
        this.finalScore
    }
    init(data) {
        
        this.finalScore = data.score;
        this.highScore = 0;
    }
    preload()
    {

    }
    create() {
        var title = this.add.image(0,0, 'gameOver');
        console.log('final', this.finalScore)
        this.highScore = localStorage.getItem('High_Score');
        console.log('Here', this.highScore);
        if(this.highScore != null) {
            if(this.finalScore > this.highScore) {
                this.value = localStorage.setItem("High_Score", this.finalScore)
                console.log('1',this.value)

                console.log('1');
            } else {
                console.log('2', this.value)
           
                console.log('2');
            }
        }
        this.highScore = localStorage.getItem('High_Score');
      
    
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});

        var style = {
            font: "32px Monospace",
            fill: "#00ff00",
            align: "center"
       }

       var text = this.add.text(150, 300, "Your Score: " + this.finalScore + "\nBest Score: " + this.highScore, {fontSize: '32px'})
        // this.alignGrid.showNumbers();

        
        Align.scaleToGameW(title,.8);
        this.alignGrid.placeAtIndex(38, title);

        var btnStart = new FlatButton({scene:this, key:'button2', text:'Play Again', event:'start_game'});
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this);
        this.highScore = localStorage.getItem('High_Score') == null ? 0 : localStorage.getItem('High_Score');
    }

    startGame() {
        // this.finalScore = 0;
        this.scene.start('SceneMain');
    }
    update() {}
} 