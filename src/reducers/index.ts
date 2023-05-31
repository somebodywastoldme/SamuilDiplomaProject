import { combineReducers } from 'redux';

import userSlice, { IUserSliceState } from './UserSlice';

export interface IApplicationState {
	userSlice: IUserSliceState;
}

export default combineReducers<IApplicationState>({
	userSlice
});
