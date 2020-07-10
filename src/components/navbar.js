import React from "react";
import {NavLink} from "react-router-dom";
import Logo from "../assets/logo.png";

class NavbarComponent extends React.Component {
	render(){
		return (
			<div className="header">
			<div className="top">
			<p className="headline">Have a look on our <a href="https://www.youtube.com/channel/UC42sSD-7t1jna5IfPl5DY4w" className="quicky" target="_blank">youtube channel</a> and <a className="quicky" href="https://redcircle.com/shows/theindialab" target="_blank">podcast</a>, we post about business, life and mindset.</p>
			</div>
				 <nav className="navbar navbar-expand-md navbar-light">
				  <NavLink className="navbar-brand" to="/"><img className="logo" alt="" src={Logo} /></NavLink>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="collapsibleNavbar">
				    <ul className="navbar-nav">
				      <li className="nav-item">
				        <NavLink className="nav-link" to="/">Read</NavLink>
				      </li>
				      <li className="nav-item">
				        <NavLink className="nav-link" to="/resources">Resources</NavLink>
				      </li>
				      <li className="nav-item">
				        <NavLink className="nav-link" to="/know">Know Me</NavLink>
				      </li>
				    </ul>
				  </div>
				</nav> 
			</div>
		)
	}
};

export default NavbarComponent;