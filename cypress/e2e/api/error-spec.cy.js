import { baseBooking } from '@/data/booking-data';

describe('API error tests', () => { 
  it ('KNOWN BUG: API errors when First Name field is not a string', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      
      // Status code setting is needed in order for tests to pass when fail statuses are expected
      failOnStatusCode: false,
      
      // Use ... operator to make copy of the API body and then change the needed field for test
      body: {
        ...baseBooking,
        firstname: 123
      }
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.equal('Internal Server Error');
    });
  });

  it ('KNOWN BUG: API errors when Last Name field is not a string', () => {
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

// Test both string and numerical values to show field is not erroring out correctly
describe('API invalid value tests', () => { 
  const invalidDepositValues = ['x', 4];
  
  //Test both values using a loop through the small array above
  invalidDepositValues.forEach((invalidValue) => { 
    it (`KNOWN BUG: Depositpaid field converts invalid value (${invalidValue}) to true`, () => {
      cy.request({
        method: 'POST',
        url: '/booking',
        body: {
          ...baseBooking,
          depositpaid: invalidValue
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body.booking.depositpaid).to.equal(true);
      });
    });
  });

  it('KNOWN BUG: Totalprice converts a string value to null instead of sending error', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        ...baseBooking,
        totalprice: 'x'
    }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bookingid');
      expect(response.body.booking.totalprice).to.equal(null);
    });
  });   
})