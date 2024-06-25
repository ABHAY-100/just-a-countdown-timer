import React, { useState, useEffect } from 'react';

const App = () => {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        const startTimeString = "2024-06-06T20:00:00"; // Start time in UTC
        const durationInMilliseconds = 480 * 60 * 60 * 1000;

        const startTime = new Date(startTimeString);
        const endTime = startTime.getTime() + durationInMilliseconds;

        const updateCountdown = () => {
            const now = new Date().getTime();

            if (now >= endTime) {
                setHours('00');
                setMinutes('00');
                setSeconds('00');
                return;
            }

            const remainingTime = endTime - now;

            const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            setHours(String(remainingHours).padStart(2, '0'));
            setMinutes(String(remainingMinutes).padStart(2, '0'));
            setSeconds(String(remainingSeconds).padStart(2, '0'));
        };

        const intervalId = setInterval(updateCountdown, 1000);

        // Initial update when component mounts
        updateCountdown();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='container'>
            <div className="display-time">
                <span className='span-element'>{hours}</span>
                <span> : </span>
                <span className='span-element'>{minutes}</span>
                <span> : </span>
                <span className='span-element'>{seconds}</span>
            </div>
        </div>
    );
};

export default App;
