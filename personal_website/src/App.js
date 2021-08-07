import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import DisplayBlogs from './Components/DisplayBlog/DisplayBlogs';
import CreateBlog from './Components/CreateBlog/CreateBlog'
import DisplayBlog from './Components/DisplayBlog/DisplayBlog';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Editprofile from './Components/EditProfile/Editprofile';
import Login from './Components/Login/Login';
import firebase from 'firebase'
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import Displaymsg from './Components/Message/Displaymsg';

function App() {
 const [,dispatch] = useStateValue();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(data) {
      if (data) {  
        dispatch({
          type:'ADD_USER',
          user:data,
      })
      }
    });

  }, []);
  
  return ( 
    <Router>
      <div className="App">
        <Switch>
          <Route path="/blog/:id">
            <Header />
            <DisplayBlog />
          </Route>
          <Route path="/blogs">
              <Header />
              <DisplayBlogs />
          </Route>
          <Route path="/createpost">
              <Header />
              <CreateBlog />
          </Route>
          <Route path="/edit/profile">
              <Header />
              <Editprofile />
          </Route>
          <Route path="/admin/login">
              <Header />
              <Login />
          </Route>
          <Route path="/message">
              <Header />
              <Displaymsg />
          </Route>
          <Route path="/">
              <Header />
              <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

