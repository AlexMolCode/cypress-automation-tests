// Authentication scenarios using Restful Booker's CRUD API

describe('Successful Authentication', () => {
  it('Should generate a token with valid login', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      
      // API auth login is retrieved from the env file so it's not exposed here
      body: { 
        username: Cypress.env('BOOKING_USERNAME'), 
        password: Cypress.env('BOOKING_PASSWORD')
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Assert token length instead of value to keep it hidden
      expect(response.body.token.length).to.be.equal(15);
    });
  });
})

describe('Failed Authentication', () => {

  // Documented in JIRA ticket CTSBT-11
  it('BUG: Should return an authentication error for invalid login credentials', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { 
        username: 'admin', 
        password: 'pass' 
      },
    }).then((response) => {

      // The API currently returns 200 for invalid login when it should return 401
      expect(response.status).to.eq(200); 
      expect(response.body).to.deep.equal({ reason: 'Bad credentials' });
    });
  });  

  // Documented in JIRA ticket CTSBT-11
  it('BUG: Should return an authentication error if a login field is missing', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { username: 'admin' },
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.deep.equal({ reason: 'Bad credentials' });
    });
  });
  
  // Documented in JIRA ticket CTSBT-11
  it('BUG: Should return an authentication error if both username and password are blank', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { 
        username: '', 
        password: '' 
      },
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.deep.equal({ reason: 'Bad credentials' });
    });
  });  
});