import React from "react"

// hooks
import { useSound } from "metalib/common/hooks/";


// config
import { env } from 'config/'

// context
import { usePlayer } from 'metaeditor/context/';



function withIntro() {
    const player = usePlayer()

    const soundIntro = useSound(env.staticPath('sounds', 'intro.mp3'))
    const [mounted, setMounted] = React.useState(false)
    // const [windowActive, setWindowActive] = React.useState(false)


    // React.useEffect(() => {

    //     const focusDetecter = (active) => (event) => {
    //         // console.error('focusDetecter', active);
    //         setWindowActive(active)
    //     }

    //     window.addEventListener('focus', focusDetecter(true));
    //     window.addEventListener('blur', focusDetecter(false));

    //     return () => {
    //         window.removeEventListener('focus', focusDetecter(true));
    //         window.removeEventListener('blur', focusDetecter(false));
    //     }

    // }, [])

    React.useEffect(() => {

        if (!mounted && player.state.loaded && player.state.volume) {
            soundIntro.play()
            setMounted(true)
        }

    }, [player.state.loaded])
}

export default withIntro