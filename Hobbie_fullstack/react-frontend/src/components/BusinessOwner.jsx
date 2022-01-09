import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import ImgThree from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/3.jpg'
import { useState, useLayoutEffect } from 'react'
import OffersDataService from '../api/hobby/OffersDataService'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DeleteHobbyService from '../api/hobby/DeleteHobbyService'

const BusinessOwner = () => {
    let navigate = useNavigate();

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
        <div className='hobby_details_page'>
            <img className="blueImg3" src={blueImg} alt="blueImg" />
            <img className="blueImg4" src={blueImg} alt="blueImg" />
            <div className={"hobbie-main"}>

                <div className={"hobbie-container-home"}>
                    <div className={"hobbie-home-content"}>
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
                                        <p>You have no offers. Plase fill in the form and create a new offer:.</p>
                                        <div className="cta">
                                            <button className="cta_second_s" >
                                                <Link to='/create-offer' className="cta_second">Create new offer...</Link>
                                            </button>
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

export default BusinessOwner
