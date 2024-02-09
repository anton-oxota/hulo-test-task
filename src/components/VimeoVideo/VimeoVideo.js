import Player from '@vimeo/player';
import React from 'react'

function VimeoVideo({
    videoUrl,
    id,
    popur = false
}) {

    return (
        <iframe
            className='video'
            src={`${videoUrl}?muted=1`}

            height={200}
            width={200}
            data-player-id={id}
            data-popup={popur ? 'true' : 'false'}
            frameBorder="0"
            webkitallowfullscreen='true'
            mozallowfullscreen='true'
            allowFullScreen></iframe>
    )
}

export default VimeoVideo