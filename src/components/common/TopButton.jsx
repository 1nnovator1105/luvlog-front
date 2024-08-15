import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleUp} from "@fortawesome/free-solid-svg-icons";

function TopButton() {
    const [display, setDisplay] = useState('none')

    useEffect(() => {
        return () => setDisplay('');
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
    }, [])

    const scrollHandler = () => {
        if (window.scrollY === 0) {
            setDisplay('none');
        } else if (window.scrollY > 50) {
            setDisplay('block');
        }
    }

    return (
        <div style={{display: display}}>
            <FontAwesomeIcon
                icon={faArrowCircleUp}
                color="white"
                className={'top-scroll-btn'}
                size="3x"
                onClick={() => window.scrollTo(0, 0)}
            />
        </div>
    )
}

export default TopButton;