//Função para gerênciar o contador
function Countdown(timeResponse){
	const constTimeResponse = timeResponse;
	var auxTimeResponse; //Váriavel local para guardar o tempo que foi definido
	var timeout; //Váriavel auxiliar para armazenar o contador

	this.auxTimeResponse = this.constTimeResponse; //Grava em uma váriavel local o tempo que foi definido

	//Função para iniciar o contador
	this.start = function(){
		//Definição de visibilidade das variáveis
		self = this;

		// Se o tempo não acabou
		if((self.auxTimeResponse - 1) >= 0){
			// diminui o tempo
			self.auxTimeResponse--;

			//Define se a mensagem de exibição do tempo será plural ou singular
			var txtTime = (self.auxTimeResponse > 1 || self.auxTimeResponse == 0) ? self.auxTimeResponse+' Segundos' : self.auxTimeResponse+' Segundo';

			//Mostra o tempo na tela
			$(".time > span > b").html(txtTime);

			//Limpa a variável do contador
			clearTimeout(self.timeout);

			//Executa a função a cada 1 segundo
			self.timeout = setTimeout(function(){
				self.start();
			}, 1000);

		//Se acabar o tempo, finaliza o jogo
		}else{
			finishGame('time');
		}
	}

	this.restart = function(){
		//Definição de visibilidade das variáveis
		self = this;

		//Mostra o tempo na tela
		$(".time > span > b").html('9 Segundos');

		//Define o tempo corrente de volta ao tempo inicial
		self.auxTimeResponse = constTimeResponse;

		//Pausa o contador
		self.pause();

		//Após um segundo inicia novamente o contador
		setTimeout(function(){
			self.start();
		}, 1000);
	}

	this.pause = function(){
		//Definição de visibilidade das variáveis
		self = this;
		//Força o contador a parar
		clearTimeout(self.timeout);
	}
}