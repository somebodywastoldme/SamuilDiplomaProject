import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '@models/User';

export interface IUserSliceState {
	user: User;
}

const initialState: IUserSliceState = {
	user: null
};

const UserSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		}
	}
});

export const { setUser } = UserSlice.actions;

export { UserSlice };

export default UserSlice.reducer;