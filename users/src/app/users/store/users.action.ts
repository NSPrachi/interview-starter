import { createAction, props } from '@ngrx/store';
import { Users } from './users';
 
export const invokeUsersAPI = createAction(
  '[Users API] Invoke Users Fetch API'
);
 
export const usersFetchAPISuccess = createAction(
  '[Users API] Fetch API Success',
  props<{ allUsers: Users[] }>()
);

export const invokeUpdateUserAPI = createAction(
    '[Users API] Inovke update user api',
    props<{ updateUser: Users }>()
);
   
export const updateUserAPISucess = createAction(
    '[Users API] update  user api success',
    props<{ updateUser: any }>()
);