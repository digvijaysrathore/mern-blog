import React from "react";
import {NavLink} from "react-router-dom";

class Footer extends React.Component {
	render(){
		return (
			<div className="footer">
				<h5 className="main-line">I talk about..</h5>
				<p><NavLink className="cate" to="/category/business">Business</NavLink><NavLink className="cate" to="/category/mindset">Mindset</NavLink><NavLink className="cate cata" to="/category/life">Life</NavLink></p>
				<a target="_blank" href="https://www.youtube.com/channel/UC42sSD-7t1jna5IfPl5DY4w"><i className="fa links fa-youtube-play"></i></a> <a href="https://redcircle.com/shows/theindialab" target="_blank"><i className="fa links fa-podcast"></i></a> <a target="_blank" href="https://instagram.com/theindialab"><i className="fa links fa-instagram"></i></a> <a target="_blank" href="https://facebook.com/theindialab"><i className="fa links fa-facebook"></i></a>
			</div>
		)
	}
};

export default Footer;