import { combineReducers } from 'redux';

import userSlice, { IUserSliceState } from './UserSlice';
import cardSlice, { ICardSliceState } from './CardSlice';

export interface IApplicationState {
	userSlice: IUserSliceState;
	cardSlice: ICardSliceState;
}

export default combineReducers<IApplicationState>({
	userSlice,
	cardSlice
});
