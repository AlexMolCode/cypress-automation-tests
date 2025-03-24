import { baseBooking } from '@/data/booking-data';

describe('API error tests', () => { 
  it ('BUG: API returns error when "firstname" field is not a string', () => {
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

  it ('BUG: API returns error when "lastname" field is not a string', () => {
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

// 
describe('API invalid value tests', () => { 
  const invalidDepositValues = ['x', 4];
  
  // The "depositpaid" field should only accept boolean values (true/false)
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
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body.booking.depositpaid).to.equal(true);
      });
    });
  });

  // The "totalprice" field should only accept decimal values
  it('BUG: "totalprice" converts a string value to null instead of returning an error', () => {
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