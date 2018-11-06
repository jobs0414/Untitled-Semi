$(function() {
	$(window).scroll(function(event) {
		let scrollPosition = $(document).scrollTop();
		let windowHeight = $(window).height();

		// problemGraph
		let problemGraph = $('.problemGraph').offset().top - windowHeight;

		if(scrollPosition >= problemGraph) {
			let numElements = 14;
			let colors = ['#681b8a', '#681b8a', '#681b8a', '#681b8a', '#721d89', '#852288', '#992787', '#ac2c86' ,'#c43285', '#da3784', '#ee3c82', '#f53e82', '#f53e82', '#f53e82'];

			let elements = $('.problemGraph').find('ul > li').toArray();

			for (var i = 0; i < numElements; i++) {
				$(elements[i]).data('index', i);
				$(elements[i]).delay(100 * i).queue(function () {
					$(this).css('background-color', colors[$(this).data('index')]).dequeue();
				})
			}
		}

		// artists
		let artists = $('.artistsContainer > .element').toArray();
		for (var i = 0; i < artists.length; i++) {
			let topPos = $(artists[i]).offset().top - windowHeight;
			if(scrollPosition >= topPos) {
				$(artists[i]).find('.wrapper').first().addClass('active');
			}
		}

	});
});

function init() {
	// document.getElementById('technologyAnimation').setAttribute('width', window.innerWidth);
	// document.getElementById('technologyAnimation').setAttribute('height', "600");
	//window.requestAnimationFrame(draw);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

function draw() {
	let ctx = document.getElementById('technologyAnimation').getContext('2d');
	let containerWidth = $('.container').first().width();
	let steps = containerWidth / 7;

	let width = document.getElementById('technologyAnimation').width;
	let height = document.getElementById('technologyAnimation').height;

	let center = width / 2;

	let bigpoints = [];
	let rows = [3, 4, 3];

	let diffY = 50;

	for (var i = 0; i < rows.length; i++) {
		if(rows[i] == 3)
		{
			let diff = center - (steps * 2) - (steps / 4);
			for (var x = 0; x < 3; x++) {
				bigpoints.push([ diff + (x * (steps * 2)), (i * steps) + diffY]);
			}
		}
		else if(rows[i] == 4) 
		{
			let diff = center - (steps * 3) - (steps / 4);
			for (var x = 0; x < 4; x++) {
				bigpoints.push([ diff + (x * (steps * 2)), (i * steps) + diffY]);
			}
		}
	}

	console.log(bigpoints);

	let path = [ 
			bigpoints[1],
			bigpoints[5],
			bigpoints[4],
			bigpoints[3],
			bigpoints[0],
			bigpoints[7],
			bigpoints[8],
			bigpoints[1],
			bigpoints[2],
			bigpoints[6],
			bigpoints[9],
		];

	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	for (var i = 0; i < bigpoints.length; i++) {
		let start = bigpoints[i];

		ctx.save();

		ctx.translate( start[0]+50, start[1]+50 );
		ctx.rotate( 45 * Math.PI / 180 );
		ctx.shadowColor = 'rgba(42,41,71,.1)';
		ctx.shadowBlur = 75;
		ctx.fillStyle = "rgba(255, 255, 255, 1)";
		roundRect(ctx, -50, -50, 100, 100, 25, true, false);

		ctx.restore();
	}
	ctx.closePath();


	ctx.beginPath();
	ctx.save();
	ctx.translate( 50, 50 );
	for (var i = 1; i < path.length; i++) {
		let start = path[i-1];
		let end = path[i];
		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(end[0], end[1]);
	}
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#e7e9f1";
	ctx.stroke();

	ctx.restore();
	ctx.closePath();

	// window.requestAnimationFrame(draw);
}

init();



var scrollElements = $('[data-onscroll]').toArray();

console.log(scrollElements);

$(window).scroll(function(e) {
    var scrollTop = $(window).scrollTop() + ($(window).height() / 2);

    scrollElements.forEach(function(element, index, array) {
        let classToAdd = $(element).data('class');
        let elementTop = $(element).offset();
        elementTop = elementTop.top;

        if(elementTop <= scrollTop) {
            $(element).addClass(classToAdd);
        } else {
            $(element).removeClass(classToAdd);
        }
    });
})