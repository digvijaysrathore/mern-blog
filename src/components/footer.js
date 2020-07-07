import React from "react";
import {NavLink} from "react-router-dom";

class Footer extends React.Component {
	render(){
		return (
			<div className="footer">
				<h5 className="main-line">I talk about..</h5>
				<p><NavLink className="cate" to="/category/business">Business</NavLink><NavLink className="cate" to="/category/mindset">Mindset</NavLink><NavLink className="cate cata" to="/category/life">Life</NavLink></p>
				<a target="_blank" href="https://instagram.com"><i className="fa links fa-youtube-play"></i></a> <a href="https://instagram.com" target="_blank"><i className="fa links fa-podcast"></i></a> <a target="_blank" href="https://instagram.com"><i className="fa links fa-instagram"></i></a> <a target="_blank" href="https://instagram.com"><i className="fa links fa-facebook"></i></a>
			</div>
		)
	}
};

export default Footer;