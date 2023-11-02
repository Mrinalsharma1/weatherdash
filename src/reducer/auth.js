import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: {},
}

export const authState = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        updateAuthState: (state, action) => {
            state.auth = action.payload;
        }
    },
})

export const { updateAuthState } = authState.actions
export default authState.reducer