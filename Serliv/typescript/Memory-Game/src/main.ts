import { Game } from "./game/core/game";
import { cards } from "./game/cards/cards";

const gameDom = document.querySelector('[data-game') as HTMLDivElement

const game = new Game(gameDom, cards)
game.init()

console.log(cards)