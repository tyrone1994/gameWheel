class Pin extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);

        this.scene = config.scene;

        this.back = this.scene.add.image(0,0, "pin");
        this.add(this.back);

        this.scene.add.existing(this);

        Align.scaleToGameW(this.back, .2);

        this.setSize(this.back.displayWidth, game.config.height);
    }
}