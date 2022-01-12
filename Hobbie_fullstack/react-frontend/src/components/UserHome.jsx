import React from 'react'
import BackgroundHome from './BackgroundHome'
import HobbyDataService from '../api/hobby/HobbyDataService'
import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FooterHome from './FooterHome'
import styles from '../css/UserHome.module.css'

const UserHome = () => {

    let navigate = useNavigate();

    const [state, setState] = useState({
        hobbies: []
    })

    const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false })

    const handleSort = value => event => {
        event.preventDefault();
        let path = '/hobbie/' + value;
        navigate(path, { state: { id: value } });

    }



    useLayoutEffect(() => {
        let unmounted = false;

        HobbyDataService().then(
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
        <div className={styles.hobby_details_page}>
        <BackgroundHome/>
            <div className={styles.hobbie_main}>

                <div className={styles.hobbie_container_home}>
                    <div className={styles.hobbie_home_content}>
                        <div>
                            <div className={styles.user_home}>
                                {state.length !== undefined && <section className={styles.cards}>
                                    {state.map(hobby =>

                                        <Link to='#' onClick={handleSort(hobby.id)} className={styles.card} key={hobby.id} id={hobby.id}>
                                            <div className={styles.card_image_container}>
                                                <img src={hobby.profileImgUrl} alt="Hobby picture" />
                                            </div>

                                            <div className={styles.card_content}>   
                                                <p className={styles.card_title}>
                                                    {hobby.name}
                                                </p>
                                                <div className={styles.card_info}>
                                                    <p className={styles.text_medium}> Find out more...</p>
                                                    <p className={styles.card_price}  >{hobby.price} CHF</p>
                                                </div>
                                            </div>
                                        </Link>)
                                    }
                                </section>}
                            </div>

                            {welcomeDiv.showDiv && <div>
                                <div className={styles.introduction_home}>
                                    <div className={styles.intro_text}>
                                        <p>You have no offers. Plase fill in the form and create a new offer:.</p>
                                        <div className={styles.buttuns}>
                                            <button className={styles.link} >
                                                <Link to='/test' className={styles.btn}>Take the test</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome/>
        </div>
    )

}



export default UserHome
