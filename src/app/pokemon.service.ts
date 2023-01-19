import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class PokemonService {

  private url: string = environment.apiUrl + 'pokemon/';
  private _pokemons: any[] = [];
  private _next: string = '';

  constructor(private http: HttpClient) {}

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=10` : this.next; // limit=151
    return this.http.get(url);
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.apiUrl}evolution-chain/${id}`;
    return this.http.get(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${environment.apiUrl}pokemon-species/${name}`;
    return this.http.get(url);
  }

  getStats(id: number): Observable<any> {
    const url = `${environment.apiUrl}stat/${id}`;
    return this.http.get(url);
  }
}
