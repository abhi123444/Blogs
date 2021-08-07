import React ,{useState}from "react";
import './login.css';
import {PageHeader,Input,Button} from "antd";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
const Login = () => {
    const [,dispatch] = useStateValue();
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState(false);
    const onEmailchange = (event) =>setEmail(event.target.value);
    const onPasswordchange = (event) =>setPassword(event.target.value);
    const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    
    const onSignup = () =>{
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                dispatch({
                    type:'ADD_USER',
                    user:userCredential,
                })
                console.log("user signed"+userCredential);
                setEmail('');
                setPassword('');
                history.replace('/');  
             })
            .catch((error) => {
                 console.log(error);
                 setErrors('Please check Mail and Password')
                 setEmail('');
                 setPassword('');
            });
        
    }
   return(
       (!isMobile)?
    <div className="Signup_container">
        <div className="page_header_container">
                <PageHeader
                    style={{border:"1px solid rgb(235,237,240)"}}
                    title="Sign In"  
                />
        </div>

        <div className="cont"> 
            <div className="signup_input_container" style={{marginTop:"20px"}}>
                        <div className="signup_input_title">
                            <h4>Email</h4>
                        </div>
                        <div className="post_title_input">
                            <Input placeholder="Enter Email"  onChange={onEmailchange}/>
                        </div>

            </div>
            <div className="signup_input_container" style={{marginTop:"20px"}}>
                        <div className="signup_input_title">
                            <h4>Password</h4>
                        </div>
                        <div className="post_title_input">
                                <Input.Password placeholder="password"  onChange={onPasswordchange}/>
                        </div>
                        
            </div>
            <div className="post_inputs_container" >
                <Button type="primary" block  onClick={onSignup} >
                    Login
                </Button>
            </div>
            <div>{errors}</div>
        </div>
    </div>
    :<div>Sorry, this Admin side login is only available on desktop devices.</div>
   )
}

export default Login;