import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Post from '../components/Post'
import Profile from '../components/Profile'

export class home extends Component {



    state = {
        posts: null
    }
    componentDidMount(){
        axios.get('/posts')
        .then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })

    }
    render() {
        let recentPostsMarkUp = this.state.posts ? 

        (this.state.posts.map(post => <Post key={post.postID} post={post}/> ) // curly brackets cause an error here?
        ) 
        
        : <p> No Posts </p>

        return (
           <Grid container spacing={10}>

               <Grid item sm={8} xs={12}> 
                {recentPostsMarkUp}
               </Grid>

               <Grid item sm={4} xs={12}> 
                <Profile/>
               </Grid>

           </Grid>
        )
    }
}

export default home

