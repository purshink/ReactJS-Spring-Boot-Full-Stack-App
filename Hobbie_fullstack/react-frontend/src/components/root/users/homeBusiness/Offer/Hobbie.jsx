import React from 'react'
import FooterDetails from '../../../fragments/footer/FooterDetails'
import BackgroundHome from '../../../fragments/background/BackgroundHome'
import HobbiePages from './HobbiePages'
import useMediaQuery from '../../../../../hooks/useMediaQuery'
import styles from '../../../../../css/Hobbie.module.css';
import 'react-confirm-alert/src/react-confirm-alert.css';




const Hobbie = () => {

    const isColumnBasedSmall = useMediaQuery('(max-width: 900px)');

    return (
        <>

                <main className={isColumnBasedSmall ? styles.hobbie_main_small : styles.hobbie_main}>
                    <HobbiePages />
                    <BackgroundHome />
                </main>

            <FooterDetails />
        </>
    )
};


export default Hobbie
