import React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {Spin} from "antd";

class Category extends React.Component {
	constructor(props){
		super(props)
		this.state={
			category: this.props.match.params.category,
			fetching: false,
			success: false,
			error: false,
			posts: []
		}
	}

	componentDidMount = (e) => {
		this.setState({
			fetching: true
		})
		axios.get(`${process.env.REACT_APP_BACKEND}/category/${this.state.category}`, {"headers": {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		}}).then((response) => {
			this.setState({
				posts: response.data,
				fetching: false,
				error: false,
				success: true
			})
		}).catch((err) => {
			this.setState({
				error: true
			})
		})
	}

	render(){
		return (
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
		)
	}
};

export default Category;