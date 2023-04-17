import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/users.effect';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    StoreModule.forFeature('myusers', userReducer),
    EffectsModule.forFeature([UsersEffect])
  ]
})
export class UsersModule { }
