import { createReducer, on } from '@ngrx/store';
import { Users } from "../store/users";

import { usersFetchAPISuccess,updateUserAPISucess } from './users.action';
 
export const initialState: ReadonlyArray<Users> = [];
 
export const userReducer = createReducer(
    initialState,
    on(usersFetchAPISuccess, (state, { allUsers }) => {
        return allUsers;
    }),
    on(updateUserAPISucess, (state, { updateUser }) => {
        let newState = state.filter((_) => _.id != updateUser.id);
        newState.unshift(updateUser);
        return newState;
    })
);
