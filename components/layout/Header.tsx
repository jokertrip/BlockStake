import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import React, {useEffect, useState} from "react";
import {AccountCircle} from "@mui/icons-material";
import ModalComponent from "../ModalComponent";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {ellipseAddress, getChainData} from "../../utils";
import {connect, disconnect} from "../../utils/web3";
import {walletSlice} from "../../store/reducers/WalletSIice";

const pages = ['networks', 'about', 'contacts'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const dispatch = useTypedDispatch()
    const { setWeb3Provider, resetWeb3Provider } = walletSlice.actions

    const walletAddress = useTypedSelector(state => state.walletReducer.address)
    const chainId = useTypedSelector(state => state.walletReducer.chainId)
    const walletProvider = useTypedSelector(state => state.walletReducer.provider)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
        <AppBar position="static" sx={{background: '#003462'}}>
            <Container maxWidth="xl">
                {modalIsOpen && <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal} />}
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        component="img"
                        sx={{height: 54, xs: 'flex', md: 'none'}}
                        alt="Logo"
                        src={'/assets/blockstake.png'}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Typography textAlign="center">{ellipseAddress(walletAddress)}{walletProvider? ' || ' : ''}{getChainData(chainId)?.name}</Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={connectWallet}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
