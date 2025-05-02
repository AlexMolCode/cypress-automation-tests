// Error test scenarios for Restful Booker's CRUD API

import { baseBooking } from '@/data/booking-data';

describe('API error tests', () => { 
  // Documented in JIRA ticket CTSBT-8
  it ('BUG: API returns server error when "firstname" field is not a string', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      
      // Status code setting is needed in order for tests to pass when fail statuses are expected
      failOnStatusCode: false,
      
      // Use ... operator to make copy of the API body and then change the firstname field for test
      body: {
        ...baseBooking,
        firstname: 123
      }
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.equal('Internal Server Error');
    });
  });
  
  // Documented in JIRA ticket CTSBT-8
  it ('BUG: API returns server error when "lastname" field is not a string', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      failOnStatusCode: false,
      body: {
        ...baseBooking,
        lastname: 456
      }
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.equal('Internal Server Error');
    });
  });
})

describe('API invalid response tests', () => { 
  const invalidDepositValues = ['x', 4];
  
  // The "depositpaid" field should only accept boolean values (true/false)
  // Documented in JIRA ticket CTSBT-9
  invalidDepositValues.forEach((invalidValue) => { 
    it (`BUG: "depositpaid" field converts invalid value (${invalidValue}) to true`, () => {
      cy.request({
        method: 'POST',
        url: '/booking',
        body: {
          ...baseBooking,
          depositpaid: invalidValue
        }
      }).then((response) => {

        // Invalid response
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body.booking.depositpaid).to.equal(true); 
      });
    });
  });

  // The "totalprice" field should only accept decimal values
  // Documented in JIRA ticket CTSBT-10
  it('BUG: "totalprice" converts a string value to null instead of returning an error', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        ...baseBooking,
        totalprice: 'x'
    }
    }).then((response) => {

      // Invalid response
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bookingid');
      expect(response.body.booking.totalprice).to.equal(null); // Invalid response
    });
  });   
})