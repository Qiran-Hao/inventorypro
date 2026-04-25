import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  readonly API = 'https://prog2005.it.scu.edu.au/ArtGalley';
  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Item[]>(this.API); }
  getByName(name: string) { return this.http.get<Item>(`${this.API}/${name}`); }
  add(item: Item) { return this.http.post(this.API, item); }
  update(name: string, item: Item) { return this.http.put(`${this.API}/${name}`, item); }
  del(name: string) {
    if (name.toLowerCase() === 'laptop') throw new Error('Laptop cannot delete');
    return this.http.delete(`${this.API}/${name}`);
  }
}