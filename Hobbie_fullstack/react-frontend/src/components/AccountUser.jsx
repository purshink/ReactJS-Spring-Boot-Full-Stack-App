import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundHome from './BackgroundHome'
import dancingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import styles from '../css/Account.module.css'
import layout from '../css/UserHome.module.css'
import Footer from './Footer'
import UserDataService from '../api/hobby/UserDataService'
import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import DeleteUserService from '../api/hobby/DeleteUserService'






const AccountUser = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const handleDelete = user =>  async event => {
        event.preventDefault();
        if(window.confirm("Are you sure you want to delete your profile?")){
        const response = await DeleteUserService(user.id);
        console.log(response);
        if (response.status !== 200) {
            setError(true)
        } else {
            navigate("/")
        }
    }
    }

    const handleEdit = user => event => {
        event.preventDefault();
        let path = '/edit-profile'
        navigate(path, { state: { id: user.id, gender:user.gender, fullName: user.fullName} });

    }

    useLayoutEffect(() => {
        let unmounted = false;

        UserDataService().then(
            response => {
                if (!unmounted) {
                    setUser(response.data);
                }

            })
        return () => { unmounted = true };


    }, []);
    return (<div>
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
                                    <p> Username: {user.username} </p>
                                    <p> Email: {user.email}</p>
                                    <p> Full Name: {user.fullName} </p>
                                    <p> Gender: {user.gender} </p>
                                    <p> Change password: **** </p>
                                    <br></br>
                                    <div className={styles.account_buttons}>
                                    <Link to="#" onClick={handleDelete(user)} className={styles.account_btn} >Delete profile</Link>
                                        <Link to="#" onClick={handleEdit(user)} className={styles.account_btn} >Edit profile</Link>
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

export default AccountUser
