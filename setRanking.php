<?php
	//Pega o conteúdo do arquivo 'ranking.json'
	$jsonFile = file_get_contents('ranking.json');

	//Transforma de json para array -> lista
	$ranking = json_decode($jsonFile, true);

	//Verifica se houve postagem de dados
	if(isset($_POST['name']) && isset($_POST['score'])){
		//Adiciona as informações postadas ao final da lista
		$ranking[] = $_POST;

		//Cria uma variável auxiliar do tipo lista
		$aux = array();

		//Ordenação
		//Percorre a lista
		for($i = 0; $i < count($ranking); $i++){
			//Percorre a lista novamente
			for($j = 0; $j < count($ranking); $j++){
				//Se encontrou um score menor
				if($ranking[$j]['score'] < $ranking[$i]['score']){
					//move o maior para a variável auxiliar
					$aux = $ranking[$i];
					//move a menor, para a posição da maior
					$ranking[$i] = $ranking[$j];
					//move a auxiliar para a posição da antiga menor
					$ranking[$j] = $aux;
				}
			}
		}

		//Transforma a lista, agora ordenada em formato json
		$rankingJson = json_encode($ranking);

		//Abre o arquivo 'ranking.json' novamente, mas em modo de escrita
		$jsonFileWrite = fopen('ranking.json', "w+");

		//Coloca o conteudo de $rankingJson no aquivo
		fwrite($jsonFileWrite, $rankingJson);

		//Fecha e salva o arquivo
		fclose($jsonFileWrite);
	}else //Se nada foi postado, o ranking é o mesmo do aquivo original
		$rankingJson = $jsonFile;

	//Retorna para o ajax um elemento json
	echo $rankingJson;

	/*
		ESTRUTURA DO ELEMENTO JSON QUE GUARDA O RANKING
		[0]['name']
		[0]['score']
		[1]['name']
		[1]['score']
		.....

		PHP -> C

			typedef struct{
				char name[n];
				int score;
			}score;

			typedef struct{
				score dados[n]; 
			}ranking;

		Porém não precisamos definir os tipos de variáveis, nem os "tamanhos" das listas [n], pois isso é feito de forma automática, transformando listas aparentemente sequênciais em listas encadeadas.
		
		também não precisamos ter um contador definido na "struct" ranking, pois temos uma função que traz o número de elementos automaticamente.
	*/