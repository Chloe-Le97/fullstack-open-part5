import React,{useState} from 'react';
import './Blog.style.css';
import blogService from '../services/blogs'

const Blog = ({ blog,getAllBlog,onLike }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  
  const hideWhenExpanded = { display: blogVisible ? 'none' : '' }
  const showWhenExpanded = { display: blogVisible ? '' : 'none' }

  const remove = async () =>{
    if(window.confirm(`Do you want to delete blog post ${blog.title}?`)){
      await blogService.remove(blog.id)
      getAllBlog()
    }
  }

  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  return(
  <div className='blog'>
    <div style={hideWhenExpanded}>
      <strong>{blog.title}</strong> {blog.author} 
      <button onClick={() => setBlogVisible(!blogVisible)} id='show' className='blog-btn'>View</button>
    </div>
    <div style={showWhenExpanded} className="togglableContent">
      <div>
        <strong>{blog.title} </strong> {blog.author}
        <button onClick={() => setBlogVisible(!blogVisible)} className='blog-btn'> Hidden </button>
      </div>
      <a href={blog.url} target="_blank" rel='noopener noreferrer'>{blog.url}</a> 
      <div>likes {blog.likes} <button type='button' onClick={()=>onLike(blog)} className='like'>like</button></div>
      <div> added by {blog.user.username}</div>
      {currentUser&&currentUser.username==blog.user.username?(<div><button onClick={remove}>Remove</button></div>):(null)}
    </div>
  </div>
  )
}

export default Blog
