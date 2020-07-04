import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import NavbarComponent from "./components/navbar";
import Admin from "./views/admin";
import Main from "./views/main";
import Post from "./views/post";
import Know from "./views/know";
import Resources from "./views/resources";
import Category from "./views/category";
import "./styles/main.css";
import "./styles/navbar.css";
import "./styles/admin.css";
import firebase from "firebase";
import 'antd/dist/antd.css';
import Footer from "./components/footer";
import "./styles/footer.css";
import "./styles/post.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE,
  appId: process.env.REACT_APP_APPID
};

firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <NavbarComponent />
          <Route path="/" exact component={Main} />
          <Route path="/admin" component={Admin} />
          <Route path="/resources" component={Resources} /> 
          <Route path="/read/:slug" component={Post} />
          <Route path="/know" component={Know} />
          <Route path="/category/:category" component={Category} />
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
};

export default App;
