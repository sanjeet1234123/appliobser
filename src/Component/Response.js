import React, { useState, useEffect } from 'react';

const Response = ({ message }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timer;

        if (message && currentIndex < message.length) {
            timer = setTimeout(() => {
                setDisplayedText(prevText => prevText + message[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 70);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex, message]);

    return (
        <div className='response'>
            <p>{displayedText}</p>
        </div>
    );
};

export default Response;
