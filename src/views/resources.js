import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Spin} from "antd";
import {NavLink} from "react-router-dom";
import axios from "axios";

class Resources extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isSignedIn: false,
			fetching: false,
			posts: [],
			success: false,
			error: false
		}
	}

	componentDidMount = (e) => {
		const that = this
		firebase.auth().onAuthStateChanged(function (user){
			if(user){
				that.setState({
					isSignedIn: true,
					fetching: true
				})
				axios.get(`${process.env.REACT_APP_BACKEND}/category/resources`, {"headers": {
  					'Access-Control-Allow-Origin': '*',
  					'Access-Control-Allow-Headers': '*',
				}})
				.then((response) => {
					that.setState({
						posts: response.data,
						fetching: false,
						success: true
					})
				}).catch((err) => {
					that.setState({
						error: true,
						fetching: false
					})
					console.log(err)
				})
			} else {
				//
			}
		})
	}

	uiConfig = {
	    signInFlow: 'redirect',
	    signInOptions: [
	      firebase.auth.GoogleAuthProvider.PROVIDER_ID
	    ],
	    callbacks: {
	      signInSuccessWithAuthResult: () => false
	    }
	  };

	render(){
		return (
			<div>
			{this.state.isSignedIn
				?
				<div>
					<div>
					{this.state.fetching
						?
						<div className="posts container">
							<div className="row">
								<div className="column">
									<div className="spin">
										<Spin />
										<p className="text">Hang around, we are bringing is some insightful reads for you!</p>
									</div>
								</div>
								<div className="column">
								<div className="sticky">
									<h5 className="category-heading">Explore</h5>
									<p className="text"><NavLink className="text-dark" to="/category/business">Business</NavLink></p>
									<p className="text"><NavLink className="text-dark" to="/category/mindset">Mindset</NavLink></p>
									<p className="text"><NavLink className="text-dark" to="/category/life">Life</NavLink></p>
									<p className="text"><NavLink className="text-dark" to="/resources">Resources.</NavLink></p>
									<h5 className="category-heading">Connect</h5>
									<p className="text"><a href="https://www.youtube.com/channel/UC42sSD-7t1jna5IfPl5DY4w" rel="noopener noreferrer" target="_blank"><i className="fa fa-youtube-play"></i></a> <a href="https://instagram.com" rel="noopener noreferrer" target="_blank"><i className="fa fa-podcast"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://instagram.com/theindialab"><i className="fa fa-instagram"></i></a> <a target="_blank" href="https://facebook.com/theindialab"><i className="fa fa-facebook"></i></a></p>
								</div>
								</div>
							</div>
						</div>
						:
						<div>
						</div>
					}
					{this.state.error
						?
						<div className="">
							<p>Oops! We are facing a server side error, try again after some time.</p>
						</div>
						:
						<div>
						</div>
					}
					{this.state.success
						?
						<div className="posts container">
							<div className="row">
								<div className="column">
									{this.state.posts.slice(0,10).map((item, index) => {
										return (
											<div className="post">
												<img className="image" alt="" src={item.image} />
												<div className="content">
												<h3 className="title">{item.title}</h3>
												<p className="text"><i className="fa fa-tag"></i>{item.category}</p>
												<NavLink className="read-btn" to={"/read/" + item.slug}>Read</NavLink>
												</div>
											</div>
										)
									})}
								</div>
								<div className="column">
								<div className="sticky">
									<h5 className="category-heading">Explore</h5>
									<p className="text"><NavLink className="text-dark" to="/category/business">Business</NavLink></p>
									<p className="text"><NavLink className="text-dark" to="/category/mindset">Mindset</NavLink></p>
									<p className="text"><NavLink className="text-dark" to="/category/life">Life</NavLink></p>
									<p className="text"><NavLink className="text-dark" to="/resources">Resources.</NavLink></p>
									<h5 className="category-heading">Connect</h5>
									<p className="text"><a href="https://www.youtube.com/channel/UC42sSD-7t1jna5IfPl5DY4w" rel="noopener noreferrer" target="_blank"><i className="fa fa-youtube-play"></i></a> <a href="https://instagram.com" rel="noopener noreferrer" target="_blank"><i className="fa fa-podcast"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://instagram.com/theindialab"><i className="fa fa-instagram"></i></a> <a target="_blank" href="https://facebook.com/theindialab"><i className="fa fa-facebook"></i></a></p>
								</div>
								</div>
							</div>
						</div>
						:
						<div>
						</div>
					}
					</div>
				</div>
				:
				<div className="text-center login-to-continue">
					<h3 className="login-title">Login To Continue</h3>
					<p className="text">One click registration to our mailing list and exclusive access to our content.</p>
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
				</div>
			}
			</div>
		)
	}
};

export default Resources;