import React, { FC, useState } from 'react';

import { HelpOutline } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import AreaButton from '../AreaButtons/AreaButton/AreaButton';
import Rules from '../Rules/Rules';

import './ModalRules.scss';

const ModalRules: FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AreaButton userClickHandler={handleOpen} icon={<HelpOutline />} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal-rules"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Rules />
                </Fade>
            </Modal>
        </>
    );
};

export default ModalRules;
