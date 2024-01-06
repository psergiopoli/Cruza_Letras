declare module "elements" {
    export const cell_attributes = "{CELL_ATTR}";
    export const cell_id = "{CELL_ID}";
    export const cell_value = "{CELL_VALUE}";
    export const question_direction = "{DIRECTION}";
    export const question_text = "{Q_TEXT}";
    export const UP_ASCII = "\u2191";
    export const DOWN_ASCII = "\u2193";
    export const LEFT_ASCII = "\u2190";
    export const RIGHT_ASCII = "\u2192";
    export const line_start = "<div class=\"line\">";
    export const line_end = "</div>";
    export const empty_cell = "<div class=\"cell\"></div>";
    export const cell = "\n<div class=\"cell\"><input {CELL_ATTR} id=\"{CELL_ID}\" type=\"text\" value=\"{CELL_VALUE}\" maxlength=\"1\"></div>\n";
    export const question = "\n<div class=\"tooltip-container cell\">\n    <button id=\"show-tooltip\">{DIRECTION}</button><div class=\"tooltip\" id=\"tooltip\"><p>{Q_TEXT}</p></div>\n</div>\n";
    export const win_message = "<div><h2>Acertou todas, parab\u00E9ns!</h2></div>";
}
declare module "timer" {
    import { Board } from "app";
    export function loadTimer(board: Board): void;
    export function startTimer(board: Board): void;
}
declare module "trys" {
    import { Board } from "app";
    export function loadTrys(board: Board): void;
    export function updateTrys(board: Board): void;
}
declare module "util" {
    import { Board } from "app";
    export const gameBoardId = "LOCAL_STORAGE_GAME_BOARD";
    export interface StringData {
        data: string;
    }
    export function log(message: any): void;
    export function save(id: string, valor: any): void;
    export function load(id: string): any | null;
    export function setHtmlOnElement(elementName: string, html: string): void;
    export function setFocus(elementId: string): void;
    export function disableElement(inputId: string): void;
    export function isNotToday(board: Board): boolean;
}
declare module "app" {
    export class Board {
        date: Date;
        timer: number;
        trys: number;
        win: boolean;
        matrix: any[][];
    }
    export function run(): void;
    export function checkInput(event: any): void;
}
