import type { NextPage } from 'next'
import React, {Fragment, useState} from "react";
import Modal from 'react-modal';
import {Button, Paper, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from 'react-material-ui-carousel';
import {NETWORKS, NetworkType} from "../utils/network";
import ModalComponent from "../components/ModalComponent";

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

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <Fragment>
            {modalIsOpen && <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal} />}
            <Carousel height={700} >
                {NETWORKS.map((item, i) => (
                    <Item key={i} {...item} openModal={openModal} />
                ))}
            </Carousel>
        </Fragment>
    );
}

export default Home
