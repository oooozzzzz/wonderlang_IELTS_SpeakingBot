class Changable {
	constructor(text) {
		this.text = text;
	}
	get text() {
		return this.text;
	}
	set text(newText) {
		this.text = newText;
	}
}

module.exports = { Changable };
