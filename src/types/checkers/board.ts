import { IGameInfo } from "src/sharedTypes";
import { Player, Pos } from "./player";
import { StoredGame } from "../generated/checkers/stored_game";

const rowSeparator = "|";
export const pieceTranslator = {
  "*": 0,
  b: 1,
  r: 2,
};

export const playerReverseTranslator: Player[] = ["b", "r"];
export const pieceReverseTranslator = ["*", ...playerReverseTranslator];

export function serializedToBoard(serialized: string): number[][] {
  return serialized
    .split(rowSeparator)
    .map((row: string) =>
      row.split("").map((char: string) => (pieceTranslator as any)[char])
    );
}

export function storedToGameInfo(game: StoredGame): IGameInfo {
  return {
    board: serializedToBoard(game.board),
    created: new Date(Date.now()),
    isNewGame: game.moveCount.equals(0),
    last: new Date(Date.parse(game.deadline) - 86400 * 1000),
    p1: {
      name: game.black,
      is_ai: false,
      score: 0,
    },
    p2: {
      name: game.red,
      is_ai: false,
      score: 0,
    },
    turn: (pieceTranslator as any)[game.turn],
    index: parseInt(game.index),
  };
}
export function storedToGameInfos(games: StoredGame[]): IGameInfo[] {
  return games.map(storedToGameInfo);
}

export function guiPositionToPos(position: number[]): Pos {
  return { x: position[1], y: position[0] };
}
