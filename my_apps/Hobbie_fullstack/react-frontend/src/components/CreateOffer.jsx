import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import Footer from './Footer'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const CreateOffer = () => {
    let navigate = useNavigate();

    const img_urls = [];
    const [info, setInfo] = useState({
        profilePhoto: '',
        hobbyName: '',
        slogan: '',
        category: '',
        intro: '',
        description: '',
        price: '',
        lcation: '',
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: '',
        photo6: '',
        contactInfo: ''

    });

    const [errors, setErrors] = useState({});


    const validate = () => {
        const errors = {};
    
        //TODO something already exists?

        if (!info.profilePhoto) {
            errors.profilePhoto = 'Profile photo is required'
        } 
        if (!info.hobbyName) {
            errors.hobbyName = 'Hobby name is required'
        } else if (info.hobbyName.length < 3) {
        errors.username = 'Hobby name must be at least 3 characters long'
        }
    
        if (!info.slogan) {
            errors.slogan = "Slogan is required"
        } else if (info.slogan.length < 2 || info.slogan.length > 20) {
            errors.slogan = "Text has to be between 2 and 20 characters long"
        }
        
     if (!info.category) {
        errors.category = "Category is required"
    }
 
    if (!info.intro) {
        errors.intro = "Intro is required"
    } 
    // else if (info.intro.length > 100 ) {
    //     errors.intro = "Text has to be at least 100 characters long"
    // }

    if (!info.description) {
        errors.description = "Description is required"
    } 
    // else if (info.description.length  > 200) {
    //     errors.description = "Text has to be at least 500 characters long"
    // }
        
    if (!info.price) {
        errors.price = "Price is required"
    }

        
    if (!info.location) {
        errors.location = "Location is required"
    }
    if (!info.photo1) {
        errors.photo1 = "You must upload 5 high quality photos"
    }
    if (!info.photo2) {
        errors.photo2 = "You must upload 5 high quality photos"
    }
    if (!info.photo3) {
        errors.photo3 = "You must upload 5 photos"
    }
       if (!info.photo4) {
        errors.photo4 = "You must upload 5 photos"
    }
    if (!info.photo5) {
        errors.photo5 = "You must upload 5 photos"
    }


    if (!info.contactInfo) {
        errors.contactInfo = "Contact info is required"
    } 
    // else if (info.contactInfo.length < 20 || info.contactInfo.length > 200) {
    //     errors.contactInfo = "Text has to be between 20 and 200 characters long"
    // }
     return errors;
    }
    

   
    const submitHandler= (event) =>{
        event.preventDefault();
   
    
        let errors = validate(info)
        setErrors(errors);
        
        if(Object.keys(errors).length === 0){
     
          const files =  [info.profilePhoto, info.photo1,info.photo2,info.photo3, info.photo4, info.photo5 ];
      

            const uploaders = files.map(file => {
                // Initial FormData
                const formData = new FormData();
                formData.append("file", file);
                formData.append("tags", `dv6ktrxwv, hobbie`);
                formData.append("upload_preset", "vgf01lnc"); // Replace the preset name with your own
                // formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
                formData.append("timestamp", (Date.now() / 1000) | 0);
                
                // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
                return axios.post("https://api.cloudinary.com/v1_1/dv6ktrxwv/image/upload", formData, {
                  headers: { "X-Requested-With": "XMLHttpRequest" },
                }).then(response => {
                  const data = response.data;
                  const fileURL = data.secure_url
                  img_urls.push(fileURL) // You should store this URL for future references in your app
                  console.log(data);
                })
              });

      
              
              // Once all the files are uploaded 
              axios.all(uploaders).then(() => {
                // ... perform after upload is successful operation
              });
        

            console.log(info)

            console.log(img_urls)
             navigate("/business-owner")
        }
        else {
            console.log(info);
            
            console.log(errors);
        }
    }
    return (
   
<div className="coBody">
<div className="create_offer">
  <div className="offer_body">
    <h1 className="title_offer">Create offer</h1>
 
    <form className="form-offer" onSubmit={submitHandler}>
    <div className="offer-row">
            <div className="form-field-photos">
                <div className="">
             
                    <div className="row_upload">
                        <label id="photo" className="label-name">
                            <span className="">Profile Photo</span>
                        </label>
                        <div className="button3">
                        <p className="choose-file">  {info.profilePhoto ? 
                       "Photo uploaded"  : "Choose a file" }</p> 
                         <input  onChange={e => setInfo({...info, profilePhoto : e.target.files[0]})} type="file"  id="add-title-image" name="img"/> 
                           
                        </div>
                     
                        {errors.profilePhoto && <div  className="errors_offer" >
                       {errors.profilePhoto}</div>  }
                    </div>
                </div>
             
            </div>
        </div>  
        <div className="offer-row">
            <div className="form-field2">
                <div className="name-section">
                    <label forhtml="name" className="label-name">
                        <span className="">Hobbie Name</span>
                    </label>
                    <input onChange={e => setInfo({...info, hobbyName : e.target.value})} placeholder="ex: Painting, Swimming classes etc.." className="h_n"   type="text" name="name" />

                </div>
               {errors.hobbyName && <small  className="errors_offer">{errors.hobbyName}</small>}
            </div>
        </div>
        <div className="offer-row">
            <div className="form-field2">
                <div className="name-section">
                    <label htmlFor="slogan" className="label-name">
                        <span className="">Slogan</span>
                    </label>
                    <input onChange={e => setInfo({...info, slogan : e.target.value})} placeholder="your offer in one sentence..."className="h_n" type="text" name="slogan"/>

                </div>
               {errors.slogan && <small  className="errors_offer">{errors.slogan}</small>}  
            </div>
        </div>

        <div className="offer-row">
            <span className="">Category</span>
                    <select onChange={e => setInfo({...info, category : e.target.value})}className="custom-select"  id="category" name="category">

                    <option value="">Select category</option>
                    <option value="Active">Active</option>
                    <option  value="Social">Social</option>
                    <option value="Fun">Fun</option>
                    <option  value="Relax">Relax</option>
                    <option  value="Intellectual">Intellectual</option>
                    <option value="Creative">Creative</option>
                    <option  value="Other">Other</option>

                </select>
          {errors.category && <small className="errors_offer">{errors.category}</small>}  
            </div>
            <div className="offer-row">
            <div className="form-field2">

                <div className="name-section">
                    <label id="intro" className="label-name">
                        <span className="">Intro</span>
                    </label>
                    <textarea onChange={e => setInfo({...info, intro : e.target.value})} className="label-name" type="text" name="intro" ></textarea>
                </div>

             {errors.intro && <small className="errors_offer">{errors.intro}</small>}    
            </div>
        </div>
        <div className="offer-row">
            <div className="form-field2">

                <div className="name-section">
                    <label id="description" className="label-name">
                        <span className="">Class description</span>
                    </label>
                    <textarea onChange={e => setInfo({...info, description : e.target.value})} className="label-name" type="text" name="name" ></textarea>
                </div>

                {errors.description && <small className="errors_offer">{errors.description}</small>} 
            </div>
        </div>
        <div className="offer-row">
            <div className="form-field2">
                <div className="name-section">
                    <label htmlFor="price" className="label-name">
                        <span className="">Price per entry</span>
                    </label>
                    <input onChange={e => setInfo({...info, price : e.target.value})} className="h_n"  type="number" name="price"  id="price"/>

                </div>
              {errors.price && <small  className="errors_offer">{errors.price}</small>}  
            </div>
        </div>

        <div className="offer-row">
            <span className="">Location</span>
                    <select onChange={e => setInfo({...info, location : e.target.value})} className="custom-select"  id="location" name="location">
                    <option value="">Select location</option>
                    <option value="Zurich">Zurich</option>
                    <option  value="Bern">Bern</option>
                    <option  value="Zug">Zug</option>
                    <option  value="Luzern">Luzern</option>
                    <option  value="Other">Other</option>

                </select>
          {errors.location && <small className="errors_offer">{errors.location}</small> }  
            </div>
            <div className="offer-row">
            <div className="form-field-photos">
                <div className="">
              
                    <div className="row_upload">
                        <label id="photo" className="label-name">
                            <span className="">Gallery</span>
                        </label>
                        <div className="button3">
                          <p className="choose-file"> {info.photo1 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input  onChange={e => setInfo({...info, photo1 : e.target.files[0]})}type="file"  id="add-title-image" name="img" />
                        </div>
                        <div className="button3">
                          <p className="choose-file"> {info.photo2 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setInfo({...info, photo2 : e.target.files[0]})}type="file"  id="add-title-image" name="img" />
                        </div>
                        <div className="button3">
                          <p className="choose-file"> {info.photo3 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setInfo({...info, photo3 : e.target.files[0]})}type="file"  id="add-title-image" name="img" />
                        </div>
                        <div className="button3">
                          <p className="choose-file"> {info.photo4 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setInfo({...info, photo4 : e.target.files[0]})} type="file"  id="add-title-image" name="img" />
                        </div>
                        <div className="button3">
                          <p className="choose-file"> {info.photo5 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setInfo({...info, photo5 : e.target.files[0]})} type="file"  id="add-title-image" name="img" />
                        </div>
                        <div className="button3">
                          <p className="choose-file"> {info.photo6 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setInfo({...info, photo6 : e.target.files[0]})} type="file"  id="add-title-image" name="img" />
                        </div>

                    </div>
                   {(errors.photo1 || errors.photo2 || errors.photo3 || errors.photo4 || errors.photo5) && <div  className="errors_offer" >
                   You must upload at least 5 high quality photos
                    </div>}
                </div>
            </div>
        </div>  
            <div className="offer-row">
            <div className="form-field2">
                <div className="name-section">
                    <label id="contact" className="label-name">
                        <span className="">Contact info</span>
                    </label>
                    <textarea onChange={e => setInfo({...info, contactInfo : e.target.value})} placeholder="ex: Venue Address, Website, Phone number etc.." className="label-name" type="text" name="contact" ></textarea>
                </div>

              {errors.contactInfo && <small className="errors_offer">{errors.contactInfo}</small> }   
            </div>
        </div>

        

      
            <button  type="submit" className="button submit-offer">Submit</button>
  
    </form>

</div>
   
<img className="blueImg3" src={blueImg} alt="blueImg"/>
<img className="blueImg4" src={blueImg} alt="blueImg"/>
<footer className="footer-hobbie bg-transparent  py-2">
<div className="container-fluid text-center">
    <div className="footer-background h5 text-white">
        &copy; Hobbie 2021. All rights reserved.
    </div>
</div>
</footer>
</div>
</div>
    )
}

export default CreateOffer


