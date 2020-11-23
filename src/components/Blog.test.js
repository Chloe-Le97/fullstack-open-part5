import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler
  const testBlog = { title: 'Test title', author: 'Test author', likes: 100, user:{username:'Chloe'} }
  const testUser = { name: 'Test user', username: 'testuser' }
  window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(testUser))

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render( <Blog blog={testBlog} user={testUser} handleLikes={mockHandler} /> )
  })

  test('hideWhenExpandedDiv and showWhenExpandedDiv have different text content', () => {
    const hideWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(1)')
    const showWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(2)')
    expect(hideWhenExpandedDiv).toHaveTextContent('Test title Test author')
    expect(hideWhenExpandedDiv).not.toHaveTextContent('Test title Test author Hidden likes 100 like added by Chloe')
    expect(showWhenExpandedDiv).toHaveTextContent('Test title Test author Hidden likes 100 like added by Chloe')
  })

  test('only the name and author of the blog post are shown by default', () => {
    const hideWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(1)')
    const showWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(2)')
    expect(hideWhenExpandedDiv).toBeVisible()
    expect(showWhenExpandedDiv).not.toBeVisible()
  })

  test('other information becomes vissible when blog post is clicked 1 time', () => {
    const clickableDiv = component.container.querySelector('.blog-btn')
    const hideWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(1)')
    const showWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(2)')
    fireEvent.click(clickableDiv)
    expect(showWhenExpandedDiv).toBeVisible()
    expect(hideWhenExpandedDiv).not.toBeVisible()
    
  })

  test('only the name and author of the blog post are shown when the post is clicked 2 times', () => {
    const clickableDiv = component.container.querySelector('.blog-btn')
    const hideWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(1)')
    const showWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(2)')
    fireEvent.click(clickableDiv)
    fireEvent.click(clickableDiv)
    expect(hideWhenExpandedDiv).toBeVisible()
    expect(showWhenExpandedDiv).not.toBeVisible()
  })

  test('like is pressed twice causes two onLiked events', () => {
    
    const handleOnLiked = jest.fn()
    const component = render(
        <Blog blog={testBlog} onLike={handleOnLiked}/>
    )
    const clickableDiv = component.container.querySelector('.blog-btn')
    const likeButton = component.container.querySelector('.like')

  
    fireEvent.click(clickableDiv)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
  
    expect(handleOnLiked.mock.calls.length).toBe(2)
  })

  afterAll(() => {
    window.localStorage.clear()
  })
})