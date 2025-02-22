class SoundButtons extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		super(config.scene);
		this.scene=config.scene;

		 this.musicButton=new ToggleButton({scene:this.scene,backKey:'toggleBack',onIcon:'musicOn',offIcon:'musicOff',event:G.TOGGLE_MUSIC});
		 this.sfxButton=new ToggleButton({scene:this.scene,backKey:'toggleBack2',onIcon:'sfxOn',offIcon:'sfxOff',event:G.TOGGLE_SOUND});

		 this.add(this.musicButton);
		 this.add(this.sfxButton);

		 this.musicButton.y=this.musicButton.height/2;
		 this.musicButton.x=this.musicButton.width/2;

		 this.sfxButton.x=game.config.width-this.sfxButton.width/2;
         this.sfxButton.y=this.musicButton.y;
         
         this.sfxButton.setScrollFactor(0);
         this.musicButton.setScrollFactor(0);

         if(model.musicOn == false ){
             this.musicButton.toggle();
         }

         if(model.soundOn == false) {
             this.sfxButton.toggle();
         }

		 this.scene.add.existing(this);
	}
}