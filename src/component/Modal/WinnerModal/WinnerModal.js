import React from 'react';
import Modal from '../Modal';

import './WinnerModal.css'

const WinnerModal = (props) => {

    const { name, okCallback, cancelCallback } = props

    const buttons = [
        {
            text: 'OK',
            callback: okCallback
        },
        {
            text: 'RESPIN',
            callback: cancelCallback
        },
    ]

    const nameComponent = (
        <div className='WinnerModal__NameDisplay'>
            <span className='WinnerModal__NameDisplay__Text'>next:</span>
            <span className='WinnerModal__NameDisplay__Name'>{name}</span>
        </div>
    )

    return (
        <Modal primary={nameComponent} buttons={buttons}/>
    );
};

export default WinnerModal;
