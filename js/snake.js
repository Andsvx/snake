
class Snake {

	constructor(row, col, course, length) {
		this.body = [];
		this.course = course;

		for (let i = 0; i < length; i++) {
			this.body.push({row: row + i, col: col});
		}
	}

	move() {
		let headRow = this.body[0].row;
		let headCol = this.body[0].col;

		switch(this.course) {
			case 'left':
				headCol--;
				break;
			case 'up':
				headRow--;
				break;
			case 'right':
				headCol++;
				break;
			case 'down':
				headRow++;
				break;
		}

		this.body.unshift({row: headRow, col: headCol});
		this.body.pop();
	}

	increase() {
		let tail = this.body[this.body.length - 1];
		this.body.push(tail);
	}
}