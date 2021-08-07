import React from 'react';
import './header.css';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {Link, useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';
import { BookOutlined , HighlightOutlined ,LoginOutlined,MessageOutlined ,LogoutOutlined, CloudOutlined,SettingOutlined} from '@ant-design/icons';
function Header() {
    const [{user},dispatch] = useStateValue();
    const history = useHistory();
    const onSignout = () =>{

        firebase.auth().signOut()
            .then(() => {
                console.log("user signed out")
                dispatch({
                    type:'REMOVE_USER',
                })
                history.replace("/");
            }).catch((error) => {
              console.log("error"+error)
            });
    }
    return (

        <div className="header">
            <nav className="menu">
                <Menu  mode="horizontal">

                    <>
                        <Menu.Item key="book" icon={<BookOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="blogs" icon={<CloudOutlined />}>
                            <Link to="/blogs">Blogs</Link>
                        </Menu.Item>
                        {(user) &&
                            <>
                                <Menu.Item key="createPost" icon={<HighlightOutlined />}>
                                    <Link to="/createpost">Create blog</Link>
                                </Menu.Item>
                                <Menu.Item key="messages" icon={<MessageOutlined />}>
                                    <Link to="/message">Messages</Link>
                                </Menu.Item> 
                                <Menu.Item key="editprofile" icon={<SettingOutlined />}>
                                    <Link to="/edit/profile">Edit Profile</Link>
                                </Menu.Item> 
                            </>
                        }
                    </>
                    { !user
                        ?   <Menu.Item key="Login" icon={<LoginOutlined />}>
                                <Link to="/admin/login">Admin Login</Link>
                            </Menu.Item>                   
                        :   <Menu.Item key="Logut" icon={<LogoutOutlined />}>
                                <a onClick={onSignout}>Logut</a>
                            </Menu.Item>
                    }
                </Menu>
            </nav>
        </div>
    );
}

export default Header;