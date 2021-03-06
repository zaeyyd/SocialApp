import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../components/post/Post'
import Grid from '@material-ui/core/Grid'
import StaticProfile from '../components/profile/StaticProfile'
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

class user extends Component {
    state = {
        profile: null,
        postIDParam: null
    }

    componentDidMount(){
        const AT = this.props.match.params.AT
        const postID = this.props.match.params.postID

        if(postID) this.setState({ postIDParam: postID})

        this.props.getUserData(AT)
        axios.get(`/user/${AT}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })

            })
            .catch(err => console.log(err))
    }
    render() {
        const { posts, loading } = this.props.data
        const { postIDParam } = this.state

        const postsMarkup = loading ? (
            <PostSkeleton/>
        ) : posts === null ? (
            <p>No Posts</p>
        ) : !postIDParam ? (
            posts.map(post => <Post key={post.postID} post={post}/> )
        ) : (
            posts.map(post => {
                if(post.postID !== postIDParam)
                    return <Post key={post.postID} post={post}/>
                else return <Post key={post.postID} post={post} openDialog/>
            })
        )
        return (
            <Grid container spacing={10}>

               <Grid item sm={8} xs={12}> 
                {postsMarkup}
               </Grid>

               <Grid item sm={4} xs={12}> 
                {this.state.profile === null ? (
                    <ProfileSkeleton/>
                ) : (
                    <StaticProfile profile={this.state.profile}/>
                )}
               </Grid>

           </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps, {getUserData})(user)
