import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../users/store/users'
import { map } from 'rxjs/operators';
import { UsersEffect } from './store/users.effect';

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Users[]>('https://dummyjson.com/users')
    .pipe(map((data: any) => {
      console.log(typeof(data));
      const users : Users[] = [];
      
      for (let x in data) {
        //users.push({...data[x as keyof typeof data]});
        if(x == "users"){
        users.push(...data[x as keyof typeof data]);
        type T = keyof typeof data;
        }
      }
      console.log('ddd')
      console.log(users)
      console.log('ddd')
      return users;
    }));
  }

  update(payload: Users) {
    return this.http.put<UsersEffect>(
      `https://dummyjson.com/users/${payload.id}`,
      payload
    );
  }
}
