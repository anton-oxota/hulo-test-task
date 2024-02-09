import React from 'react';
import './App.scss';
import Slider from './components/Slider/Slider';
import VimeoVideo from './components/VimeoVideo/VimeoVideo'


function App() {

    const data = [
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 0
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 1
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 2
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 3
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 4
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 5
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 6
        },
        {
            url: 'https://player.vimeo.com/video/824804225',
            id: 7
        },
    ]

    const [isWarningActive, setIsWarningActive] = React.useState(false)
    const [isPulseInfo, setIsPulseInfo] = React.useState(true)

    return (
        <div className="App">
            <Slider itemsInSlide={4}>
                {data.map((item, index) => {
                    return <VimeoVideo key={index} videoUrl={item.url} id={item.id} />
                })}
            </Slider>

            <button
                className='info'
                style={{
                    animationName: isPulseInfo ? 'pulse' : '',
                }}
                onClick={() => {
                    setIsWarningActive(true);
                    setIsPulseInfo(false)
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M12 7.00999L12 7M12 17L12 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className={`warning ${isWarningActive ? 'active' : ''}`}>
                <div className="warning__content">

                    <div className="warning__title">warning</div>
                    <div className="warning__text">
                        Привіт.
                        <br />
                        Це тестове завдання для вакансії Junior Front-end developer - Hulo.dev.

                        <br /><br />
                        Проєкт зроблений на React за наступних причин:
                        <br />
                        1) В тестовому завданні немає уточнення по стеку технологій
                        <br />
                        2) Через відсутність бодай якихось нормальних бібліотек для Vimeo на Реакті, і специфіку ініціалізації плеєра, мені здалось, що це буде складніше реалізувати, а отже цікавіше.
                        <br /><br />
                        Дякую за увагу.
                    </div>
                    <button className="warning__close"
                        onClick={() => { setIsWarningActive(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
