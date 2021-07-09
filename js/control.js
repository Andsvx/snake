
class Controller {

	constructor() {
		this.count = 0;
		this.changeCourse = false;
		this.createMatrix();
		this.createSnake();
		this.createFood();
	}

	createMatrix() {
		this.matrix = new Matrix('#matrix', 15, 15);
		this.matrix.create();
	}

	createSnake() {
		this.snake = new Snake(8, 8, DEFAULT_COURSE, INITIAL_LENGTH);

		this.matrix.setCell('snake-head', this.snake.body[0].row, this.snake.body[0].col, true);

		for (let i = 1; i < this.snake.body.length; i++) {
			this.matrix.setCell('snake-body', this.snake.body[i].row, this.snake.body[i].col, true);
		}
	}

	deleteSnake() {
		this.matrix.container.find('.cell').toggleClass('snake-head', false);
		this.matrix.container.find('.cell').toggleClass('snake-body', false);
	}

	createFood() {
		this.foodRow = getRandomInt(1, this.matrix.rows);
		this.foodCol = getRandomInt(1, this.matrix.cols);

		while (this.matrix.checkCell('snake-head', this.foodRow, this.foodCol) || this.matrix.checkCell('snake-body', this.foodRow, this.foodCol)) {
			this.foodRow = getRandomInt(1, this.matrix.rows);
			this.foodCol = getRandomInt(1, this.matrix.cols);
		}

		this.matrix.setCell('food', this.foodRow, this.foodCol, true);
	}

	deleteFood() {
		this.matrix.setCell('food', this.foodRow, this.foodCol, false);
	}

	stopGame() {
		clearInterval(game);
		$('#score').html(this.count);
		$('#modal-window').css({'display': 'block'});
	}

	resetGame() {
		button = true;
		this.count = 0;
		this.deleteSnake();
		this.createSnake();
		this.deleteFood();
		this.createFood();
		$('#count').html(this.count);
		this.matrix.container.find('.cell').css({'transform': 'rotate(0deg)'});
	}

	gameplay() {
		this.changeCourse = true;

		let oldHead = this.snake.body[0];
		let oldTail = this.snake.body[this.snake.body.length - 1];

		this.snake.move();

		let newHead = this.snake.body[0];
		let newTail = this.snake.body[this.snake.body.length - 1];

		if ( (newHead.row > this.matrix.rows || newHead.col > this.matrix.cols || newHead.row < 1 || newHead.col < 1) || (this.matrix.checkCell('snake-body', newHead.row, newHead.col)) ) {
			return this.stopGame();
		}

		this.matrix.setCell('snake-head', newHead.row, newHead.col, true);
		this.matrix.setCell('snake-body', oldHead.row, oldHead.col, true);
		this.matrix.setCell('snake-head', oldHead.row, oldHead.col, false);
		this.matrix.setCell('snake-body', oldTail.row, oldTail.col, false);

		switch(this.snake.course) {
			case 'left':
				this.matrix.container.find('.snake-head').css({'transform': 'rotate(270deg)'});
				break;
			case 'up':
				this.matrix.container.find('.snake-head').css({'transform': 'rotate(0deg)'});
				break;
			case 'right':
				this.matrix.container.find('.snake-head').css({'transform': 'rotate(90deg)'});
				break;
			case 'down':
				this.matrix.container.find('.snake-head').css({'transform': 'rotate(180deg)'});
				break;
		}

		if (this.matrix.checkCell('food', newHead.row, newHead.col)) {
			this.count++;
			this.deleteFood();
			this.createFood();
			this.snake.increase();
			$('#count').html(this.count);
		}
	}

	checkKeyDown(e) {
		if (this.changeCourse) {
			if (e.keyCode == 37 && this.snake.course != 'right') {
				this.snake.course = 'left';
				this.changeCourse = false;
			} else if (e.keyCode == 38 && this.snake.course != 'down') {
				this.snake.course = 'up';
				this.changeCourse = false;
			} else if (e.keyCode == 39 && this.snake.course != 'left') {
				this.snake.course = 'right';
				this.changeCourse = false;
			} else if (e.keyCode == 40 && this.snake.course != 'up') {
				this.snake.course = 'down';
				this.changeCourse = false;
			}
		}
	}
}