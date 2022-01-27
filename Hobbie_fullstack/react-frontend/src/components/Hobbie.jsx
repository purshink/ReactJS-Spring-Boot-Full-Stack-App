import React from 'react'
import AuthenticationService from '../api/hobby/AuthenticationService'
import FooterDetails from './FooterDetails'
import BackgroundHome from './BackgroundHome'
import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import HobbyDetailsDataService from '../api/hobby/HobbyDetailsDataService'
import useMediaQuery from '../hooks/useMediaQuery'
import styles from '../css/Hobbie.module.css'
import gallery_styles from '../css/Gallery.module.css'
import DeleteHobbyService from '../api/hobby/DeleteHobbyService'







const Hobbie = () => {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
    let navigate = useNavigate();
    const [error, setError] = useState(false);
    let params = useParams();
    let location = useLocation();





    const id = params.id;
    const [currentPage, setCurrentPage] = useState('01');

    const [hobby, setHobby] = useState({
        name: '',
        slogan: '',
        intro: '',
        description: '',
        price: '',
        profileImgUrl: '',
        galleryImgUrl1: '',
        galleryImgUrl2: '',
        galleryImgUrl3: '',
        contactInfo: ''
    })



    const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false })

    const handleDelete = hobby => async event => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete your profile?")) {
            const response = await DeleteHobbyService(hobby.id);
            console.log(response);
            if (response.status !== 201) {
                setError(true)
            } else {
                navigate("/")
            }
        }
    }

    const handleEdit = business => event => {
        event.preventDefault();
        let path = '/edit-offer'
        navigate(path, { state: { id: hobby.id, name: hobby.name, slogan: hobby.slogan, 
            intro: hobby.intro, description: hobby.description, price: hobby.price, 
            contactInfo: hobby.contactInfo, profileImgUrl: hobby.profileImgUrl, galleryImgUrl1: hobby.galleryImgUrl1,
            galleryImgUrl2: hobby.galleryImgUrl2, galleryImgUrl3: hobby.galleryImgUrl3} });
    }

   

    

   
    useEffect(() => {
        let unmounted = false;

        // const reloadCount = sessionStorage.getItem('reloadCount');
        // if(reloadCount < 2) {
        //   sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        //   window.location.reload();
        // } else {
        //   sessionStorage.removeItem('reloadCount');
        // }

        HobbyDetailsDataService(id).then(
            
            response => {
                if (!unmounted) {
                    setHobby(response.data);
                   console.log(response.data)
                    setWelcomeDiv({ showDiv: false })

                }
                if (!Object.keys(response.data).length) {
                    setWelcomeDiv({ showDiv: true })
                }
            })
        return () => { unmounted = true };

    }, []);

    const changePage = (page) => {
        setCurrentPage(page);
    }

    const isColumnBased = useMediaQuery('(max-width: 1600px)');

    const isColumnBasedSmaller = useMediaQuery('(max-width: 1000px)');
    const isColumnBasedSmall = useMediaQuery('(max-width: 900px)');




    return (

        <div className={styles.hobby_details_page}>
            <BackgroundHome />

            <div className={isColumnBasedSmall ? styles.hobbie_main_small : styles.hobbie_main}>
                {isColumnBasedSmall && <div> <span className={styles.hobbie_title_small}><b>{hobby.name}</b></span> <h4 className={styles.slogan_small}> {hobby.slogan} </h4></div>}
                <div className={isColumnBasedSmall ? styles.hobbie_container_small : styles.hobbie_container}>

                    {hobby !== undefined && <div className={isColumnBasedSmall ? styles.hobbie_content_small : styles.hobbie_content}>
                        {currentPage !== '03' && <div className={styles.hobbie_cover}  >

                            <img className={styles.hobbie_cover} src={hobby.profileImgUrl} alt="hiking" /></div>}
                        <div className={isColumnBasedSmall ? styles.hobbie_content_body_samll : styles.hobbie_content_body}>

                            {!isColumnBasedSmall && <div className={styles.hobbie_pages}>
                                <span onClick={() => changePage('01')} className={currentPage === '01' ? styles.hobbie_active : ""} >01</span>
                                <span onClick={() => changePage('02')} className={currentPage === '02' ? styles.hobbie_active : ""}>02</span>
                                <span onClick={() => changePage('03')} className={currentPage === '03' ? styles.hobbie_active : ""}>03</span>
                                <span onClick={() => changePage('04')} className={currentPage === '04' ? styles.hobbie_active : ""}>04</span>
                            </div>}

                            {isColumnBasedSmall && <div className={styles.hobbie_pages_horizontal}>
                                <span onClick={() => changePage('01')} className={currentPage === '01' ? styles.hobbie_active_small : styles.hobbie_small} >01</span>
                                <span onClick={() => changePage('02')} className={currentPage === '02' ? styles.hobbie_active_small : styles.hobbie_small}>02</span>
                                <span onClick={() => changePage('03')} className={currentPage === '03' ? styles.hobbie_active_small : styles.hobbie_small}>03</span>
                                <span onClick={() => changePage('04')} className={currentPage === '04' ? styles.hobbie_active_small : styles.hobbie_small}>04</span>
                            </div>}

                            <div className={styles.hobbie_lable}>
                                {!isColumnBasedSmall && <div> <span className={styles.hobbie_title}><b>{hobby.name}</b></span> <h4 className={styles.slogan}> {hobby.slogan} </h4></div>}
                                {currentPage === '01' && <div>
                                    <p> {hobby.intro} </p>
                                </div>}
                                {currentPage === '02' && <div>
                                    <p> {hobby.description} </p>
                                </div>}
                                {currentPage === '03' &&

                                    <div className={gallery_styles.gallery}>

                                        <div class={gallery_styles.row}>
                                            <div class={gallery_styles.column}>
                                                <img className={gallery_styles.img} src={hobby.profileImgUrl} />
                                                <img className={gallery_styles.img} src={hobby.galleryImgUrl1} />

                                            </div>

                                            <div class={gallery_styles.column}>
                                                <img className={gallery_styles.img} src={hobby.galleryImgUrl2} />
                                                <img className={gallery_styles.img} src={hobby.galleryImgUrl3} />
                                            </div>
                                        </div>
                                    </div>

                                }
                                {currentPage === '04' && <div>
                                    <p> {hobby.contactInfo} </p>
                                </div>}
                                {currentPage !== '03' && <div className={styles.buttons}>
                                    {isBusinessLoggedIn && <div> <Link to="#" onClick={handleEdit(hobby)} className={styles.btn}>Edit </Link>
                                        <Link to="#" onClick={handleDelete(hobby)} className={styles.btn}>Delete </Link> </div>}
                                    {isUserLoggedIn && <span className={styles.btn}>Save</span>}
                                </div>}
                            </div>



                        </div>
                    </div>}


                    {welcomeDiv.showDiv && <div>
                        <div className={styles.error_message}>
                            <div className={styles.error_text}>
                                <p> This hobby does not exist.</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <FooterDetails />

        </div>
    )
};


export default Hobbie
