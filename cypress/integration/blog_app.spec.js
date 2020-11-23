describe('Note app', function() {
    
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
      cy.contains('blogs')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    it('user can login', function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('mluukkai logged-in')
    })
    
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('Login successfully')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.contains('Wrong credentials')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'mluukkai', password: 'salainen'
              }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
              })
        })
    
        it('a blog can be created', function() {
          cy.contains('new note').click()
          cy.get('#title').type('a note created by cypress')
          cy.get('#author').type('a note created by cypress')
          cy.contains('save').click()
          cy.contains('a note created by cypress')
        })
        describe('and several notes exist',function(){
            beforeEach(function(){
                cy.contains('new note').click()
                cy.get('#title').type('a note created by cypress')
                cy.get('#author').type('a note created by cypress')
                cy.contains('save').click()
                cy.contains('a note created by cypress')
                cy.contains('new note').click()
                cy.get('#title').type('a second note created by cypress')
                cy.get('#author').type('a second note created by cypress')
                cy.contains('save').click()
                cy.contains('a second note created by cypress')
            })
            it('like button works', function() {  
                cy.contains('a second note created by cypress').parent().find('button').contains('View').click()
                cy.contains('likes 0')
                cy.contains('a second note created by cypress')
                .parent().parent()
                .find('button')
                .contains('like')
                .click()
                cy.contains('likes 1')
              })
            it('blogs are returned arranged by likes', function() {

                cy.get('#show').then( buttons => {
                    for (let i = 0; i< buttons.length; i++) {
                      cy.wrap(buttons[i]).click()
                    }
                })
                
                cy.contains('a second note created by cypress').parent().find('button').contains('View').click()
                cy.contains('a second note created by cypress')
                .parent().parent()
                .find('button')
                .contains('like')
                .click()
                cy.contains('likes 1')

                cy.get('.blog').then( blogs => {
                    cy.wrap(blogs[0]).contains('likes 1')
                    cy.wrap(blogs[1]).contains('likes 0')
                  })
               
          
              })    
        })
           
      })

     
    

     
 
  })