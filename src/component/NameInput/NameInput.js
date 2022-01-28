import React from 'react';
import './NameInput.css'

const NameInput = (props) => {

    const { value, handleChange, count } = props;

    return (
        <div className='NameInput'>
            <div className='NameInput__Header'>
                <span className='NameInput__Header__Text'>names</span>
            </div>
            <textarea
                className='NameInput__TextArea'
                rows={15}
                wrap='soft'
                onChange={handleChange}
                value={value} />
        </div>
    )
}

export default NameInput;
