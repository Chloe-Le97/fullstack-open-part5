import React,{useState} from 'react';
import './Blog.style.css';
import blogService from '../services/blogs'

const Blog = ({ blog,getAllBlog,createdBy }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const like = async () =>{
    const likes = blog.likes
    await blogService.update(blog.id,{...blog, likes: likes+1})
    getAllBlog()
  }

  const remove = async () =>{
    if(window.confirm(`Do you want to delete blog post ${blog.title}?`)){
      await blogService.remove(blog.id)
      getAllBlog()
    }
  }

  return(
  <div className='blog'>
    <div style={hideWhenVisible}>
      <strong>{blog.title}</strong> {blog.author} 
      <button onClick={() => setBlogVisible(true)}>View</button>
    </div>
    <div style={showWhenVisible}>
      <div>
        <strong>{blog.title} </strong> {blog.author}
        <button onClick={() => setBlogVisible(false)}>Hidden</button>
      </div>
      <a href={blog.url} target="_blank" rel='noopener noreferrer'>{blog.url}</a> 
      <div>likes {blog.likes} <button type='button' onClick={like}>like</button></div>
      <div>added by {blog.user.username}</div>
      {createdBy&&createdBy.username==blog.user.username?(<div><button onClick={remove}>Remove</button></div>):(null)}
    </div>
  </div>
  )
}

export default Blog
