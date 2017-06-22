<!DOCTYPE html>
<html>
	<head>
		<title>Desafio Instrutura de dados</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		<div class="challenge"></div>
		<h3 class="status">Gerando desafio...</h3>
		<div class="answers">
			<div class="yellow"></div>
			<div class="blue"></div>
			<div class="red"></div>
			<div class="green"></div>
		</div>
		<div class="time"><span>Tempo para resposta <b>9 Segundos</b></span></div>
		<h4 class="score">0 Pontos</h4>

		<div class="modal">
			<h2 class="status"></h2>
			<h3>A sequência correta era:</h3>
			<div class="challenge"></div>
			<br>
			<h3>Você marcou:</h3>
			<div class="answers"></div>
			<br>
			<br>
			<h3>Ranking:</h3>
			<div class="ranking">
				<table>
					<thead>
						<tr>
							<th>Posição</th>
							<th>Pontuação</th>
							<th>Nome</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
			<h4 class="score"></h4>
			<div class="buttons">
				<button><a href="./">Jogar novamente</a></button>
				<button><a href="#" class="closeGame">Finalizar jogo</a></button>
			</div>
		</div>
		<script src="js/jquery.js" type="text/javascript"></script>
		<script src="js/countdown.js" type="text/javascript"></script>
		<script src="js/main.js" type="text/javascript"></script>
	</body>
</html>