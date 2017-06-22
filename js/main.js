var challenge         = ['yellow', 'blue', 'red', 'green']; //Lista com as possíveis cores do desafio
var challengeSequence = []; //Lista com a sequência de cores gerada pelo sistema
var answers           = []; //lista de respostas do jogador
var $status           = $("body .status"); //Seletor de status
var score             = 0; //Pontuação inicial
var finish            = false; //definição previa de que o programa não deve finalizar
var countdown         = new Countdown(9); //Definimos nosso contador com 9 segundos

jQuery(document).ready(function($){
	//Quando carrega a página, geramos uma cor aleatória
	randomColor();
});

//Função para gerar cores aleatórias
function randomColor(){
	//Pausa o contador
	countdown.pause();
	//Informa ao usuário que o desafio está sendo gerado
	$status.text('Gerando desafio...');

	//Gera um índice para selecionar uma cor aleatória
	random = Math.floor((Math.random() * challenge.length) + 1);

	//Limpa as respostas do usuário, para que possa gravar a nova jogada
	answers = [];

	//Adiciona a nova cor gerada à lista
	challengeSequence.push(challenge[random-1]);

	//zera o tempo adicional de exibição da lista
	var offset = 0;
	
	//Impossibilita o jogador de poder jogar enquanto a lista dos desafios é exibida
	$("body > .answers").addClass('disabled');

	//Informa ao usuário para observar a sequência de cores
	$status.text('Observe a sequência de cores!');

	//Exibe toda a sequência de cores ao usuário
	for(var i = 0; i < challengeSequence.length; i++){
		(function(index){
			//Faz com que cada cor fique aparente por 1 segundo
			setTimeout(function(){
		       	$("body > .challenge").fadeOut();
		       	$("body > .challenge").html('<div class='+challengeSequence[index]+'>');
		       	$("body > .challenge").fadeIn();
	       }, 1000 + offset);
	   	})(i);
	   	//Soma o tempo de execução para poder exibir todas ao cores
	   	offset += 1000;
	}

	//garante que somente será liberado para o usuário jogar, após a exibição da lista
	var timeout = 1000*challengeSequence.length;

	//Após a exibição de todas as cores geradas pelo desafio, possibilita ao usuário jogar
	setTimeout(function(){
		//Possibilita ao usuário jogar
		$("body > .answers").removeClass('disabled');
		//Informa ao usuário que ele deve informar a sequência correta
		$status.text('Selecione a sequência correta...');
		//Disponibiliza 9 segundos para a proxima jogada;
		countdown.restart();
	}, timeout);
}

//Função para quando o usuário clicar em uma resposta
$("body > .answers > div").on('click', function(){
	//Pausa o contador
	countdown.pause();
	//Verifica se o sistema já acaboou de exibir o desafio e o usuário pode repetir a sequência
	if(!$(this).parent().hasClass('disabled')){
		var selected = $(this).attr('class'); //Pega a cor que o usuário selecionou

		answers.push(selected); //Coloca a cor que o usuário selecionou na lista de respostas

		//Verifica se a cor que o usuário selecionou é diferente da gerada pelo desafio (cor X posição)
		if(answers[answers.length-1] != challengeSequence[answers.length-1])
			//Finaliza o jogo
			finishGame('error');

		//verifica se o usuário marcou a mesma quantidade de cores que o desafio, e não errou nenhuma (finish = false)
		if(answers.length == challengeSequence.length && !finish){
			//aumenta um ponto no score do jogador
			score++;
			//Informa que ele acertou a sequência
			$status.text('Parabéns, você acertou a sequência!');
			//Informa a pontuação
			$(".score").text(scoreDescription(score));	
			//Aguarda 1 segundo
			setTimeout(function(){
				//Gera um novo desafio
				randomColor();
			}, 1000);
		}else{
			//Disponibiliza 9 segundos para a proxima jogada;
			countdown.restart();
		}
	}
});

//Função para fechar o jogo
$(".closeGame").on('click', function(){
	$("body").html("<h1>Jogo Finalizado ;)</h1><br><h3>Desenvolvido por Jonatan Colussi</h3>");
});

//Função para finalizar o jogo
function finishGame(cause){
	//Verifica se o jogo já não havia sido finalizado
	if(!finish){
		//Percorre as duas listas paralelamente (pelos indíces da lista de desafios)
		for(var i = 0; i < challengeSequence.length; i++){
			//Cria elementos HTML para a lista de desafios
			$(".modal > .challenge").append('<div class="'+challengeSequence[i]+'"><span>'+(i+1)+'</span></div>');

			//Verifica se existe o mesmo index da lista de desafios, na lista de respostas
			if(answers[i] != undefined){
				//Verifica se o usuário acertou a posição da cor correspondente
				if(answers[i] == challengeSequence[i])
					$(".modal > .answers ").append('<div class="'+answers[i]+'"><span>'+(i+1)+'</span></div>');
				else //Se o usuário errou a cor correspondente, marca como 'error'
					$(".modal > .answers ").append('<div class="'+answers[i]+' error"><span>'+(i+1)+'</span></div>');
			}
		}

		//Informa ao usuário que ele perdeu o jogo
		$status.text((cause == 'time') ? 'Oops, o tempo acabou :(' : 'Oops, você errou a sequência :(');
		//Verifica se a mensagem de pontuação deve ser exibida no singular ou plural
		var txtScore = (score > 1 || score == 0) ? score+' Pontos' : score+' Ponto';
		//Informa a pontuação com a mensagem
		$(".score").text(txtScore);	
		//Mostra a tela de finalização
		$(".modal").fadeIn('slow');
		//Define que o jogo acabou
		finish = true;

		//Pede ao usuário para incluir seu nome no ranking
		var name = prompt("Para incluír sua pontuação ao ranking, informe seu nome abaixo:");
		//Se o nome foi informado, envia o nome do jogador e a pontuação para a funcionalidade responsável por inserir os mesmos na lista
		if(name != '' && name != null)
			var data = {
				name: name,
				score: score
			};
		else //Se o nome não for informado, envia os dados vazios
			var data = {};

		//"Chama" um arquivo externo (.php) que vai ler, ordenar e retornar a lista
		$.ajax({
			url: 'setRanking.php', //caminho do arquivo
			type: 'POST', //Método http
			dataType: 'json', //tipo de retorno
			data: data, //dados que estou enviando
			success: function(ranking){ //recebe o ranking em formato json
				viewRanking(ranking); //chama a função que imprime o ranking na tela
			},
			error: function(error){ //se ocorreu algum erro na requisição http
				console.log(error); //exibe o erro no console
				alert('Ocorreu um erro inesperado'); //informa ao usuário que ocorreu um erro
			}
		});
	}
}

//Monta a marcação da tabela do ranking
function viewRanking(ranking){
	//limpa a tabela
	$('.ranking tbody').html('');
	//precorre a lista, imprimindo um a um
	for(var i = 0; i < ranking.length; i++)
		$('.ranking tbody').append('<tr><td>'+(i+1)+'º</td><td>'+scoreDescription(ranking[i].score)+'</td><td>'+ranking[i].name+'</td></tr>');
	//exibe a tabela que estava oculta
	$('.ranking').show();
}

//Define o plural/singular da pontuação
function scoreDescription(score){
	//se a pontuação for 0 ou maior que 1, imprime a mensagem no plural
	if(score == 0 || score > 1)
		return score+' Pontos';
	else //Se a pontuação for 1, imprime a mensagem no singular
		return score+' Ponto';
}