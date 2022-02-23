import React from 'react'
import FooterHome from '../../fragments/footer/Footer'
import Footer from '../../fragments/footer/FooterCover'
import styles from '../../../../css/UserHome.module.css';
import BackgroundHome from '../../fragments/background/BackgroundHome'
import { useState, useLayoutEffect } from 'react'
import OffersDataService from '../../../../api/hobby/OffersDataService'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const BusinessOwner = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        hobbies: []
    });

    const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });

    const handleSort = value => event => {
        event.preventDefault();
        let path = '/offer/' + value;
        navigate(path, { state: { id: value } });

    }



    useLayoutEffect(() => {
        let unmounted = false;

        OffersDataService().then(
            response => {
                if (!unmounted) {
                    setState(response.data);
                    setWelcomeDiv({ showDiv: false })
                }
                if (!Object.keys(response.data).length) {
                    setWelcomeDiv({ showDiv: true })
                }
            })
        return () => { unmounted = true };

    }, []);



    return (
        <>
            <BackgroundHome />
            <main className={styles.hobbie_main}>
                <section className={styles.hobbie_container_home}>

                    {state.length !== undefined && <section className={styles.cards}>
                        {state.map(hobby =>
                            <div key={hobby.id} className={styles.rapper}>
                                <Link to='#' onClick={handleSort(hobby.id)} className={styles.card} id={hobby.id}>
                                    <section className={styles.card_image_container}>
                                        <img src={hobby.profileImgUrl} alt='hobby' />
                                    </section>

                                    <section className={styles.card_content}>
                                        <p className={styles.card_title}>
                                            {hobby.name}
                                        </p>
                                        <div className={styles.card_info}>
                                            <p className={styles.text_medium}> Find out more...</p>
                                            <p className={styles.card_price}  >{hobby.price} CHF</p>
                                        </div>
                                    </section>
                                </Link>
                            </div>)
                        }
                    </section>}
                </section>

                {welcomeDiv.showDiv && <div>
                    <article className={styles.introduction_home}>
                        <div className={styles.intro_text}>
                            <p>You have no offers.</p>
                            <div className={styles.buttuns}>
                                <button className={styles.link} >
                                    <Link to='/create-offer' className={styles.btn}>Create Offer</Link>
                                </button>
                            </div>
                        </div>
                    </article>
                </div>}

            </main>
            {!welcomeDiv.showDiv && <FooterHome />}
            {welcomeDiv.showDiv && <Footer />}
        </>
    )

}

export default BusinessOwner
