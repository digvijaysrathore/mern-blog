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
  apiKey: "AIzaSyCjUg6qzLuChvFUlR0Bz4yXPBXXsWTa8Hw",
  authDomain: "theindialab-27b31.firebaseapp.com",
  databaseURL: "https://theindialab-27b31.firebaseio.com",
  projectId: "theindialab-27b31",
  storageBucket: "theindialab-27b31.appspot.com",
  messagingSenderId: "616702933513",
  appId: "1:616702933513:web:6e1aaf51f1881439ae96d8"
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
