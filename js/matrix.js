
class Matrix {

	constructor(idContainer, rows, cols) {
		this.container = $(idContainer);
		this.rows = rows;
		this.cols = cols;
	}

	create() {
		let n = this.rows * this.cols;

		for (let i = 0; i < n; i++) {
			let div = $('<div class="cell"></div>');
			this.container.append(div);
		}
	}

	setCell(typeCell, row, col, val) {
		let cell = this.getCellElement(row, col);
		cell.toggleClass(typeCell, val);
	}

	checkCell(typeCell, row, col) {
		let cell = this.getCellElement(row, col);
		return cell.hasClass(typeCell);
	}

	getCellElement(row, col) {
		let cellNumber = (row - 1) * this.cols + (col - 1);
		return this.container.find('.cell').eq(cellNumber);
	}
}