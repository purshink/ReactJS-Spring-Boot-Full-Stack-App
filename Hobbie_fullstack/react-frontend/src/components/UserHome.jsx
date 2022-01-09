import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import HobbyDataService from '../api/hobby/HobbyDataService'
import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


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
        <div className='hobby_details_page'>
            <img className="blueImg3" src={blueImg} alt="blueImg" />
            <img className="blueImg4" src={blueImg} alt="blueImg" />
            <div className="hobbie-main">

                <div className="hobbie-container-home">
                    <div className="hobbie-home-content">

                        <div >
                        </div>

                        <div>

                            <div className="user_home">
                                {state.length !== undefined && <section className="cards">
                                    {state.map(hobby =>

                                        <Link to='#' onClick={handleSort(hobby.id)} className="card" key={hobby.id} id={hobby.id}>
                                            <div className="card_image-container">
                                                <img src={hobby.profileImgUrl} alt="Hobby picture" />
                                            </div>

                                            <div className="card_content">
                                                <p className="cart_title text_medium">
                                                    {hobby.name}
                                                </p>
                                                <div className="card_info">
                                                    <p className="text_medium">Find out more...</p>
                                                    <p className="card_price text_medium">{hobby.price} CHF</p>

                                                </div>
                                            </div>
                                        </Link>)
                                    }
                                </section>}
                            </div>

                            {welcomeDiv.showDiv && <div>
                                <div className="introduction-home">
                                    <div className="intro-text">
                                        <p> You have no hobby matches.</p>
                                        <div className="cta">
                                            <button className="cta_second_s" ><Link to='/test' className="cta_second">Take the test</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer-hobbie-details">
                &copy; Hobbie 2021. All rights reserved.
            </footer>
        </div>

    )

}



export default UserHome
