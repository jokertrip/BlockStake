import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";
import {WalletLink} from "walletlink";
import { providers } from 'ethers'

const INFURA_ID = 'b5fe4148878241d488e16a657d38ddf6'

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID
        },
    },
    'custom-walletlink': {
        display: {
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
            name: 'Coinbase',
            description: 'Connect to Coinbase Wallet',
        },
        options: {
            appName: 'Blockstake',
            networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
            chainId: 1,
        },
        package: WalletLink,
        connector: async (_: any, options: any) => {
            const { appName, networkUrl, chainId } = options
            const walletLink = new WalletLink({
                appName,
            })
            const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
            await provider.enable()
            return provider
        },
    },
}

export const web3 = () => {
    let web3Modal
    if (typeof window !== 'undefined') {
        web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            providerOptions,
        })
    }
    return web3Modal
}

export const connect = async () => {
    try {
        const _web3 = web3()
        if(!_web3) return
        const provider = await _web3.connect()
        const web3Provider = new providers.Web3Provider(provider)

        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()

        const network = await web3Provider.getNetwork()

        return { provider, web3Provider, address, network}
    } catch(e){
        console.log(e)
    }
}

export const disconnect = async (walletProvider: any) => {
    try {
        const _web3 = web3()
        if(!_web3) return
        await _web3.clearCachedProvider()
        if (walletProvider?.disconnect && typeof walletProvider.disconnect === 'function') {
            await walletProvider.disconnect()
        }
    } catch(e){
        console.log(e)
    }
}
