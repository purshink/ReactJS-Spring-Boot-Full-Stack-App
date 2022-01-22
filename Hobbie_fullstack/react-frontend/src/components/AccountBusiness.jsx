import React from 'react'
import BackgroundHome from './BackgroundHome'
import dancingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import styles from '../css/Account.module.css'
import layout from '../css/UserHome.module.css'
import Footer from './Footer'
import BusinessDataService from '../api/hobby/BusinessDataService'
import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AccountBusiness = () => {
let navigate = useNavigate();
const [business, setBusiness] = useState([]);

const handleSort = business => event => {
    event.preventDefault();
    let path = '/edit-business-profile'
    navigate(path, { state: { id: business.id,   businessName:business.businessName, address: business.address} });

}

useLayoutEffect(() => {
    let unmounted = false;

    BusinessDataService().then(
        response => {
            if (!unmounted) {
                setBusiness(response.data);
            }
     
        })
    return () => { unmounted = true };

}, []);
    return (
        <div>
            <div className={layout.hobbie_main}>
                <div className={layout.hobbie_container_home}>
                    <div className={styles.account_main}>
                        <div className={styles.account_container}>
                            <img className={styles.account_cover} src={dancingImg} alt="dancing" />
                            <div className={styles.account_content}>
                                <div className={styles.account_content_body}>
                                    <div className={styles.account_label}>
                                        <span className={styles.account_title}><b>Account info</b></span>
                                        <hr className={styles.account_hr}></hr>
                                        <br></br>
                                        <p>Username: {business.username} </p>
                                        <p>Email: {business.email}  </p>
                                        <p>Business name: {business.businessName}  </p>
                                        <p>Business address: {business.address}  </p>
                                        <p>Change password: **** </p>
                                        <br></br>
                                        <div className={styles.account_buttons}>
                                            <a className={styles.account_btn} >Delete profile</a>
                                            <Link to="#" onClick={handleSort(business)} className={styles.account_btn} >Edit profile</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <BackgroundHome />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AccountBusiness


