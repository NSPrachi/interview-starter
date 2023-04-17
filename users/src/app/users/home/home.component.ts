import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectUsers } from '../store/users.selector';
import { invokeUsersAPI, invokeUpdateUserAPI } from '../store/users.action';
import { selectUserById } from '../store/users.selector';
import { Users } from '../store/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store,private appStore: Store<Appstate>,private router: Router) {}
  users$ = this.store.pipe(select(selectUsers));
  public hideRuleContent:boolean[] = [];
  onsaving : boolean = false;
  userForm: Users = {
    id: '',
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    birthDate: ''
  };
  //@ViewChild('eform') userForm : any;
 
  ngOnInit(): void {
    this.store.dispatch(invokeUsersAPI());
    
  }

  onEdit(id: number){
    console.log(id)
    this.hideRuleContent[id] = !this.hideRuleContent[id];
    let fetchData$ = this.store.pipe(select(selectUserById(id)));
      
    fetchData$.subscribe((data) => {
      if (data) {
        this.userForm = { ...data };
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  
  onSave() {
    this.onsaving = true;
    this.store.dispatch(
      invokeUpdateUserAPI({ updateUser: { ...this.userForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
