<!DOCTYPE html>
<html>
<head>
	<title>Desafio Instrutura de dados</title>
	<meta charset="utf-8">
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
		.border-error{
			border: 1px solid black;
		}
	</style>
</head>
<body>
	<h1>VocÊ perdeu :(</h1>
	<pre>
		
	<?php print_r($_POST); ?>
	</pre>
	
	<div class="challenge">
		<?php
			foreach ($_POST['challengeSequence'] as $key => $challenge){
				echo "<div class=\"{$challenge}\">".$key+1."</div>";
			}
		?>
	</div>
	<div class="answers">
		<?php
			foreach ($_POST['answers'] as $key => $answer){
				if($answer == $_POST['challengeSequence'][$key])
					echo "<div class=\"{$answer}\">".$key+1."</div>";
				else
					echo "<div class=\"{$answer} border-error\">".$key+1."</div>";
			}
		?>
	</div>

	
</body>
</html>