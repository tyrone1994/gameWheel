var timer, timerEvent, timeText;
let gameOptions = {

    // slices configuration
    slices: [
        {
            degrees: 40,
            startColor: 0xff0000,
            endColor: 0xff4400,
            rings: 3,
            text: "Devils Luck + 15!!",
            sliceText: "😈",
            sliceTextStyle: {
                fontFamily: "Arial Black",
                fontSize: 36,
                color: "#FF0000"
            },
            sliceTextStroke: 8,
            sliceTextStrokeColor: "#ffffff"
        },
        {
            degrees: 60,
            startColor: 0x00ff00,
            endColor: 0x004400,
            rings: 200,
            text: "Lovely + 20 Points",
            sliceText: "🤑",
            sliceTextStyle: {
                fontFamily: "Arial Black",
                fontSize: 36,
                color: "#008000"
            },
            sliceTextStroke: 8,
            sliceTextStrokeColor: "#ffffff"
        },
        {
            degrees: 125,
            startColor: 0xff00ff,
            endColor: 0x0000ff,
            rings: 10,
            text: "Stuck on 0",
            sliceText: "🥶",
            sliceTextStyle: {
                fontFamily: "Arial Black",
                fontSize: 36,
                color: "#000077"
            },
            sliceTextStroke: 8,
            sliceTextStrokeColor: "#ffffff"
        },
        {
            degrees: 45,
            startColor: 0x666666,
            endColor: 0x999999,
            rings: 10,
            text: "Deduct 3 Points!",
            sliceText: "😵",
            sliceTextStyle: {
                fontFamily: "Arial Black",
                fontSize: 36,
                color: "#C0C0C0"
            },
            sliceTextStroke: 8,
            sliceTextStrokeColor: "#ffffff"
        },
        {
            degrees: 90,
            startColor: 0x000000,
            endColor: 0xffff00,
            rings: 1,
            text: "Deduct 4 Points",
            sliceText: "💩",
            sliceTextStyle: {
                fontFamily: "Arial Black",
                fontSize: 72
            },
        }
    ],

    // wheel rotation duration range, in milliseconds
    rotationTimeRange: {
        min: 3000,
        max: 4500
    },

    // wheel rounds before it stops
    wheelRounds: {
        min: 2,
        max: 11
    },

    // degrees the wheel will rotate in the opposite direction before it stops
    backSpin: {
        min: 1,
        max: 4
    },

    // wheel radius, in pixels
    wheelRadius: 240,

    // color of stroke lines
    strokeColor: 0xffffff,

    // width of stroke lines
    strokeWidth: 5
}


class SceneMain extends Phaser.Scene{

    // constructor
    constructor(){
        super('SceneMain');

        this.score = 0;
        this.scoreText;
        this.freezeFace;
        this.moneyFace;
        this.devilFace;
        this.greyFace;
    }

    init(data) {
        console.log('init', data);
        this.score = data.finalScore;
        
    }

    // method to be executed when the scene preloads
    preload(){

        // loading pin image
        this.load.image("pin", "pin.png");
        // loading icons spritesheet
        this.load.spritesheet("icons", "icons.png", {
            frameWidth: 256,
            frameHeight: 256
        });

    }

