
import React from "react";
import { Link } from 'react-router-dom';

const Presentation = () => {
    return (

        <section className="presentation">

            <div className="introduction">
                <div className="intro-text">
                    <h1>Ready to have fun?</h1>
                    <p>Find out the best activities for you in your area. Take our personalised test and help us help you discover your new passion.</p>
                </div>
                <div className="cta">

                    <button className="cta_second" method="POST">
                        <Link to='signup' className="cta_second">Sign up</Link>
                    </button>

                </div>
            </div>

        </section>




    )
}

export default Presentation
