import React from 'react'
import BackgroundCover from './BackgroundCover'
import Presentation from './Presentation'
import Cover from './Cover'
import { FooterCover } from './FooterCover'






const Home = () => {


    return (
        <div>
            <Presentation />
             <Cover/>
             <FooterCover/>
             <BackgroundCover/>
        </div>
    )
}



export default Home
