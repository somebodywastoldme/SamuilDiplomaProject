import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICardSliceState {
	currentCardId: number;
}

const initialState: ICardSliceState = {
	currentCardId: null
};

const CardSlice = createSlice({
	name: 'cardSlice',
	initialState,
	reducers: {
		setCard: (state, action: PayloadAction<number>) => {
			state.currentCardId = action.payload;
		}
	}
});

export const { setCard } = CardSlice.actions;

export { CardSlice };

export default CardSlice.reducer;