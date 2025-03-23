describe('Successful Authentication', () => {
  it('Should generate a token with valid login', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { username: Cypress.env('BOOKING_USERNAME'), password: Cypress.env('BOOKING_PASSWORD')},
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Assert token length so token itself is not exposed
      expect(response.body.token.length).to.be.equal(15);

      // Save auth token for later tests
      cy.wrap(response.body.token, { log: false }).as('authToken');
    });
  });
})

describe('Failed Authentication', () => {
  it('Should return an error message if login is invalid', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { username: 'admin', password: 'pass' },
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.deep.equal({ reason: 'Bad credentials' });
    });
  });  

  it('Should return an error message if one of the login fields is missing', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { username: 'admin' },
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.deep.equal({ reason: 'Bad credentials' });
    });
  });
  
  it('Should return an error message if both user and pass are blank', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: { username: '', password: '' },
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.deep.equal({ reason: 'Bad credentials' });
    });
  });  
});