    // method to be executed once the scene has been created
    create(){
        this.score = 0;
        this.backImage=this.add.image(game.config.width/2,game.config.height/2,"gameBack");
        var mediaManager = new MediaManager({scene:this});
        var sb = new SoundButtons({scene:this});

        
        console.log(Phaser);


        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});

        this.scoreText = this.add.text(220,100, 'Score: 0', {fontSize: '32px', fill: '#ffffff' })

        let startDegrees = -90;

        // making a graphic object without adding it to the game
        let graphics = this.make.graphics({
            x: 0,
            y: 0,
            add: false
        });

        // adding a container to group wheel and icons
        this.wheelContainer = this.add.container(game.config.width / 2, game.config.height / 2);

        // array which will contain all icons
        let iconArray = [];

        // looping through each slice
        for(let i = 0; i < gameOptions.slices.length; i++){

            // converting colors from 0xRRGGBB format to Color objects
            let startColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].startColor);
            let endColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].endColor)

            for(let j = gameOptions.slices[i].rings; j > 0; j--){

                // interpolate colors
                let ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor,endColor, gameOptions.slices[i].rings, j);

                // converting the interpolated color to 0xRRGGBB format
                let ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, "0x");

                // setting fill style
                graphics.fillStyle(ringColorString, 1);

                // drawing the slice
                graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, j * gameOptions.wheelRadius / gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false);

                // filling the slice
                graphics.fillPath();
            }

            // setting line style
            graphics.lineStyle(gameOptions.strokeWidth, gameOptions.strokeColor, 1);

            // drawing the biggest slice
            graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false);

            // stroking the slice
            graphics.strokePath();

            // add the icon, if any
            if(gameOptions.slices[i].iconFrame != undefined){

                // icon image
                let icon = this.add.image(gameOptions.wheelRadius * 0.75 * Math.cos(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), gameOptions.wheelRadius * 0.75 * Math.sin(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), "icons", gameOptions.slices[i].iconFrame);

                // scaling the icon according to game preferences
                icon.scaleX = gameOptions.slices[i].iconScale;
                icon.scaleY = gameOptions.slices[i].iconScale;

                // rotating the icon
                icon.angle = startDegrees + gameOptions.slices[i].degrees / 2 + 90;

                // add icon to iconArray
                iconArray.push(icon);
            }

            // add slice text, if any
            if(gameOptions.slices[i].sliceText != undefined){

                // the text
                let text = this.add.text(gameOptions.wheelRadius * 0.75 * Math.cos(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), gameOptions.wheelRadius * 0.75 * Math.sin(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), gameOptions.slices[i].sliceText, gameOptions.slices[i].sliceTextStyle);

                // set text origin to its center
                text.setOrigin(0.5);

                // set text angle
                text.angle = startDegrees + gameOptions.slices[i].degrees / 2 + 90;

                // stroke text, if required
                if(gameOptions.slices[i].sliceTextStroke && gameOptions.slices[i].sliceTextStrokeColor){
                    text.setStroke(gameOptions.slices[i].sliceTextStrokeColor, gameOptions.slices[i].sliceTextStroke);
                }

                // add text to iconArray
                iconArray.push(text);
            }

            // updating degrees
            startDegrees += gameOptions.slices[i].degrees;
        }

        // generate a texture called "wheel" from graphics data
        graphics.generateTexture("wheel", (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2, (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2);

        // creating a sprite with wheel image as if it was a preloaded image
        let wheel = this.add.sprite(0, 0, "wheel");

        // adding the wheel to the container
        this.wheelContainer.add(wheel);

        // adding all iconArray items to the container
        this.wheelContainer.add(iconArray);

        // adding the pin in the middle of the canvas
        this.pin = this.add.sprite(game.config.width / 2, game.config.height / 2, "pin");

        // adding the text field
        this.prizeText = this.add.text(game.config.width / 2, game.config.height - 20, "Press 🌀 to spin ", {
            font: "bold 32px Arial",
            align: "center",
            color: "white"
        });

        // center the text
        this.prizeText.setOrigin(0.5);


        // the game has just started = we can spin the wheel
        this.canSpin = true;

        // waiting for your input, then calling "spinWheel" function

        let clickCount = 0;
        this.clickCountText = this.add.text(10, 100, '');
    
        const spinBtn = this.add.text(0, 0, '🌀', {
            font: "bold 60px Arial",
            align: "center"
        })        
          .setInteractive()
          .on('pointerdown', () => this.spinWheel())
          .on('pointerdown', () => this.updateClickCountText(++clickCount))
            this.alignGrid.placeAtIndex(103.3, spinBtn);



          this.spinFace = spinBtn;
    
     
      

        emitter.on('spin', this.spinWheel, this)


    }
    updateClickCountText(clickCount) {
        if (clickCount >= 10) {
            this.scene.start('SceneOver', {score: this.score});
        } else {

            this.clickCountText.setText(`${clickCount} /10 clicks`);
        }
      }



    decreaseTime() {

    }

    // function to spin the wheel
    spinWheel(){

        // can we spin the wheel?
        if(this.canSpin){

            // resetting text field
            // console.log(this.button.config.key);
            this.prizeText.setText("");
            

            console.log(this.greyFace);

            // the wheel will spin round for some times. This is just coreography
            let rounds = Phaser.Math.Between(gameOptions.wheelRounds.min, gameOptions.wheelRounds.max);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            let degrees = Phaser.Math.Between(0, 360);

            // then will rotate back by a random amount of degrees
            let backDegrees = Phaser.Math.Between(gameOptions.backSpin.min, gameOptions.backSpin.max);

            // before the wheel ends spinning, we already know the prize
            let prizeDegree = 0;
        
            // looping through slices
            

            for(let i = gameOptions.slices.length - 1; i >= 0; i--){

                // adding current slice angle to prizeDegree
                prizeDegree += gameOptions.slices[i].degrees;

                // if it's greater than the random angle...
            

                console.log(prizeDegree);
                if(prizeDegree > degrees - backDegrees){
                    if (this.spinFace && prizeDegree == 260) {
                        this.score += 0;
                        this.scoreText.setText('Score: ' + this.score);
                        console.log('1');
                        var prize = i;
                        break;
                    } else if (this.spinFace && prizeDegree == 320) {
                        this.score += 20;
                        this.scoreText.setText('Score: ' + this.score);
                        console.log('2');
                        var prize = i;
                        break;
                    } else  if (this.spinFace && prizeDegree == 360){
                        this.score += 15;
                        this.scoreText.setText('Score: ' + this.score);
                        console.log('3');
                        var prize = i;
                        break;
                    } else if (this.spinFace && prizeDegree == 135) {
                        this.score -= 3;
                        this.scoreText.setText('Score: ' + this.score);
                        console.log('4');
                        var prize = i;
                        break;
                    } else if (this.spinFace && prizeDegree == 90){
                        this.score -= 4;
                        this.scoreText.setText('Score: ' + this.score);
                        console.log('4');
                        var prize = i;
                        break;
                    }
                }
            }

            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;

            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.tweens.add({

                // adding the wheel container to tween targets
                targets: [this.wheelContainer],

                // angle destination
                angle: 360 * rounds + degrees,

                // tween duration
                duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),

                // tween easing
                ease: "Cubic.easeOut",

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function(tween){

                    // another tween to rotate a bit in the opposite direction
                    this.tweens.add({
                        targets: [this.wheelContainer],
                        angle: this.wheelContainer.angle - backDegrees,
                        duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max) / 2,
                        ease: "Cubic.easeIn",
                        callbackScope: this,
                        onComplete: function(tween){

                            // displaying prize text
                            this.prizeText.setText(gameOptions.slices[prize].text);

                            // player can spin again
                            this.canSpin = true;
                        }
                    })
                }
            });
        }
    }
}
