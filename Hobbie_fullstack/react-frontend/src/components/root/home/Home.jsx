import React from 'react'
import BackgroundCover from './BackgroundCover'
import Presentation from './Presentation'
import Cover from './Cover'
import { FooterCover } from '../fragments/footer/FooterCover';






const Home = () => {


    return (
        <main>
            <Presentation />
             <Cover/>
             <FooterCover/>
             <BackgroundCover/>
        </main>
    )
}



export default Home
