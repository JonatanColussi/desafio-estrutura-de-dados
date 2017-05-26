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
		/*.challenge > div{
			display: none;
		}*/
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
		// $(function(){
		// 	var cores = ['skyblue','blue', 'black', 'green','yellow','green'];
		// 	var tamanhoArray = cores.length;
		// 	var contador = 0;
		// 	setInterval(function(){
		// 		$("body").css("background-color",cores[contador]);
		// 		alert("A cor visualizada agora é: "+cores[contador]);
		// 		contador++;
		// 		if(contador>tamanhoArray){
		// 		contador = 0;
		// 	}
		// 	},2000);
		// 	 // VAI CHAMAR A FUNÇÃO DE 2 EM 2 SEGUNDOS !
		// });
	});

	function randomColor(){
		random = Math.floor((Math.random() * challenge.length) + 1);

		challengeSequence.push(challenge[random-1]);
		index = 0;

		while(index < challengeSequence.length){
			setTimeout(function(){
				if(index < challengeSequence.length){
					$(".challenge").html('<div class="'+challengeSequence[index]+'">');
					index++;
				}else{
					// alert('acabou');
				}
			}, 2000);
		}
		

		
		// for(var i = 0; i < challengeSequence.length; i++){
		// 	var hide = i-1;
		// 	if()
	 //       	$(".challenge > div[data-index="+hide+"]").fadeOut(2000);
		// 	(function(index){
		// 		setTimeout(function(){
		// 	       	$(".challenge > div[data-index="+index+"]").css('display', 'inline-block');
		//        }, 2000);
		//    	})(i);
		// }

	}

	function changeColor(color){}

	$(".answers > div").on('click', function(){
		var selected = $(this).attr('class');


		answers.push(selected);
		
		if(selected != challengeSequence[challengeSequence.length-1]){
			$(".answers").after('<form action="result.php" method="post"></form>');
			for(var i = 0; i < challengeSequence.length; i++){
				$("form").append('<input type="hidden" name="challengeSequence[]" value="'+challengeSequence[i]+'">');
				$("form").append('<input type="hidden" name="answers[]" value="'+answers[i]+'">');
			}
			$("form").submit();
		}else{
			randomColor();
		}
	});

</script>
</html>