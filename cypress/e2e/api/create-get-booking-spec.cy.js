import { baseBooking } from '@/data/booking-data';

describe('Create and retrieve booking API Tests', () => {
  let bookingId;
  
  // Create a new booking
  it('Should create a new booking successfully', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: baseBooking
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bookingid');
      bookingId = response.body.bookingid; // Store the booking ID for the next test
      });
  });
  
    // Retrieve and verify the created booking
  it("Should retrieve the created booking and confirm details", () => {
    cy.request({
      method: 'GET',
      url: `/booking/${bookingId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(baseBooking); // Ensure data is correctly stored
      });
  });
});
  
  
  
