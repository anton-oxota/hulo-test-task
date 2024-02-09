import React from 'react'
import './Slider.scss'

import Player from '@vimeo/player'

function Slider({ children, itemsInSlide = 1 }) {
    const numberOfSlides = Math.ceil(children.length / itemsInSlide);

    const sliderRef = React.useRef();
    const [sliderWidth, setSliderWidth] = React.useState(null);

    const [currentSlide, setCurrentSlide] = React.useState(0);

    const [isPopupActive, setIsPopupActive] = React.useState(false);

    const [selectedVideoId, setSelectedVideoId] = React.useState(null);
    const [selectedVideoElement, setSelectedVideoElement] = React.useState(null);
    const [currentPlayer, setCurrentPlayer] = React.useState(null);

    React.useEffect(() => {
        const iframe = document.querySelectorAll('iframe');
        iframe.forEach((item, index) => {
            const player = new Player(item);
            player.on('play', () => {
                player.pause()
                    .then(() => {
                        setSelectedVideoId(index);
                        setIsPopupActive(true)
                    })
            })
        })
    }, [])

    React.useEffect(() => {
        if (selectedVideoId !== null) {
            setSelectedVideoElement(React.cloneElement(children[selectedVideoId], { popur: true }))
        }
    }, [selectedVideoId])

    React.useEffect(() => {
        if (selectedVideoElement !== null) {

            const popupVideoElement = document.querySelector('[data-popup="true"]');
            const player = new Player(popupVideoElement);
            setCurrentPlayer(player)

            player.on('loaded', () => {
                player.play()
            })
        }
    }, [selectedVideoElement])


    React.useLayoutEffect(() => {
        const sliderWidth = sliderRef.current?.clientWidth;
        setSliderWidth(sliderWidth)
    }, [])

    function init() {
        const childrenCopy = Array.from(children)

        const content = [];

        // content.push(<div className="slider__slide">
        //     {childrenCopy.splice(0, 4)}
        // </div>)

        for (let i = 0; i < numberOfSlides; i++) {
            content.push(
                <div
                    className="slider__slide"
                    key={i}
                    style={{
                        width: sliderWidth,
                        gridTemplateColumns: `repeat(${itemsInSlide}, 1fr)`
                    }}>
                    {childrenCopy.splice(0, 4)}
                </div>
            )
        }
        return content
    }

    function initDots() {
        const content = [];

        for (let i = 0; i < numberOfSlides; i++) {
            content.push(
                <button
                    className={`slider__dot ${i === currentSlide ? 'active' : ''}`}
                    key={i}
                    onClick={() => { changeCurrentSlide(i); setCurrentSlide(i) }}>
                    {i + 1}</button>
            )
        }

        return content
    }

    function initPopupDots() {
        const content = [];

        for (let i = 0; i < children.length; i++) {
            content.push(
                <button
                    className={`slider__dot ${i === selectedVideoId ? 'active' : ''}`}
                    key={i}
                    onClick={() => {
                        setCurrentSlide(Math.floor(i / itemsInSlide))
                        setSelectedVideoId(i)
                    }}>
                    {i + 1}</button>
            )
        }

        return content
    }

    function changeCurrentSlide(number) {
        if (number >= 0 && number < numberOfSlides) {
            setCurrentSlide(number);
        }
    }

    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider__window">
                <div
                    className="slider__inner"
                    style={{
                        width: `${numberOfSlides * sliderWidth}px`,
                        transform: `translateX(-${currentSlide * sliderWidth}px)`,
                    }}>
                    {init()}
                </div>
            </div>

            <div className="slider__buttons">
                <button
                    className='slider__button prev'
                    onClick={() => { changeCurrentSlide(currentSlide - 1) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 477.175 477.175" >
                        <g>
                            <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                        </g>
                    </svg>
                </button>
                <button
                    className='slider__button next'
                    onClick={() => { changeCurrentSlide(currentSlide + 1) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 477.175 477.175" >
                        <g>
                            <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " />
                        </g>
                    </svg>
                </button>
            </div>

            <div className="slider__dots">
                {initDots()}
            </div>

            <div className={`popup ${isPopupActive ? 'active' : ''}`}
                onClick={(e) => {
                    if (e.target.matches('.popup')) {
                        setIsPopupActive(false)
                    }
                }}>
                <div className="popup__content">
                    {selectedVideoElement}
                </div>
                <div className="popup__dots">
                    {initPopupDots()}
                </div>
                <button
                    className='popup__close'
                    onClick={() => {
                        setIsPopupActive(false);
                        currentPlayer.pause();
                        setSelectedVideoId(null);
                        setSelectedVideoElement(null);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000" /></svg>
                </button>
            </div>
        </div>
    )
}

export default Slider