import Modal from "react-modal";
import React from "react";
import {Box, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const customStyles = {
    content: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 250,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 20,
        textAlign: 'center',
    },
    overlay: {zIndex: 1000}
};

const useStyles = makeStyles({
    wallets: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    box: {
        backgroundColor: 'gray',
        borderRadius: 20,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

type ModelProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
}

const ModalComponent = ({modalIsOpen, closeModal}: ModelProps) => {
    const classes = useStyles();

    return (
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={closeModal}
        >
            <div className={classes.wallets}>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h2" >
                        Metamask
                    </Typography>
                </Box>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h2" >
                        Wallet Connect
                    </Typography>
                </Box>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h2" >
                        Coinbase Wallet
                    </Typography>
                </Box>
            </div>
        </Modal>
    )
}

export default ModalComponent
