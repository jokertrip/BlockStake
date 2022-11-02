import type { NextPage } from 'next'
import React, {Fragment, useEffect, useState} from "react";
import {Button, Paper, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from 'react-material-ui-carousel';
import {NETWORKS, NetworkType} from "../utils/network";
import ModalComponent from "../components/ModalComponent";
import {connect, disconnect, web3} from "../utils/web3";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux";
import {walletSlice} from "../store/reducers/WalletSIice";

const useStyles = makeStyles({
    sec: {
        position: "absolute",
        top: "30%",
        left: "10%",
        color: "#fff"
    }
});

type ItemProps = NetworkType & {
    openModal: () => void
}

const Item = ({name, img, openModal} : ItemProps) => {
    const classes = useStyles();
    return (
        <Paper sx={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', position: "relative", width: "100%", height: "100%", zIndex: 1}}>
            <div className={classes.sec}>
                <Typography variant="h3">{name}</Typography>

                <Button
                    sx={{
                        ":hover": {
                            color: "white"
                        },
                        background: '#003462'
                    }}
                    color="info"
                    variant="contained"
                    className="CheckButton"
                    onClick={openModal}
                >
                    Stake now
                </Button>
            </div>
        </Paper>
    );
};

const Home: NextPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const walletProvider = useTypedSelector(state => state.walletReducer.provider)
    const dispatch = useTypedDispatch()
    const { setWalletAddress, setWeb3Provider, resetWeb3Provider } = walletSlice.actions

    useEffect(() => {
        const connectFunc = async () => {
            const _web3 = web3()
            if (_web3 && _web3.cachedProvider) {
                try{
                    const { provider, web3Provider, address, network } = await connect()
                    dispatch(setWeb3Provider({provider, web3Provider, address, chainId: network.chainId}))
                }catch(e){
                 console.log(e)
                }
            }
        }
        connectFunc()
    }, [])

    useEffect(() => {
        if (walletProvider?.on) {
            const handleAccountsChanged = (accounts: string[]) => {
                dispatch(setWalletAddress(accounts[0]))
            }

            const handleChainChanged = (_hexChainId: string) => {
                window.location.reload()
            }

            const handleDisconnect = (error: { code: number; message: string }) => {
                disconnect(walletProvider)
                dispatch(resetWeb3Provider())
            }

            walletProvider.on('accountsChanged', handleAccountsChanged)
            walletProvider.on('chainChanged', handleChainChanged)
            walletProvider.on('disconnect', handleDisconnect)

            return () => {
                if (walletProvider.removeListener) {
                    walletProvider.removeListener('accountsChanged', handleAccountsChanged)
                    walletProvider.removeListener('chainChanged', handleChainChanged)
                    walletProvider.removeListener('disconnect', handleDisconnect)
                }
            }
        }
    }, [walletProvider])

    const connectWallet = async () => {
        if(walletProvider){
            try{
                await disconnect(walletProvider)
                dispatch(resetWeb3Provider())
            }catch(e){
                console.log(e)
            }
        } else{
            try{
                const { provider, web3Provider, address, network } = await connect()
                dispatch(setWeb3Provider({provider, web3Provider, address, chainId: network.chainId}))
            }catch(e){
                console.log(e)
            }
        }
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <Fragment>
            {modalIsOpen && <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal} />}
            <Carousel height={700} >
                {NETWORKS.map((item, i) => (
                    <Item key={i} {...item} openModal={connectWallet} />
                ))}
            </Carousel>
        </Fragment>
    );
}

export default Home
