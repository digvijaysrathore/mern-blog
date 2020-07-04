import React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {Spin} from "antd";
import parse from 'html-react-parser';

class Post extends React.Component {
	constructor(props){
		super(props)
		this.state={
			slug: this.props.match.params.slug,
			data: [],
			fetching: false,
			success: false,
			error: false
		}
	}

	componentDidMount = (e) => {
		this.setState({
			fetching: true
		})
		axios.get(`${process.env.REACT_APP_BACKEND}/read/${this.state.slug}`, {"headers": {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		}}).then((response) => {
			const parsed = parse(response.data.body)
			this.setState({
				data: response.data,
				success: true,
				fetching: false,
				parsed: parsed,
				file: response.data.file
			})
		}).catch((err) => {
			this.setState({
				error: true,
				fetching: false
			})
			console.log(err)
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
							<p className="text"><a href="https://instagram.com"><i className="fa fa-youtube-play"></i></a> <a href="https://instagram.com"><i className="fa fa-podcast"></i></a> <a href="https://instagram.com"><i className="fa fa-instagram"></i></a> <a href="https://instagram.com"><i className="fa fa-facebook"></i></a></p>
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
							<div className="read">
								<h3 className="read-title">{this.state.data.title}</h3>
								<img className="image" alt="" src={this.state.data.image} />
								<p className="read-body">{this.state.parsed}</p>
								<div className="checks">
								<a className="read-btn" href={this.state.data.file}>Resources</a>
								<p className="read-more">*check for resources, if any.</p>
								<p className="read-more">Continue read more of <NavLink to={"/category/" + this.state.data.category}>{this.state.data.category}</NavLink></p>
								</div>
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
							<p className="text"><a href="https://instagram.com"><i className="fa fa-youtube-play"></i></a> <a href="https://instagram.com"><i className="fa fa-podcast"></i></a> <a href="https://instagram.com"><i className="fa fa-instagram"></i></a> <a href="https://instagram.com"><i className="fa fa-facebook"></i></a></p>
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

export default Post;