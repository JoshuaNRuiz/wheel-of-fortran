import { useState } from 'react';
import { shuffleArray, areArraysEqual } from './helpers/functions';
import NameInput from './component/NameInput/NameInput';
import Wheel from './component/Wheel/Wheel';

import './App.css';
import Modal from './component/Modal/Modal';
import WinnerModal from './component/Modal/WinnerModal/WinnerModal';
import { useEffect } from 'react/cjs/react.development';

const App = () => {

    const [text, setText] = useState('')
    const [names, setNames] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);

    function handleChange(event) {
        const textArea = event.currentTarget;

        const text = textArea.value;
        setText(text)

        const names = text.split('\n');

        if (names[names.length - 1] === '') {
            names.forEach((name, index) => {
                names[index] = name.trim()
            });
            const formattedNames = names.filter(entry => entry !== '')
            shuffleArray(formattedNames);
            setNames(formattedNames);
        }
    }

    function showTimer() {
        setShowModal(false);
        let newArray = [...names];
        newArray.splice(winner.index, 1);
        setNames(newArray);
    }

    function respin() {
        setShowModal(false);
        setWinner(null);
    }

    useEffect(() => {
        if (winner !== null) setShowModal(winner.length !== 0)
    }, [winner])

    return (
        <div className="App">
            <div className='App__Title'>
                <span className='App__Title__Text'>WHEEL OF FORTRAN</span>
            </div>
            <div className='App__Body'>
                <Wheel diameter={500} names={names} setWinner={setWinner}/>
                <NameInput value={text} handleChange={handleChange} />
                {showModal && <WinnerModal name={winner.name} okCallback={showTimer} cancelCallback={respin} />}
            </div>
        </div>
    );
}

export default App;
