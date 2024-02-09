import React from "react";
import Player from "@vimeo/player"


function useVimeoVideo(url, playerId) {
    const [player, setPlayer] = React.useState(null)
    console.log(playerId)
    console.log(url)

    React.useEffect(() => {
        // const iframe = document.querySelector(`[data-player-id='${playerId}']`);
        // console.log(iframe);
        // setPlayer(new Player(iframe))
    }, [])

    const element = <iframe src={url} data-player-id={playerId} frameBorder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowFullScreen></iframe>
    return [element, player]
}

export default useVimeoVideo