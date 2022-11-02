import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface WalletState {
    provider: any
    web3Provider: any
    address: string
    chainId?: number
}

const initialState: WalletState = {
    provider: undefined,
    web3Provider: undefined,
    address: '',
    chainId: undefined,
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWeb3Provider(state, action: PayloadAction<WalletState>){
            state.provider = action.payload.provider
            state.web3Provider = action.payload.web3Provider
            state.address = action.payload.address
            state.chainId = action.payload.chainId
        },
        setWalletAddress(state, action: PayloadAction<string>){
            state.address = action.payload
        },
        setChainID(state, action: PayloadAction<number>){
            state.chainId = action.payload
        },
        resetWeb3Provider(state){
            Object.assign(state, initialState)
        }
    }
})

export default walletSlice.reducer
