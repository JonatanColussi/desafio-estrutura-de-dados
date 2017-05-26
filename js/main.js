var challenge = ['yellow', 'blue', 'red', 'green'];
var challengeSequence = [];
var answers = [];
var $status = $(".status");
var score = 0;

jQuery(document).ready(function($){
	randomColor();
});

function randomColor(){
	$status.text('Gerando desafio...');
	random = Math.floor((Math.random() * challenge.length) + 1);

	answers = [];
	challengeSequence.push(challenge[random-1]);
	index = 0;
	var offset = 0;
	

	$("body > .answers").addClass('disabled');

	$status.text('Observe a sequência de cores!');
	for(var i = 0; i < challengeSequence.length; i++){
		(function(index){
			setTimeout(function(){
		       	$("body > .challenge").fadeOut();
		       	$("body > .challenge").html('<div class='+challengeSequence[index]+'>');
		       	$("body > .challenge").fadeIn();
	       }, 1000 + offset);
	   	})(i);
	   	offset += 1000;
	}

	var timeout = 1000*challengeSequence.length;

	setTimeout(function(){
		$("body > .answers").removeClass('disabled');
		$status.text('Selecione a sequência correta...');
	}, timeout);

}

$("body > .answers > div").on('click', function(){
	var finish = false;
	if(!$(this).parent().hasClass('disabled')){
		var selected = $(this).attr('class');

		answers.push(selected);

		
		if(answers[answers.length-1] != challengeSequence[answers.length-1]){
			for(var i = 0; i < challengeSequence.length; i++){
				$(".modal > .challenge").append('<div class="'+challengeSequence[i]+'"><span>'+(i+1)+'</span></div>');
				if(answers[i] != undefined){
					if(answers[i] == challengeSequence[i])
						$(".modal > .answers ").append('<div class="'+answers[i]+'"><span>'+(i+1)+'</span></div>');
					else
						$(".modal > .answers ").append('<div class="'+answers[i]+' error"><span>'+(i+1)+'</span></div>');
				}
			}
			$status.text('Oops, você perdeu :(');
			$(".modal").fadeIn('slow');
			finish = true;
		}

		if(answers.length == challengeSequence.length && !finish){
			score++;
			$status.text('Parabéns, você acertou a sequência!');
			var txtScore = (score > 1) ? score+' Pontos' : score+' Ponto';
			$(".score").text(txtScore);	
			setTimeout(function(){
				randomColor();
			}, 1000);
		}
	}
});