import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message,setMessage] = useState('')
  const [error, setError] = useState(null)
  
  const blogFormRef = useRef()

  useEffect(() => {
    getAllBlog()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getAllBlog = async () =>{
    blogService.getAll().then(blogs =>{
       const sortBlog = blogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs( sortBlog )}
    )  
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Login successfully`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )


  const logout = () =>{
    setUser(null);
    window.localStorage.setItem(
      'loggedBlogappUser', ''
    ) 
  }
  const onLike = async (blog) =>{
    const likes = blog.likes
    await blogService.update(blog.id,{...blog, likes: likes+1})
    getAllBlog()
  }

  const createBlog = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      await blogService
      .create(blogObject)
      getAllBlog()
      setMessage(`Blog is successfully added`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)
      
    }catch(error){
      setMessage(error.message)
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} error={error} />
      
      {user === null ?
      loginForm() :(
      <div>
        <div className='app_user'>
          <p>{user.username} logged-in</p>
          <button type='button' onClick={logout} className='logout_button'>Log out</button>
        </div>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}></BlogForm>
        </Togglable>
        

      </div>)
    }
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} getAllBlog={getAllBlog} user={user} onLike={onLike} className='blog'/>
    )}

    </div>
  )
}

export default App