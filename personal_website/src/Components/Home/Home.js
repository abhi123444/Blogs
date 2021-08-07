import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import Loading from '../Loading';
import './home.css'
import { PageHeader } from 'antd';
import Message from './Message';
function Home(props) {

    const [profile,setProfile] = useState();
    const [intro,setIntro] = useState('');
    const [about,setAbout] = useState('');
    const [email,setEmail] = useState('');
    const [ser,setSer] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [linkedin,setLinkedin] = useState('');
    const [instagram,setInstagram] = useState('');
    const [facebook,setFacebook] = useState('');
    const [twitter,setTwitter] = useState('');
   useEffect(() =>{
        db.collection('User')
        .onSnapshot(async (datas) => {
                await datas.docs.map((data) => {
                let {About, Introduction, Profile , Email, Service, Instagram, Facebook, Twitter, Linkedin, Whatsapp} = data.data()
                setIntro(Introduction);
                setAbout(About);
                setProfile(Profile);
                setEmail(Email);
                setSer(Service);
                setWhatsapp(Instagram);
                setLinkedin(Linkedin);
                setFacebook(Facebook);
                setTwitter(Twitter);
                setWhatsapp(Whatsapp);
                return 0;
            })
        })
    },[])
    return (
        (profile && intro && email && ser && about)
        ?
        <div className="home">
            <div className="home_top">
                <div className="profile_img">
                    <img src={profile} alt="" />
                </div>
                <div className="home_content">
                    <div className="home_info">
                        <h3>{intro}</h3>
                    </div>
                </div>
            </div>
            <div className="home_bottom">
                <div className="home_bottom_box">
                    <h3>Services</h3>
                    <p>{ser}</p>
                </div>
                <div className="home_bottom_box">
                    <h3>About</h3>
                    <p>{about}</p>
                </div>
            </div>
            <h3 className="headingContact">Interested in doing a project together?</h3>
            <Message />
            <hr/>
            <div className="home_footer"
                   
                  >
                        <ul className="socialUl">
                            <li className="socialli"><a href={email}><EmailIcon style={{width:"40px",height:"40px",color:"gray"}}/></a></li>
                            <li className="socialli"><a  href={linkedin}><LinkedInIcon style={{width:"40px",height:"40px",color:"gray"}}/></a></li>
                            <li className="socialli"><a  href={instagram}><InstagramIcon style={{width:"40px",height:"40px",color:"gray"}}/></a></li>
                            <li className="socialli"><a  href={facebook}><FacebookIcon style={{width:"40px",height:"40px",color:"gray"}}/></a></li>
                            <li className="socialli"><a  href={twitter}><TwitterIcon style={{width:"40px",height:"40px",color:"gray"}}/></a></li>
                            <li className="socialli"><a  href={whatsapp}><WhatsAppIcon style={{width:"40px",height:"40px",color:"gray"}}/></a></li>
                        </ul>
                    </div>
        </div>
        :<Loading />
    );
}

export default Home;