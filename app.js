"use strict";
define("elements", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.win_message = exports.question = exports.cell = exports.empty_cell = exports.line_end = exports.line_start = exports.RIGHT_ASCII = exports.LEFT_ASCII = exports.DOWN_ASCII = exports.UP_ASCII = exports.question_text = exports.question_direction = exports.cell_placeholder = exports.cell_value = exports.cell_id = exports.cell_attributes = void 0;
    exports.cell_attributes = `{CELL_ATTR}`;
    exports.cell_id = `{CELL_ID}`;
    exports.cell_value = `{CELL_VALUE}`;
    exports.cell_placeholder = `{CELL_PLACEHOLDER}`;
    exports.question_direction = `{DIRECTION}`;
    exports.question_text = `{Q_TEXT}`;
    exports.UP_ASCII = `↑`;
    exports.DOWN_ASCII = `↓`;
    exports.LEFT_ASCII = `←`;
    exports.RIGHT_ASCII = `→`;
    exports.line_start = `<div class="line">`;
    exports.line_end = `</div>`;
    exports.empty_cell = `<div class="cell"></div>`;
    exports.cell = `
<div class="cell"><input ${exports.cell_attributes} id="${exports.cell_id}" type="text" value="${exports.cell_value}" placeholder="${exports.cell_placeholder}" maxlength="1"></div>
`;
    exports.question = `
<div class="tooltip-container cell">
    <button id="show-tooltip">${exports.question_direction}</button><div class="tooltip" id="tooltip"><p>${exports.question_text}</p></div>
</div>
`;
    exports.win_message = `<div><h2>Acertou todas, parabéns!</h2></div>`;
});
define("random", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRandomInRange = exports.generateRandom = void 0;
    function generateRandom(seed) {
        const a = 1664525;
        const c = 1013904223;
        const m = Math.pow(2, 32);
        seed = (a * seed + c) % m;
        return seed / m;
    }
    exports.generateRandom = generateRandom;
    let count = 0;
    function getRandomInRange(seed, max, mathWay) {
        if (mathWay) {
            return Math.floor(Math.random() * max);
        }
        const range = max;
        const random = generateRandom(seed);
        count++;
        return Math.floor(random * range);
    }
    exports.getRandomInRange = getRandomInRange;
});
define("generator", ["require", "exports", "elements", "random"], function (require, exports, elements_1, random_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createGame = exports.Direction = void 0;
    const words = [
        { value: "COMPUTADOR", question: "Dispositivo eletrônico para processamento de dados." },
        { value: "VIOLINO", question: "Instrumento musical de cordas." },
        { value: "LIVRO", question: "Objeto composto por páginas encadernadas." },
        { value: "NEVE", question: "Forma de precipitação que consiste em cristais de gelo." },
        { value: "CAMERA", question: "Dispositivo para capturar imagens ou gravar vídeos." },
        { value: "PINTURA", question: "Forma de expressão artística usando tintas." },
        { value: "DANCA", question: "Expressão artística que envolve movimentos corporais ritmados." },
        { value: "TELEFONE", question: "Dispositivo de comunicação sem fio." },
        { value: "JARDIM", question: "Área cultivada com plantas ornamentais." },
        { value: "ASTRONOMIA", question: "Estudo dos corpos celestes no universo." },
        { value: "KAYAK", question: "Pequena embarcação utilizada para navegação em águas calmas." },
        { value: "FOTOGRAFIA", question: "Processo de capturar imagens por meio da luz." },
        { value: "VIAGEM", question: "Deslocamento de um lugar para outro." },
        { value: "CACHORRO", question: "Animal de estimação comum." },
        { value: "MONTANHA", question: "Elevação natural da superfície terrestre." },
        { value: "PRAIA", question: "Margem da terra junto ao mar." },
        { value: "CAFE", question: "Bebida estimulante feita a partir de grãos torrados." },
        { value: "REVISTA", question: "Publicação periódica com artigos e imagens." },
        { value: "AVIAO", question: "Meio de transporte mais rápido que um carro." },
        { value: "RELAMPAGO", question: "Descarga elétrica atmosférica acompanhada de trovões." },
        { value: "MUSICA", question: "Arranjo de sons harmoniosos." },
        { value: "PENINSULA", question: "Porção de terra cercada de água por todos os lados, exceto um." },
        { value: "ESCOLA", question: "Instituição de ensino." },
        { value: "INVERNO", question: "Estação do ano mais fria." },
        { value: "CELULAR", question: "Dispositivo portátil de comunicação." },
        { value: "HOSPITAL", question: "Local destinado ao atendimento médico." },
        { value: "PINTOR", question: "Artista que cria obras usando tintas." },
        { value: "ARVORE", question: "Planta perene com caule lenhoso." },
        { value: "FILME", question: "Sequência de imagens em movimento." },
        { value: "CADERNO", question: "Bloco de papel para escrever ou desenhar." },
        { value: "CADEREIRA", question: "Móvel para sentar." },
        { value: "CHOCOLATE", question: "Doce feito a partir de cacau." },
        { value: "AMIZADE", question: "Relação afetiva entre amigos." },
        { value: "TRABALHO", question: "Atividade realizada para obter um resultado." },
        { value: "ARTE", question: "Expressão criativa e imaginativa." },
        { value: "TELEVISAO", question: "Meio de comunicação que transmite imagens e sons." },
        { value: "FRUTA", question: "Produto comestível obtido de plantas." },
        { value: "OCEANO", question: "Grande extensão de água salgada." },
        { value: "CARTEIRA", question: "Objeto para armazenar dinheiro e documentos." },
        { value: "BICICLETA", question: "Veículo de duas rodas acionado por pedais." },
        { value: "SONHO", question: "Experiência mental durante o sono." },
        { value: "DINHEIRO", question: "Meio de troca e unidade de valor." },
        { value: "CACHOEIRA", question: "Queda d'água natural." },
        { value: "CHUVA", question: "Precipitação de água da atmosfera." },
        { value: "AZUL", question: "Cor do céu em um dia claro." },
        { value: "TEATRO", question: "Local para apresentações ao vivo." },
        { value: "ESCALADA", question: "Atividade de subir montanhas ou rochas." },
        { value: "FUTEBOL", question: "Esporte jogado entre duas equipes com uma bola." },
        { value: "MAPA", question: "Representação gráfica de uma área geográfica." },
        { value: "ALMOFADA", question: "Objeto macio para apoio." },
        { value: "BANANA", question: "Fruta alongada com casca amarela." },
        { value: "OCEANO", question: "Grande extensão de água salgada." },
        { value: "AMARELO", question: "Cor vibrante semelhante ao sol." },
        { value: "AVENTURA", question: "Experiência emocionante e arriscada." },
        { value: "JANELA", question: "Abertura em uma parede para entrada de luz e ar." },
        { value: "CELULA", question: "Unidade estrutural e funcional dos organismos vivos." },
        { value: "VERAO", question: "Estação mais quente do ano." },
        { value: "CADERNO", question: "Bloco de papel para escrever ou desenhar." },
        { value: "SORRISO", question: "Expressão facial de alegria." },
        { value: "PLANTA", question: "Organismo vegetal com raízes, caule e folhas." },
        { value: "CEREAL", question: "Alimento geralmente consumido no café da manhã." },
        { value: "DESENHO", question: "Representação visual ou gráfica." },
        { value: "CONCERTO", question: "Apresentação musical ao vivo." },
        { value: "FAMILIA", question: "Grupo de pessoas relacionadas por laços de parentesco." },
        { value: "TELEFONE", question: "Dispositivo de comunicação sem fio." },
        { value: "CRIANCA", question: "Indivíduo na fase inicial da vida." },
        { value: "FLORESTA", question: "Área extensa com árvores e vegetação." },
        { value: "ABRACO", question: "Gesto de carinho envolvendo os braços." },
        { value: "VIAJANTE", question: "Pessoa que se desloca para diferentes lugares." },
        { value: "CHOCOLATE", question: "Doce feito a partir de cacau." },
        { value: "AQUARIO", question: "Recipiente para manter peixes e organismos aquáticos." },
        { value: "PRAIA", question: "Margem da terra junto ao mar." },
        { value: "LUA", question: "Satélite natural da Terra." },
        { value: "RELACIONAMENTO", question: "Conexão emocional entre duas pessoas." },
        { value: "BOLA", question: "Objeto esférico usado em diversos esportes." },
        { value: "DIVERSAO", question: "Atividade que proporciona prazer e entretenimento." },
        { value: "FERIAS", question: "Período de descanso do trabalho ou estudos." },
        { value: "ELEFANTE", question: "Mamífero de grande porte com presas." },
        { value: "CAVALO", question: "Animal de quatro patas frequentemente usado como montaria." },
        { value: "VERDE", question: "Cor associada à natureza e folhagem." },
        { value: "ESTRELA", question: "Corpo celeste luminoso no céu noturno." },
        { value: "ARCO-IRIS", question: "Fenômeno óptico e meteorológico." },
        { value: "MONTANHA", question: "Elevação natural da superfície terrestre." },
        { value: "FANTASIA", question: "Roupa imaginativa usada em festas ou eventos." },
        { value: "PIANO", question: "Instrumento musical de teclas." },
        { value: "VOLCANO", question: "Montanha que expele lava, cinzas e gases." },
        { value: "DOUTOR", question: "Profissional de saúde com formação em medicina." },
        { value: "REVOLUCAO", question: "Mudança radical ou transformação." },
        { value: "CARRO", question: "Meio de transporte comum nas estradas." },
        { value: "FOTOGRAFIA", question: "Processo de capturar imagens por meio da luz." },
        { value: "SATIRA", question: "O que é uma crítica humorística?" },
        { value: "OLHAR", question: "Expressão facial e gestual dos olhos." },
        { value: "PALAVRA", question: "Unidade básica da linguagem." },
        { value: "ESPERANCA", question: "Sentimento de otimismo e expectativa positiva." },
        { value: "MOTOCICLETA", question: "Veículo de duas rodas motorizado." },
        { value: "PINTOR", question: "Artista que cria obras usando tintas." },
        { value: "FLORESTA", question: "Área extensa com árvores e vegetação." },
        { value: "CINEMA", question: "Local para exibição de filmes." },
        { value: "FUTURO", question: "Tempo que está por vir." },
        { value: "HAMBURGUER", question: "Sanduíche com carne entre duas fatias de pão." },
        { value: "CADEIRA", question: "Assento com encosto usado para descanso." },
        { value: "SOL", question: "Estrela central do sistema solar." },
        { value: "AMOR", question: "Sentimento profundo de afeição." },
        { value: "PAZ", question: "Estado de tranquilidade e ausência de conflito." },
        { value: "PALCO", question: "Onde os artistas se apresentam?" },
        { value: "OCULOS", question: "Qual acessório é usado para proteger os olhos do sol?" },
        { value: "ABRIR", question: "O que você faz para abrir uma porta?" },
        { value: "BISCOITO", question: "Não é bolacha." },
        { value: "LIDER", question: "Prova do ... BBB" },
        { value: "CARRO", question: "Qual é o meio de transporte comum nas estradas?" },
        { value: "SATIRA", question: "O que é uma crítica humorística?" },
        { value: "OLHAR", question: "... 43" }
    ];
    class Direction {
        constructor(ascii, doDirection, name) {
            this.ascii = ascii;
            this.doDirection = doDirection;
            this.name = name;
        }
    }
    exports.Direction = Direction;
    Direction.UP = new Direction(elements_1.UP_ASCII, (x, y) => ({ x: x, y: y - 1 }), 'UP');
    Direction.DOWN = new Direction(elements_1.DOWN_ASCII, (x, y) => ({ x: x, y: y + 1 }), 'DOWN');
    Direction.LEFT = new Direction(elements_1.LEFT_ASCII, (x, y) => ({ x: x - 1, y: y }), 'LEFT');
    Direction.RIGHT = new Direction(elements_1.RIGHT_ASCII, (x, y) => ({ x: x + 1, y: y }), 'RIGHT');
    const lines = 12;
    const columns = 12;
    function getRandomCoordinate(seedX, seedY) {
        const randomX = (0, random_1.getRandomInRange)(seedX, lines, false);
        const randomY = (0, random_1.getRandomInRange)(seedY, columns, false);
        return {
            x: randomX, y: randomY
        };
    }
    const randomTeste = Array(120).fill(0);
    function getRandomElement(seed, array) {
        const randomIndex = (0, random_1.getRandomInRange)(seed, array.length, false);
        randomTeste[randomIndex] = randomTeste[randomIndex] + 1;
        return array[randomIndex];
    }
    function isEmptyOrMatchLetter(matrix, x, y, char) {
        try {
            let canEnter = matrix[x][y] == null || matrix[x][y] == char;
            let cross = matrix[x][y] == char;
            return {
                canEnter: canEnter,
                cross: cross
            };
        }
        catch (e) {
            return {
                canEnter: false,
                cross: false
            };
        }
    }
    function canEnterInMatrix(matrix, word, xy, direction, forceCross) {
        if (matrix[xy.x][xy.y] != null) {
            return false;
        }
        let next = direction.doDirection(xy.x, xy.y);
        let x = next.x;
        let y = next.y;
        let crosses = 0;
        for (let i = 0; i < word.value.length; i++) {
            const letter = word.value[i];
            if (y < 0 || x < 0 || y > 12 || x > 12)
                return false;
            const resultMatch = isEmptyOrMatchLetter(matrix, x, y, letter);
            if (!resultMatch.canEnter)
                return false;
            if (resultMatch.cross) {
                crosses = crosses + 1;
            }
            next = direction.doDirection(x, y);
            x = next.x;
            y = next.y;
        }
        if (forceCross && crosses < 1)
            return false;
        matrix[xy.x][xy.y] = word.question;
        next = direction.doDirection(xy.x, xy.y);
        x = next.x;
        y = next.y;
        for (let i = 0; i < word.value.length; i++) {
            matrix[x][y] = word.value[i];
            next = direction.doDirection(x, y);
            x = next.x;
            y = next.y;
        }
        return true;
    }
    function pickElement(seed, interval, matrix, forceCross) {
        const directions = Object.values(Direction).filter(item => { return isNaN(Number(item)); });
        const word = getRandomElement(seed.element, words);
        const direction = getRandomElement(seed.direction, directions);
        const xy = getRandomCoordinate(seed.x, seed.y);
        const isValid = canEnterInMatrix(matrix, word, xy, direction, forceCross);
        seed.element = seed.element + interval.element;
        seed.direction = seed.direction + interval.direction;
        seed.x = seed.x + interval.x;
        seed.y = seed.y + interval.y;
        return {
            id: 1,
            value: word.value,
            question: word.question,
            direction: direction,
            x: xy.x,
            y: xy.y,
            isValid: isValid,
            elements: []
        };
    }
    const MAXIMUM_NUMBER_OF_ITERATIONS = 99999;
    function createGame(seed, interval) {
        const elements = [];
        var safeCount = 0;
        const matrix = Array.from({ length: 12 }, () => Array(12).fill(null));
        while (elements.length < 10 && safeCount < MAXIMUM_NUMBER_OF_ITERATIONS) {
            const element = pickElement(seed, interval, matrix, elements.length > 0);
            if (element.isValid) {
                elements.push(element);
            }
            safeCount++;
        }
        console.log(`elements: ${elements.length}, safeCount: ${safeCount}`);
        return { elements };
    }
    exports.createGame = createGame;
});
define("timer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pauseTimer = exports.startTimer = exports.loadTimer = void 0;
    let intervalId;
    let seconds;
    function loadTimer(board) {
        seconds = board.timer;
        updateTimer();
        if (seconds != 0 && !board.win) {
            startTimer(board);
        }
    }
    exports.loadTimer = loadTimer;
    function startTimer(board) {
        if (!intervalId) {
            intervalId = setInterval(function () {
                seconds++;
                updateTimer();
                board.timer = seconds;
            }, 1000);
        }
    }
    exports.startTimer = startTimer;
    function pauseTimer(board) {
        if (intervalId) {
            console.log("asdasdasd");
            clearInterval(intervalId);
        }
    }
    exports.pauseTimer = pauseTimer;
    function updateTimer() {
        const minutos = Math.floor(seconds / 60);
        const segundosRestantes = seconds % 60;
        document.getElementById('time').innerText = `Tempo: ${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
    }
});
define("trys", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateTrys = exports.loadTrys = void 0;
    let trys;
    function loadTrys(board) {
        trys = board.trys;
        document.getElementById('trys').innerText = `Erros: ${trys}`;
    }
    exports.loadTrys = loadTrys;
    function updateTrys(board) {
        if (trys != null) {
            trys++;
            board.trys = trys;
            document.getElementById('trys').innerText = `Erros: ${trys}`;
        }
    }
    exports.updateTrys = updateTrys;
});
define("util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNotToday = exports.setPlaceholder = exports.disableElement = exports.setFocus = exports.setHtmlOnElement = exports.load = exports.save = exports.log = exports.gameBoardId = void 0;
    const isDebug = true;
    exports.gameBoardId = "LOCAL_STORAGE_GAME_BOARD";
    function log(message) {
        if (isDebug) {
            console.log(message);
        }
    }
    exports.log = log;
    function save(id, valor) {
        try {
            const data = JSON.stringify(valor);
            localStorage.setItem(id, data);
            log(`Dados salvos com sucesso no Local Storage com o ID: ${id}`);
        }
        catch (error) {
            console.error(`Erro ao salvar dados no Local Storage: ${error}`);
        }
    }
    exports.save = save;
    function load(id) {
        try {
            const data = localStorage.getItem(id);
            if (data !== null) {
                const dadosParseados = JSON.parse(data);
                log(`Dados recuperados do Local Storage com o ID: ${id}`);
                return dadosParseados;
            }
            else {
                log(`Nenhum dado encontrado no Local Storage com o ID: ${id}`);
                return null;
            }
        }
        catch (error) {
            console.error(`Erro ao recuperar dados do Local Storage: ${error}`);
            return null;
        }
    }
    exports.load = load;
    function setHtmlOnElement(elementName, html) {
        const div = document.getElementById(elementName);
        if (div) {
            div.innerHTML = html;
        }
        else {
            console.error(`elemento: ${elementName} não existe`);
        }
    }
    exports.setHtmlOnElement = setHtmlOnElement;
    function setFocus(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.focus();
        }
        else {
            console.error(`elemento: ${element} não existe`);
        }
    }
    exports.setFocus = setFocus;
    function disableElement(inputId) {
        const element = document.getElementById(inputId);
        if (element) {
            element.disabled = true;
        }
        else {
            console.error(`Element with ID '${inputId}' not found.`);
        }
    }
    exports.disableElement = disableElement;
    function setPlaceholder(inputId, text) {
        const element = document.getElementById(inputId);
        if (element) {
            element.placeholder = text;
        }
        else {
            console.error(`Element with ID '${inputId}' not found.`);
        }
    }
    exports.setPlaceholder = setPlaceholder;
    function isNotToday(board) {
        if (board) {
            const today = new Date();
            const date = new Date(board.date);
            return date.getDate() !== today.getDate() || date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear();
        }
        return true;
    }
    exports.isNotToday = isNotToday;
});
define("app", ["require", "exports", "elements", "elements", "elements", "generator", "timer", "trys", "util"], function (require, exports, elements_2, elements_3, elements_4, generator_1, timer_1, trys_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkInput = exports.run = exports.Board = void 0;
    const lines = 12;
    const columns = 12;
    var Answer;
    (function (Answer) {
        Answer[Answer["EMPTY"] = 0] = "EMPTY";
        Answer[Answer["CORRECT"] = 1] = "CORRECT";
        Answer[Answer["WRONG"] = 2] = "WRONG";
    })(Answer || (Answer = {}));
    class Element {
        constructor(answer, isQuestion, text, input, direction) {
            this.answer = answer;
            this.isQuestion = isQuestion;
            this.text = text;
            this.input = input;
            this.direction = direction;
        }
    }
    class Board {
        constructor() {
            this.date = new Date();
            this.timer = 0;
            this.trys = 0;
            this.win = false;
            this.matrix = Array.from({ length: lines }, () => Array(columns).fill(null));
        }
    }
    exports.Board = Board;
    const example = [
        { id: 1, value: "", question: "", found: false, direction: generator_1.Direction.RIGHT, x: 0, y: 1, elements: [] },
        { id: 2, value: "", question: "", found: false, direction: generator_1.Direction.RIGHT, x: 0, y: 2, elements: [] },
        { id: 3, value: "", question: "", found: false, direction: generator_1.Direction.DOWN, x: 4, y: 0, elements: [] },
        { id: 4, value: "", question: "", found: false, direction: generator_1.Direction.DOWN, x: 6, y: 0, elements: [] },
        { id: 5, value: "", question: "", found: false, direction: generator_1.Direction.DOWN, x: 2, y: 3, elements: [] },
        { id: 6, value: "", question: "", found: false, direction: generator_1.Direction.UP, x: 5, y: 11, elements: [] },
        { id: 7, value: "", question: "", found: false, direction: generator_1.Direction.UP, x: 5, y: 11, elements: [] },
        { id: 8, value: "", question: "", found: false, direction: generator_1.Direction.UP, x: 5, y: 11, elements: [] }
    ];
    const oldQuestions = [
        { id: 1, value: "TYPESCRIPT", question: "Um superconjunto tipado de JavaScript.", found: false, direction: generator_1.Direction.RIGHT, x: 0, y: 1, elements: [] },
        { id: 2, value: "HTML", question: "Linguagem de Marcação de Hipertexto.", found: false, direction: generator_1.Direction.RIGHT, x: 0, y: 2, elements: [] },
        { id: 3, value: "ELETROBRAS", question: "Companhia brasileira de distribuição de energia elétrica.", found: false, direction: generator_1.Direction.DOWN, x: 4, y: 0, elements: [] },
        { id: 4, value: "CORINTHIANS", question: "Time de futebol que tem mundial em cima do Vasco da Gama.", found: false, direction: generator_1.Direction.DOWN, x: 6, y: 0, elements: [] },
        { id: 5, value: "TENDER", question: "Comida típica de natal, em formato de bola.", found: false, direction: generator_1.Direction.DOWN, x: 2, y: 3, elements: [] },
        { id: 6, value: "SALADA", question: "Criança não gosta de comer.", found: false, direction: generator_1.Direction.UP, x: 5, y: 11, elements: [] }
    ];
    const oldQuestions2 = [
        { id: 1, value: "PALCO", question: "Onde os artistas se apresentam?", found: false, direction: generator_1.Direction.RIGHT, x: 1, y: 1, elements: [] },
        { id: 2, value: "OCULOS", question: "Qual acessório é usado para proteger os olhos do sol?", found: false, direction: generator_1.Direction.DOWN, x: 6, y: 0, elements: [] },
        { id: 3, value: "ABRIR", question: "O que você faz para abrir uma porta?", found: false, direction: generator_1.Direction.DOWN, x: 3, y: 0, elements: [] },
        { id: 4, value: "BISCOITO", question: "Não é bolacha.", found: false, direction: generator_1.Direction.RIGHT, x: 2, y: 2, elements: [] },
        { id: 5, value: "LIDER", question: "Prova do ... BBB", found: false, direction: generator_1.Direction.DOWN, x: 4, y: 0, elements: [] },
        { id: 6, value: "CARRO", question: "Qual é o meio de transporte comum nas estradas?", found: false, direction: generator_1.Direction.RIGHT, x: 0, y: 5, elements: [] },
        { id: 7, value: "SATIRA", question: "O que é uma crítica humorística?", found: false, direction: generator_1.Direction.RIGHT, x: 5, y: 6, elements: [] },
        { id: 8, value: "OLHAR", question: "... 43", found: false, direction: generator_1.Direction.DOWN, x: 10, y: 1, elements: [] }
    ];
    const seed = {
        element: 32399,
        direction: 121222,
        x: 3232,
        y: 2321
    };
    const interval = {
        element: 77,
        direction: 88,
        x: 99,
        y: 112
    };
    const game = (0, generator_1.createGame)(seed, interval);
    const questions = game.elements;
    let globalBoard;
    function run() {
        (0, util_1.log)("loaded");
        const board = loadBoardData();
        globalBoard = board;
        (0, util_1.log)(questions);
        (0, util_1.log)(board);
        (0, timer_1.loadTimer)(board);
        (0, trys_1.loadTrys)(board);
        (0, util_1.setHtmlOnElement)("puzzle", buildBoard(board));
        if (board.win) {
            (0, util_1.setHtmlOnElement)("message", elements_2.win_message);
        }
    }
    exports.run = run;
    function loadBoardData() {
        const localStorageBoard = (0, util_1.load)(util_1.gameBoardId);
        const wipeBoard = (0, util_1.isNotToday)(localStorageBoard);
        (0, util_1.log)(`wipeBoard:` + wipeBoard);
        if (localStorageBoard != null && !wipeBoard) {
            return localStorageBoard;
        }
        else {
            return buildQuestions();
        }
    }
    function buildQuestions() {
        const board = new Board();
        questions.forEach(question => {
            let x = question.x;
            let y = question.y;
            const questionElement = new Element(Answer.EMPTY, true, question.question, "", question.direction);
            question.elements.push(questionElement);
            board.matrix[x][y] = questionElement;
            Array.from(question.value).forEach(char => {
                const xy = question.direction.doDirection(x, y);
                x = xy.x;
                y = xy.y;
                const element = new Element(Answer.EMPTY, false, char, "", question.direction);
                question.elements.push(element);
                board.matrix[x][y] = element;
            });
        });
        return board;
    }
    function buildBoard(board) {
        let htmlboard = '';
        for (let y = 0; y < lines; y++) {
            htmlboard += elements_3.line_start;
            for (let x = 0; x < columns; x++) {
                let element = board.matrix[x][y];
                if (element) {
                    if (element.isQuestion) {
                        htmlboard += elements_3.question.replace(elements_4.question_direction, element.direction.ascii).replace(elements_4.question_text, element.text);
                    }
                    else {
                        let style = "";
                        const attrs = `oninput=checkInput(event) ${style}`;
                        if (element.answer == Answer.WRONG && element.input) {
                            style = `class="wrong"`;
                            htmlboard += elements_3.cell
                                .replace(elements_4.cell_attributes, `${attrs} ${style}`)
                                .replace(elements_4.cell_id, `cell_${x}_${y}`)
                                .replace(elements_2.cell_value, "")
                                .replace(elements_2.cell_placeholder, element.input);
                        }
                        else if (element.answer == Answer.CORRECT && element.input) {
                            style = `class="correct" disabled`;
                            htmlboard += elements_3.cell
                                .replace(elements_4.cell_attributes, `${attrs} ${style}`)
                                .replace(elements_4.cell_id, `cell_${x}_${y}`)
                                .replace(elements_2.cell_value, element.input)
                                .replace(elements_2.cell_placeholder, "");
                        }
                        else {
                            htmlboard += elements_3.cell
                                .replace(elements_4.cell_attributes, attrs)
                                .replace(elements_4.cell_id, `cell_${x}_${y}`)
                                .replace(elements_2.cell_value, "")
                                .replace(elements_2.cell_placeholder, "");
                        }
                    }
                }
                else {
                    htmlboard += elements_3.empty_cell;
                }
            }
            htmlboard += elements_3.line_end;
        }
        return htmlboard;
    }
    function checkInput(event) {
        const htmlElement = document.getElementById(event.target.id);
        const charInput = htmlElement.value.toUpperCase();
        if (htmlElement) {
            const id = htmlElement.id.split("_");
            const x = parseInt(id[1]);
            const y = parseInt(id[2]);
            const matrixElement = globalBoard.matrix[x][y];
            matrixElement.input = charInput;
            const isCorrect = checkElementIsCorrect(matrixElement, htmlElement);
            if (isCorrect === true) {
                (0, util_1.disableElement)(htmlElement.id);
                htmlElement.value = charInput;
            }
            else {
                (0, util_1.setPlaceholder)(htmlElement.id, charInput);
                htmlElement.value = "";
                (0, trys_1.updateTrys)(globalBoard);
            }
            saveGlobalBoard();
            (0, timer_1.startTimer)(globalBoard);
            checkBoardWin(globalBoard);
        }
    }
    exports.checkInput = checkInput;
    function checkBoardWin(board) {
        for (let y = 0; y < lines; y++) {
            for (let x = 0; x < columns; x++) {
                const element = board.matrix[x][y];
                if (element && element.isQuestion == true) { }
                if (element && element.isQuestion == false && (element.answer == Answer.WRONG || element.answer == Answer.EMPTY)) {
                    return;
                }
            }
        }
        board.win = true;
        (0, timer_1.pauseTimer)(board);
        saveGlobalBoard();
        (0, util_1.setHtmlOnElement)("message", elements_2.win_message);
    }
    function checkElementIsCorrect(element, htmlElement) {
        if (element.text.toLowerCase() === element.input.toLowerCase()) {
            element.answer = Answer.CORRECT;
            htmlElement.classList.remove('wrong');
            htmlElement.classList.add('correct');
            return true;
        }
        else {
            element.answer = Answer.WRONG;
            htmlElement.classList.remove('correct');
            htmlElement.classList.add('wrong');
            return false;
        }
    }
    function saveGlobalBoard() {
        (0, util_1.save)(util_1.gameBoardId, globalBoard);
    }
});
