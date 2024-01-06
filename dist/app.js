"use strict";
define("elements", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.win_message = exports.question = exports.cell = exports.empty_cell = exports.line_end = exports.line_start = exports.RIGHT_ASCII = exports.LEFT_ASCII = exports.DOWN_ASCII = exports.UP_ASCII = exports.question_text = exports.question_direction = exports.cell_value = exports.cell_id = exports.cell_attributes = void 0;
    exports.cell_attributes = `{CELL_ATTR}`;
    exports.cell_id = `{CELL_ID}`;
    exports.cell_value = `{CELL_VALUE}`;
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
<div class="cell"><input ${exports.cell_attributes} id="${exports.cell_id}" type="text" value="${exports.cell_value}" maxlength="1"></div>
`;
    exports.question = `
<div class="tooltip-container cell">
    <button id="show-tooltip">${exports.question_direction}</button><div class="tooltip" id="tooltip"><p>${exports.question_text}</p></div>
</div>
`;
    exports.win_message = `<div><h2>Acertou todas, parabéns!</h2></div>`;
});
define("timer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.startTimer = exports.loadTimer = void 0;
    let intervalId;
    let seconds;
    function loadTimer(board) {
        seconds = board.timer;
        updateTimer();
        if (seconds != 0) {
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
    exports.isNotToday = exports.disableElement = exports.setFocus = exports.setHtmlOnElement = exports.load = exports.save = exports.log = exports.gameBoardId = void 0;
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
define("app", ["require", "exports", "elements", "elements", "elements", "timer", "trys", "util"], function (require, exports, elements_1, elements_2, elements_3, timer_1, trys_1, util_1) {
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
    class Direction {
        constructor(ascii, doDirection) {
            this.ascii = ascii;
            this.doDirection = doDirection;
        }
    }
    Direction.UP = new Direction(elements_1.UP_ASCII, (x, y) => ({ x: x, y: y - 1 }));
    Direction.DOWN = new Direction(elements_1.DOWN_ASCII, (x, y) => ({ x: x, y: y + 1 }));
    Direction.LEFT = new Direction(elements_1.LEFT_ASCII, (x, y) => ({ x: x - 1, y: y }));
    Direction.RIGHT = new Direction(elements_1.RIGHT_ASCII, (x, y) => ({ x: x + 1, y: y }));
    const questions = [
        { id: 1, value: "TYPESCRIPT", question: "Um superconjunto tipado de JavaScript.", found: false, direction: Direction.RIGHT, x: 0, y: 1, elements: [] },
        { id: 2, value: "HTML", question: "Linguagem de Marcação de Hipertexto.", found: false, direction: Direction.RIGHT, x: 0, y: 2, elements: [] },
        { id: 3, value: "ELETROBRAS", question: "Companhia brasileira de distribuição de energia elétrica.", found: false, direction: Direction.DOWN, x: 4, y: 0, elements: [] },
        { id: 4, value: "CORINTHIANS", question: "Time de futebol que tem mundial em cima do Vasco da Gama.", found: false, direction: Direction.DOWN, x: 6, y: 0, elements: [] },
        { id: 5, value: "TENDER", question: "Comida típica de natal, em formato de bola.", found: false, direction: Direction.DOWN, x: 2, y: 3, elements: [] },
        { id: 6, value: "SALADA", question: "Criança não gosta de comer.", found: false, direction: Direction.UP, x: 5, y: 11, elements: [] }
    ];
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
            (0, util_1.setHtmlOnElement)("message", elements_1.win_message);
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
            htmlboard += elements_2.line_start;
            for (let x = 0; x < columns; x++) {
                let element = board.matrix[x][y];
                if (element) {
                    if (element.isQuestion) {
                        htmlboard += elements_2.question.replace(elements_3.question_direction, element.direction.ascii).replace(elements_3.question_text, element.text);
                    }
                    else {
                        let style = "";
                        if (element.answer == Answer.WRONG && element.input) {
                            style = `class="wrong"`;
                        }
                        else if (element.answer == Answer.CORRECT && element.input) {
                            style = `class="correct"`;
                        }
                        const attrs = `onkeypress=checkInput(event) ${style}`;
                        htmlboard += elements_2.cell
                            .replace(elements_3.cell_attributes, attrs)
                            .replace(elements_3.cell_id, `cell_${x}_${y}`)
                            .replace(elements_1.cell_value, element.input);
                    }
                }
                else {
                    htmlboard += elements_2.empty_cell;
                }
            }
            htmlboard += elements_2.line_end;
        }
        return htmlboard;
    }
    function checkInput(event) {
        event.preventDefault();
        const htmlElement = document.getElementById(event.target.id);
        if (htmlElement) {
            const oldValue = htmlElement.value;
            htmlElement.value = event.key.toUpperCase();
            htmlElement.setSelectionRange(0, 0);
            const id = htmlElement.id.split("_");
            const x = parseInt(id[1]);
            const y = parseInt(id[2]);
            const value = htmlElement.value;
            const matrixElement = globalBoard.matrix[x][y];
            matrixElement.input = value;
            const isCorrect = checkElementIsCorrect(matrixElement, htmlElement);
            if (isCorrect === true) {
                (0, util_1.disableElement)(htmlElement.id);
            }
            else if (oldValue != htmlElement.value) {
                (0, trys_1.updateTrys)(globalBoard);
            }
            saveGlobalBoard();
            (0, timer_1.startTimer)(globalBoard);
            checkBoardWin(globalBoard);
        }
    }
    exports.checkInput = checkInput;
    function getNextValidElement(x_, y_, board) {
        for (let x = x_; x < columns; x++) {
            for (let y = y_; y < lines; y++) {
                const element = board.matrix[x][y];
                if (element && element.isQuestion == false && (element.answer == Answer.WRONG || element.answer == Answer.EMPTY)) {
                    return { x, y };
                }
            }
        }
        return null;
    }
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
        saveGlobalBoard();
        (0, util_1.setHtmlOnElement)("message", elements_1.win_message);
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
