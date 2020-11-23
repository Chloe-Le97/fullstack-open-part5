import React,{useState} from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) =>{
        console.log('hello')
        event.preventDefault()
        if(title&&author){
          createBlog({title:title,author:author,url:url})
          setTitle('');
          setUrl('');
          setAuthor('');
        }else{
            alert('Please type title and author of the blog')
        }
      }

    BlogForm.propTypes={
        addBlog: PropTypes.func.isRequired,
        createBlog: PropTypes.func.isRequired,
    }
      
    return (
      <div className="formDiv">
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
        <div>title
          <input
            id='title'
            value={title}
            onChange={({target})=>setTitle(target.value)}
          />
        </div>
        <div>author
          <input
             id='author'
            value={author}
            onChange={({target})=>setAuthor(target.value)}
          />
        </div>
        <div>url
          <input
            value={url}
            onChange={({target})=>setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
        </div>
    )
 }

export default BlogForm