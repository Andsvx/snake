
let game;
let button = true;
const INITIAL_LENGTH = 3;
const DEFAULT_COURSE = 'up';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {

	requestRecords();
	let controller = new Controller();
	$(document).keydown(controller.checkKeyDown.bind(controller));

	$('#start').click(function() {
		if (button) {
			button = false;
			game = setInterval(controller.gameplay.bind(controller), 200);
		}
	});

	$('#stop').click(function() {
		button = true;
		clearInterval(game);
	});

	$('#yes').click(function() {
		saveResult();
		requestRecords();
		controller.resetGame();
		$('#modal-window').css({'display': 'none'});
	});

	$('#no').click(function() {
		controller.resetGame();
		$('#modal-window').css({'display': 'none'});
	});

	function requestRecords() {
		$.ajax({
			url: '../server/index.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				data.sort((x, y) => y.score - x.score);
				let top = data.slice(0, 5);
				$('#records > div').remove();
				top.forEach(function(el) {
					$('#records').append('<div><span>' + el.name + '</span><span>' + el.score + '</span></div>')
				});
			}
		});
	}

	function saveResult() {
		$.ajax({
			url: '../server/index.php',
			type: 'POST',
			data: { name: $('#name').val(), score: controller.count }
		});
	}

});