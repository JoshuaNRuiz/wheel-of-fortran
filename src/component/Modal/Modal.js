import React from 'react';

import './Modal.css';

const Modal = (props) => {

    const { primary, secondary, buttons} = props;

    const primaryContainer = (
        <div className='Modal__PrimaryContainer'>
            {primary}
        </div>
    )

    const secondaryContainer = (
        <div className='Modal__SecondaryContainer'>
            <span className="Secondary__Container__Value">{secondary?.value}</span>
        </div>
    )

    const buttonContainer = (
        <div className='Modal__ButtonContainer'>
            {buttons?.map((button, index) => {
                const {text, callback} = button;
                return <button key={text + index} className='Modal__Button' onClick={callback}>{text}</button>
            })}
        </div>
    );

    return (
        <div className={`Modal`}>
            {primary && primaryContainer}
            {secondary && secondaryContainer}
            {buttons && buttonContainer}
        </div>
    )
}

export default Modal;
