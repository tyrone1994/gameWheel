class Model {
	constructor() {
		this._score = 0;
		this.soundOn = true;
		this._musicOn = true;
		this._timeLeft = 60;
	}

	set musicOn(val) {
		this._musicOn =val;
		emitter.emit(G.MUSIC_CHANGED);
	}

	get musicOn() {
		return this._musicOn
	}

	set score (val) {
		this._score = val;
		console.log("score Updated");
		emitter.emit(G.SCORE_UPDATED);
	}
	get score() {
		 return this._score;
	}

	// set timeLeft(val) {
	// 	this._timeLeft = val;
	// 	emitter.emit(G.TIME_LEFT);
	// }

	// get timeLift() {
	// 	return this._timeLeft;
	// }
}