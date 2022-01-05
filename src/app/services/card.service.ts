import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!: Card[];
  filteredCards!: Card[];

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) { }

  getCard(): void {
    this.http.get<Card[]>(this.apiUrl + '/cards')
      .subscribe((res: Card[]) => {
        this.cards =  this.filteredCards = res;
      });
  }

  addCard(card: Card): Observable<any> {
    return this.http.post(this.apiUrl + '/cards', card)
  }

  updateCard(card: Card, cardID: number): Observable<any> {
    return this.http.put(this.apiUrl + '/cards/' + cardID, card)
  }

  deleteCard(cardID: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/cards/' + cardID);
  }
}
