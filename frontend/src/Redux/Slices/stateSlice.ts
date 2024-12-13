import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TweetState {
    value: string;
}

const initialState: TweetState = {
    value: "All Notes"
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        resetState: (state) => {
            state.value = "All Notes";
        }
    }
});

export const { setNotes, resetState } = stateSlice.actions;
export default stateSlice.reducer;
