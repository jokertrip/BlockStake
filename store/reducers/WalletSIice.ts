import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface WalletState {
    address: string
}

const initialState: WalletState = {
    address: ''
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletAddress(state, action: PayloadAction<string>){
            state.address = action.payload
        }
    }
})

export default walletSlice.reducer
