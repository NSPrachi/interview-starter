import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { UsersService } from '../users.service';
import { usersFetchAPISuccess, invokeUsersAPI, invokeUpdateUserAPI, updateUserAPISucess, } from './users.action';
import { selectUsers } from './users.selector';

@Injectable()
export class UsersEffect {

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private store: Store,
        private appStore: Store<Appstate>
      ) {}

      loadAllUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(invokeUsersAPI),
        withLatestFrom(this.store.pipe(select(selectUsers))),
        mergeMap(([, userformStore]) => {
          if (userformStore.length > 0) {
            return EMPTY;
          }
          return this.usersService
            .get()
            .pipe(map((data) => usersFetchAPISuccess({ allUsers: data })));
        })
      )
    );

    updateUserAPI$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(invokeUpdateUserAPI),
          switchMap((action) => {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            return this.usersService.update(action.updateUser).pipe(
              map((data) => {
                this.appStore.dispatch(
                  setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                  })
                );
                return updateUserAPISucess({ updateUser: data });
              })
            );
          })
        );
      });
}
