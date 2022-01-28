import React, { useEffect, useRef, useState } from 'react';
import './Wheel.css'
import logo from "../../assets/images/logo.png"

const Wheel = (props) => {

    const { diameter, names, setWinner} = props;

    const [isSpinning, setIsSpinning] = useState(false);

    const canvasReference = useRef(null);
    const canvasContext = useRef(null);
    const arcAngle = useRef(null);

    const radius = diameter / 2;
    const friction = 0.98;
    const random = (min, max) => (Math.random() * (max - min)) + min;

    let angle = 0;
    let angleVelocity = 0;

    useEffect(drawWheel, [names, diameter])

    function drawWheel() {
        console.log("drawWheel() called")
        if (!names) return;
        canvasContext.current = canvasReference.current.getContext('2d');
        arcAngle.current = arcAngle.current = (2 * Math.PI) / (names.length <= 0 || names.length);

        const ctx = canvasContext.current;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        if (names?.length > 0) {
            names.forEach(drawSector);
        } else {
            ctx.save();
            drawBackground('#FFFFFF', 360, false);
            ctx.restore();
        }
    }

    function drawSector(name, index) {
        const ctx = canvasContext.current;
        const angle = arcAngle.current * index;
        const backgroundColor = "#FFFFFF"
        const textColor = "#005EAD";

        const shouldUseStroke = names.length > 1;

        ctx.save();
        drawBackground(backgroundColor, angle, shouldUseStroke);
        drawText(name, textColor, angle)
        ctx.restore();
    }

    function drawBackground(color, angle, shouldUseStroke = true) {
        const ctx = canvasContext.current;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + arcAngle.current);
        ctx.lineTo(radius, radius);
        ctx.fill();
        ctx.strokeStyle = "#005EAD";
        ctx.lineWidth = 2;
        if (shouldUseStroke) ctx.stroke();
    }

    function drawText(text, color, angle) {
        const ctx = canvasContext.current;
        ctx.translate(radius, radius);
        ctx.rotate(angle + arcAngle.current / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.font = "bold 22px sans-serif";
        const formattedText = text.toUpperCase();
        ctx.fillText(formattedText, radius / 2 + 15, 10);
    }

    function spinWheel() {
        if (!isSpinning && names.length > 0) {
            setIsSpinning(true);
            engine();
            angleVelocity = random(0.5, 0.75);
        }
    }

    function engine() {
        frame();
        requestAnimationFrame(engine);
    }

    function frame() {
        if (!angleVelocity) return;

        angleVelocity *= friction;
        if (angleVelocity < 0.002) angleVelocity = 0;
        angle += angleVelocity;
        angle %= (2 * Math.PI);

        if (angleVelocity === 0 && names) {
            setIsSpinning(false);
            setWinner(getResult);
        } else {
            rotateCanvas();
        }
    }

    function rotateCanvas() {
        const ctx = canvasContext.current;
        ctx.canvas.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
    }

    function getResult() {
        const numberOfSections = names.length;
        const index = Math.floor(numberOfSections - (angle / (2 * Math.PI) * numberOfSections)) % numberOfSections;
        return {
            name: names[index],
            index: index
        }
    }

    return (
        <div className='WheelContainer'>
            <canvas className='Wheel' ref={canvasReference} width={diameter} height={diameter} />
            <div className='Spinner' onClick={spinWheel}>
                <img className='Spinner__Image' src={logo} alt='spin button'></img>
            </div>
            <div></div>
        </div>
    )
}

export default Wheel;
