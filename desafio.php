<!DOCTYPE html>
<html>
<head>
	<title>Desafio Instrutura de dados</title>
	<style type="text/css">
		.yellow{
			background-color: yellow;
		}
		.blue{
			background-color: blue;
		}
		.red{
			background-color: red;
		}
		.green{
			background-color: green;
		}
		.answers, .challenge{
			width: 100%;
			text-align: center;
		}
		.answers > div, .challenge > div{
			width: 100px;
			height: 100px;
			padding: 30px 0;
			display: inline-block;
		}
		.answers > div:hover{
			border: 1px solid black;
			cursor: pointer;
		}
		.disabled{
			opacity: 0.5;
			cursor: no-drop;
		}
	</style>
</head>
<body>
	<div class="challenge">
		
	</div>
	<div class="answers">
		<div class="yellow"></div>
		<div class="blue"></div>
		<div class="red"></div>
		<div class="green"></div>
	</div>

	
</body>
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<script type="text/javascript">
	var challenge = ['yellow', 'blue', 'red', 'green'];
	var challengeSequence = [];
	var answers = [];

	jQuery(document).ready(function($){
		randomColor();
	});

	function randomColor(){
		random = Math.floor((Math.random() * challenge.length) + 1);

		answers = [];
		challengeSequence.push(challenge[random-1]);
		index = 0;
		var offset = 0;
		

		$(".answers").addClass('disabled');

		for(var i = 0; i < challengeSequence.length; i++){
			(function(index){
				setTimeout(function(){
			       	$(".challenge").fadeOut();
			       	$(".challenge").html('<div class='+challengeSequence[index]+'>');
			       	$(".challenge").fadeIn();
		       }, 1000 + offset);
		   	})(i);
		   	offset += 1000;
		}

		var timeout = 1000*challengeSequence.length;

		setTimeout(function(){
			$(".answers").removeClass('disabled');
		}, timeout);

	}

	$(".answers > div").on('click', function(){
		if(!$(this).parent().hasClass('disabled')){
			var selected = $(this).attr('class');

			answers.push(selected);

			
			if(answers[answers.length-1] != challengeSequence[answers.length-1]){
				$(".answers").after('<form action="result.php" method="post"></form>');
				for(var i = 0; i < challengeSequence.length; i++){
					$("form").append('<input type="hidden" name="challengeSequence[]" value="'+challengeSequence[i]+'">');
					if(answers[i] != undefined)
						$("form").append('<input type="hidden" name="answers[]" value="'+answers[i]+'">');
				}
				$("form").submit();
			}

			if(answers.length == challengeSequence.length)
				randomColor();
		}
	});

</script>
</html>