import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import { useState, useLayoutEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import HobbyDetailsDataService from '../api/hobby/HobbyDetailsDataService'
import useMediaQuery from '../hooks/useMediaQuery'



const Hobbie = () => {
    let navigate = useNavigate();
    let params = useParams();

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



    useLayoutEffect(() => {
        let unmounted = false;

        HobbyDetailsDataService(id).then(
            response => {
                if (!unmounted) {
                    setHobby(response.data);
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
    const isColumnBasedSmall = useMediaQuery('(max-width: 810px)');




    return (

        <div className='hobby_details_page'>

            <img className="blueImg3" src={blueImg} alt="blueImg" />
            <img className="blueImg4" src={blueImg} alt="blueImg" />

            <div className={isColumnBasedSmall ? "hobbie-main-small" : "hobbie-main"}>
                {isColumnBasedSmall && <div> <span className="hobbie-title-small"><b>{hobby.name}</b></span> <h4 className='slogan-small'> {hobby.slogan} </h4></div>}
                <div className={isColumnBasedSmall ? "hobbie-container-small" : "hobbie-container"}>

                    {hobby !== undefined && <div className={isColumnBasedSmall ? "hobbie-content-small" : "hobbie-content"}>
                        {currentPage !== '03' && <div className="hobbie-cover"  >
                            <img className="hobbie-cover" src={hobby.profileImgUrl} alt="hiking" /></div>}
                        <div className={isColumnBasedSmall ? "hobbie-content-body-samll" : "hobbie-content-body"}>

                            {!isColumnBasedSmall && <div className="hobbie-pages">
                                <span onClick={() => changePage('01')} className={currentPage === '01' ? "hobbie-active" : ""} >01</span>
                                <span onClick={() => changePage('02')} className={currentPage === '02' ? "hobbie-active" : ""}>02</span>
                                <span onClick={() => changePage('03')} className={currentPage === '03' ? "hobbie-active" : ""}>03</span>
                                <span onClick={() => changePage('04')} className={currentPage === '04' ? "hobbie-active" : ""}>04</span>
                            </div>}

                            {isColumnBasedSmall && <div className="hobbie-pages-horizontal">
                                <span onClick={() => changePage('01')} className={currentPage === '01' ? "hobbie-active-small" : "hobbie-small"} >01</span>
                                <span onClick={() => changePage('02')} className={currentPage === '02' ? "hobbie-active-small" : "hobbie-small"}>02</span>
                                <span onClick={() => changePage('03')} className={currentPage === '03' ? "hobbie-active-small" : "hobbie-small"}>03</span>
                                <span onClick={() => changePage('04')} className={currentPage === '04' ? "hobbie-active-small" : "hobbie-small"}>04</span>
                            </div>}

                            <div className="hobbie-lable">
                                {!isColumnBasedSmall && <div> <span className="hobbie-title"><b>{hobby.name}</b></span> <h4 className='slogan'> {hobby.slogan} </h4></div>}
                                {currentPage === '01' && <div>
                                    <p> {hobby.intro} </p>
                                </div>}
                                {currentPage === '02' && <div>
                                    <p> {hobby.description} </p>
                                </div>}
                                {currentPage === '03' &&
                                    <div className={isColumnBased ? "gallery__media" : "gallery"} >
                                        <img src={hobby.galleryImgUrl1} className={(isColumnBasedSmall && "gallery__photo__media") || (isColumnBasedSmaller && "gallery__photo__media__medium") || (isColumnBased && "gallery__photo__media") || ("gallery__photo gallery__photo--1")} alt="photo-1" />
                                        <img src={hobby.galleryImgUrl2} className={(isColumnBasedSmall && "gallery__photo__media") || (isColumnBasedSmaller && "gallery__photo__media__medium") || (isColumnBased && "gallery__photo__media") || ("gallery__photo gallery__photo--2")} alt="photo-2" />
                                        <img src={hobby.galleryImgUrl3} className={(isColumnBasedSmall && "gallery__photo__media") || (isColumnBasedSmaller && "gallery__photo__media__medium") || (isColumnBased && "gallery__photo__media") || ("gallery__photo gallery__photo--3")} alt="photo-3" />
                                        <img src={hobby.galleryImgUrl1} className={(isColumnBasedSmall && "gallery__photo__media") || (isColumnBasedSmaller && "gallery__photo__media__medium") || (isColumnBased && "gallery__photo__media") || ("gallery__photo gallery__photo--4")} alt="photo-1" />
                                        <img src={hobby.profileImgUrl} className={(isColumnBasedSmall && "gallery__photo__media") || (isColumnBasedSmaller && "gallery__photo__media__medium") || (isColumnBased && "gallery__photo__media") || ("gallery__photo gallery__photo--5")} alt="photo-2" />
                                    </div>
                                }
                                {currentPage === '04' && <div>
                                    <p> {hobby.contactInfo} </p>
                                </div>}
                                {currentPage !== '03' && <div className="prix">
                                    <span ><a className="add-crt-edit">Remove</a></span>
                                    <span ><a className="add-crt-edit" >Save</a></span>
                                </div>}
                            </div>

                        </div>
                    </div>}
                    {welcomeDiv.showDiv && <div>
                        <div className="introduction-home">
                            <div className="intro-text">
                                <p> This hobby does not exist.</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <footer className="footer-hobbie-details">
                &copy; Hobbie 2021. All rights reserved.
            </footer>
        </div>
    )
};


export default Hobbie
