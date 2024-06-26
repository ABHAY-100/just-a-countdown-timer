import React, { useEffect, useState } from "react";

const App = () => {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        const startTimeString = "2024-06-26T02:05:00"; // Start time in UTC
        const startTime = new Date(startTimeString);

        const durationInMilliseconds = 7 * 60 * 60 * 1000; // Duration in milliseconds
        const endTime = startTime.getTime() + durationInMilliseconds;

        const updateCountDown = () => {
            const now = new Date().getTime();

            if(now >= endTime){
                setHours('00');
                setMinutes('00');
                setSeconds('00');
                return;
            }

            const distance = endTime - now;

            const remainingHours = Math.floor(distance / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((distance % (1000 * 60)) / (1000));

            setHours(String(remainingHours).padStart(2, '0'));
            setMinutes(String(remainingMinutes).padStart(2, '0'));
            setSeconds(String(remainingSeconds).padStart(2, '0'));
        }
        const intervalID = setInterval(updateCountDown, 1000);

        updateCountDown();

        return () => clearInterval(intervalID);
    },[]);

    return (
        <div className="container">
            <span className="span-element">{hours}</span>
            <span> : </span>
            <span className="span-element">{minutes}</span>
            <span> : </span>
            <span className="span-element">{seconds}</span>
        </div>
    )
}

export default App;
