/** id: number, name: string, game_index: number, is_battle_only: boolean */
export class Stat {
  constructor (public id: number,
               public name: string,
               public game_index: number,
               public is_battle_only: boolean,

               ) {}
}

// https://pokeapi.co/docs/v2#stats