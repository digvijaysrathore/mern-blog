import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { Spin } from 'antd';
import axios from "axios";

class Admin extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isSignedIn: false,
			isAdmin: false,
			body: "",
			title: "",
			category: "business",
		    isUploading: false,
		    progress: 0,
		    image: "",
		    file: "",
		    posting: false,
		    success: false,
		    error: false,
		    posts: [],
		    delError: false,
		    delSuccess: false
		}
	}

	//zOLyMFb2m2VtWhPXKJGZvdrlJRG3
	componentDidMount = (e) => {
		const that = this
		firebase.auth().onAuthStateChanged(function (user){
			if(user){
				if(user.uid === "fkfgMjQ0ntbvMgBwWEeVZ0eu7Dx2" || "zOLyMFb2m2VtWhPXKJGZvdrlJRG3" ){
					that.setState({
						isSignedIn: true
					})
					axios.get(`${process.env.REACT_APP_BACKEND}/getall`)
					.then((response) => {
						that.setState({
							posts: response.data,
							fetching: false
						})
					}).catch((err) => {
						that.setState({
							fetching: false
						})
					})
				} else {
					window.location.replace("/")
				}
			} else {
				window.location.replace("/")
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

	handleChange = (e, editor) => {
		const data = editor.getData()
		this.setState({
			body: data
		})
	}

	handleMeta = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
		console.log(this.state)
	}

	//Image Upload
  	handleImageUpload = () => this.setState({ isUploading: true, progress: 0 });
  	handleImageUploadSuccess = filename => {
	    this.setState({progress: 100, isUploading: false});
	    firebase
	      .storage()
	      .ref("images")
	      .child(filename)
	      .getDownloadURL()
	      .then((url) => {
	      	this.setState({ image: url })
	      });
	};

	//File Upload
	handleFileUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  	handleFileUploadSuccess = filename => {
	    this.setState({progress: 100, isUploading: false});
	    firebase
	      .storage()
	      .ref("files")
	      .child(filename)
	      .getDownloadURL()
	      .then((url) => {
	      	this.setState({ file: url })
	      });
	};

  	handleUploadError = error => {
	  this.setState({isUploading: false});
	  console.error(error);
	};

  	handleProgress = progress => this.setState({ progress });

  	//Post data
  	postData = (e) => {
  		console.log(this.state)
  		this.setState({
  			posting: true
  		})
  		axios.post(`${process.env.REACT_APP_BACKEND}/add`, {
  			title: this.state.title,
  			body: this.state.body,
  			image: this.state.image,
  			file: this.state.file,
  			category: this.state.category
  		})
  		.then((response) => {
  			this.setState({
  				posting: false,
  				success: true
  			})
  		}).catch((err) => {
  			this.setState({
  				error: true
  			})
  		})
  	}

  	handleDel = (e) => {
  		axios.delete(`${process.env.REACT_APP_BACKEND}/delete/${e}`)
  		.then((response) => {
  			this.setState({
  				delError: false,
  				delSuccess: true
  			})
  		}).catch((err) => {
  			this.setState({
  				delError: true,
  				delSuccess: false
  			})
  		})
  	}

	render(){
		return (
			<div className="admin">
			{this.state.isSignedIn
				?
				<div>
					<div>
		                <CKEditor
		                    editor={ClassicEditor}
		                    data=""
		                    onChange={this.handleChange}
		                />
					</div>
					<div className="uploads">
				        <form>
				          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
				          <div className="upload">
				          <p className="text">Upload cover image, below.</p>
				          <FileUploader
				          	className="upload-btn"
				            accept="images/*"
				            name="image"
				            randomizeFilename
				            storageRef={firebase.storage().ref("images")}
				            onUploadStart={this.handleImageUpload}
				            onUploadError={this.handleUploadError}
				            onUploadSuccess={this.handleImageUploadSuccess}
				            onProgress={this.handleProgress}
				          />
				          </div>
				          <div className="upload">
				          <p className="text">Add file, resource.</p>
				          <FileUploader
				            accept="files/*"
				            name="file"
				            randomizeFilename
				            storageRef={firebase.storage().ref("files")}
				            onUploadStart={this.handleFileUploadStart}
				            onUploadError={this.handleUploadError}
				            onUploadSuccess={this.handleFileUploadSuccess}
				            onProgress={this.handleProgress}
				          />
				          </div>
				        </form>
				      </div>
					<div className="form">
						<form>
							<input className="input" onChange={this.handleMeta} id="title" placeholder="Title" />
							<select className="input input2" name="category" id="category" onChange={this.handleMeta}>
								<option value="business">Business</option>
								<option value="mindset">Mindset</option>
								<option value="resources">Resources</option>
								<option value="life">Life</option>
							</select>
						</form>
					</div>
					<div>
						<button type="click" className="post-btn" onClick={this.postData}>Post</button>
					</div>
					{this.state.success
						?
						<div className="spin">
							<p className="text">Article successfully posted!</p>
						</div>
						:
						<div>
						</div>
					}
					{this.state.error
						?
						<div className="spin">
							<p className="text">Error posting the article.</p>
						</div>
						:
						<div>
						</div>
					}
					{this.state.posting
						?
						<div className="spin">
						  <Spin />
						</div>
						:
						<div className="spin">
							<p className="text">Fill in all the fields and hit post.</p>
							<p className="text">Uploading file is optional. When adding a file, mark the category as resources.</p>
						</div>
					}
					{this.state.delError 
						?
						<div className="spin">
							<p className="text">Error deleting the post</p>
						</div>
						:
						<div>
						</div>
					}
					{this.state.delSuccess
						?
						<div className="spin">
							<p className="text">Successfully deleted the post</p>
						</div>
						:
						<div>
						</div>
					}
					<div>
						{this.state.posts.map((item, index) => {
							return (
								<p className="title-del">{item.title} -  <a onClick={() => this.handleDel(item._id)}>Delete</a></p>
							)
						})}
					</div>
				</div>
				:
				<div className="spin">
					<p>Loading...</p>
				</div>
			}
			</div>
		)
	}
};

export default Admin;