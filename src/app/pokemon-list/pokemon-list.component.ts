import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription, concat, Observable } from 'rxjs';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  constructor (private pokemonService: PokemonService) {}

  @ViewChild(MatAccordion) accordion?: MatAccordion;

  isLoading = false;
  // totalPokemon = 0;
  // pokemonPerPage = 2;
  // currentPage = 1;
  // pageSizeOptions = [1, 2, 5, 10];
  // xpandedStatus = false;
  subscriptions: Subscription[] = [];

  get pokemons(): any[] {
    return this.pokemonService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadMore();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  /** Calls the getNext method of pokemon service, once response loaded it arranges the results
      to make another call to get each of the pokemon details using concat method of RxJS in order
      to maintain the sequence of the call.
      Finally add each of the pokemon to pokemon service’s pokemons array
  */
  loadMore(): void {
    this.isLoading = true;
    this.subscription = this.pokemonService.getNext().subscribe(response => {
      this.pokemonService.next = response.next;
      const details = response.results.map((i: any) => this.pokemonService.get(i.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.pokemonService.pokemons.push(response);
      });
    }, error => console.log(error), () => this.isLoading = false);
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  getStats(id: number) {
    this.subscription = this.pokemonService.getStats(id).subscribe(response => {
      console.log('stats ', response);
    })
  }

  closeAll() {
    if (!this.accordion) { return }
    this.accordion.closeAll();
  }
}
