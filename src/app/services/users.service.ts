import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private searchTermSource = new Subject<string>();
  searchTerm$ = this.searchTermSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
  }

  getUserById(userId: number): Observable<User>{
    return this.httpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }

  updateSearchTerm(term: string): void {
    this.searchTermSource.next(term);
  }
}
