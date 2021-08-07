import React, { useEffect, useState } from 'react';
import './editprofile.css'
import Loading from '../Loading'
import {PageHeader,Input,Button,Image} from "antd";
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import db, { storage } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
const { TextArea } = Input;

function Editprofile(props) {
    const [{user},] = useStateValue();
    const history = useHistory();
    const [profile,setProfile] = useState();
    const [profileFile,setProfileFile] = useState();
    const [id,setId] = useState('');
    const [intro,setIntro] = useState('');
    const [about,setAbout] = useState('');
    const [ser,setSer] = useState('');
    const [images,setImages] = useState();
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [linkedin,setLinkedin] = useState('');
    const [instagram,setInstagram] = useState('');
    const [facebook,setFacebook] = useState('');
    const [twitter,setTwitter] = useState('');

    const setIntrovalue = (e) => setIntro(e.target.value);
    const setAboutvalue = (e) => setAbout(e.target.value);
    const setServalue = (e) => setSer(e.target.value);
    const setEmailvalue = (e) => setEmail(e.target.value);
    const setWhatsappvalue = (e) => setWhatsapp(e.target.value);
    const setLinkedinvalue = (e) => setLinkedin(e.target.value);
    const setInstagramvalue = (e) => setInstagram(e.target.value);
    const setFacebookvalue = (e) => setFacebook(e.target.value);
    const setTwittervalue = (e) => setTwitter(e.target.value);

   useEffect(() =>{
        db.collection('User')
        .onSnapshot(async datas => {
          
            await datas.docs.map( profileInfor => {
                let {About, Introduction, Profile , Email, Service, Instagram, Facebook, Twitter, Linkedin, Whatsapp} = profileInfor.data()
                setId(profileInfor.id);
                setIntro(Introduction);
                setAbout(About);
                setImages(Profile);
                setSer(Service);
                setEmail(Email);
                setWhatsapp(Instagram);
                setLinkedin(Linkedin);
                setFacebook(Facebook);
                setTwitter(Twitter);
                setWhatsapp(Whatsapp);
                return 0;
            });
        })
    },[])

    const uploadImage = () =>{
        const Imginput = document.querySelector("#imginput");
        Imginput.click();
    }
    const handleprofileFileProfile = (e) => {
            const image = e.target.files[0]
            setProfileFile(imageFile => (image))
            setImages(URL.createObjectURL(e.target.files[0]))
    }

 
    const handleUploadImage = e => {
        e.preventDefault()
        if (profileFile) {
            const uploadTask = storage.ref(`/images/${profileFile.name}`).put(profileFile)
            uploadTask.on(
                'state_changed',
                (snapShot) => {
                   /* const progress = Math.round(
                        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    );
                    setProgress(progress)*/
                }, (err) => {
                    console.log(err)
                }, () => {
                    storage
                        .ref('images')
                        .child(profileFile.name)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            let About = about, Introduction = intro, Profile = fireBaseUrl ,Email = email , Service = ser;
                            let Instagram = instagram, Whatsapp = whatsapp , Facebook = facebook , Twitter = twitter , Linkedin = linkedin;
                            let payload =  {About, Introduction, Profile , Service, Email, Instagram, Twitter, Facebook, Linkedin, Whatsapp};
                            db.collection("User").doc(id).update(payload)
                            .then(function() {
                                console.log("updated...");
                                history.replace('/');
                            });
                        })
                    setProfileFile(null);
                })
        }else{
            let About = about, Introduction = intro,Email = email , Service = ser;
            let Instagram = instagram, Whatsapp = whatsapp , Facebook = facebook , Twitter = twitter , Linkedin = linkedin;
            let payload =  {About, Introduction, Service, Email, Instagram, Twitter, Facebook, Linkedin, Whatsapp};
            db.collection("User").doc(id).update(payload)
            .then(function() {
                console.log("updated...");
                history.replace('/');
            });
        }
    }

    const homerender =() =>{
        history.replace('/')
    }
    return (
        (intro && email && ser && about) && (user)
        ?
        <div className="edit_profile">
           <div className="edit_profile_header">
                <PageHeader
                    style={{border:"1px solid rgb(235,237,240)"}}
                    title="Edit Profile"  
                />
            </div>
            <div className="editprofileHorizzontal">
                <div className="editprofileleft">
                    <div className="edit_profile_image">
                        <div className="edit_profile_image_input">
                            <Image
                                width={250}
                                style={{borderRadius: "40px"}}
                                src={images}
                            />
                        </div>
                        <div className="edit_profile_image_input">
                            <input type="file" id="imginput"   onChange={handleprofileFileProfile} hidden/>
                            <button onClick={uploadImage}>Upload Profile Image</button>
                        </div>

                    </div>
                </div>
                <div className="editprofileright">
                <div className="edit_profile_about">
                        <div className="edit_profile_heading">
                            <h4>Introduction</h4>
                        </div>
                        <div className="edit_profile_about_input">
                            <TextArea rows={1} value={intro} onChange={setIntrovalue} placeholder="Write here..."/>
                        </div>
                    </div>
                    <div className="edit_profile_about">
                        <div className="edit_profile_heading">
                            <h4>About</h4>
                        </div>
                        <div className="edit_profile_about_input">
                            <TextArea rows={3} value={about} onChange={setAboutvalue} placeholder="Write here..."/>
                        </div>
                    </div>
                    <div className="edit_profile_about">
                        <div className="edit_profile_heading">
                            <h4>Service</h4>
                        </div>
                        <div className="edit_profile_about_input">
                            <TextArea rows={3} value={ser} onChange={setServalue} placeholder="Write here..."/>
                        </div>
                    </div>
                    <div className="edit_profile_socialmedia">
                        <div className="edit_profile_">
                            <div className="edit_profile_title">
                                <h4><EmailIcon /> Email</h4>
                            </div>
                            <div className="edit_profile_email_input">
                                <Input value={email} onChange={setEmailvalue} placeholder="Email" />
                            </div>
                        </div>
                        <div className="edit_profile_">
                            <div className="edit_profile_title">
                                <h4><LinkedInIcon /> LinkedIn</h4>
                            </div>
                            <div className="edit_profile_linkedin_input">
                                <Input value={linkedin} onChange={setLinkedinvalue} placeholder="LinkedIN Link " />
                            </div>
                        </div>
                        <div className="edit_profile_">
                            <div className="edit_profile_title">
                                <h4><WhatsAppIcon /> Whatsapp</h4>
                            </div>
                            <div className="edit_profile_Whatsapp_input">
                                <Input value={whatsapp} onChange={setWhatsappvalue} placeholder="Whatsapp Number" />
                            </div>
                        </div>
                        <div className="edit_profile_">
                            <div className="edit_profile_title">
                                <h4><InstagramIcon /> Instagram </h4>
                            </div>
                            <div className="edit_profile_Instagram_input">
                                <Input value={instagram} onChange={setInstagramvalue} placeholder="Instagram" />
                            </div>
                        </div>
                        <div className="edit_profile_">
                            <div className="edit_profile_title">
                                <h4><TwitterIcon />Twitter</h4>
                            </div>
                            <div className="edit_profile_Twitter_input">
                                <Input value={twitter} onChange={setTwittervalue} placeholder="Twitter" />
                            </div>
                        </div>
                        <div className="edit_profile_">
                            <div className="edit_profile_title">
                                <h4><FacebookIcon /> Facebook </h4>
                            </div>
                            <div className="edit_profile_Facebook_input">
                                <Input value={facebook} onChange={setFacebookvalue} placeholder="Facebook" />
                            </div>
                        </div>
                    </div>
                    
                   
                    <div className="edit_profile_Update">
                        <Button type="primary" block onClick={handleUploadImage}>
                           Update Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        :<>
            <Loading />
            <h3 
                onClick={homerender} 
                style={{
                    cursor:"pointer",
                    display: "flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }}>Click here to go Home page</h3>
        </>
    );
}

export default Editprofile;