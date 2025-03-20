describe("Update booking API Test", () => {
  let bookingId; 
  let authToken;
  
  const initialBooking = {
    firstname: "John",
    lastname: "Doe",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-06-01",
      checkout: "2024-06-10"
    },
    additionalneeds: "Breakfast"
  };
  
  const updatedBooking = {
    firstname: "Jane",
    lastname: "Smith",
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-07-01",
      checkout: "2024-07-10"
    },
    additionalneeds: "Dinner"
  };
  
  // Log in to generate auth token then create an initial booking for the test
  before(() => {
    cy.request({
      method: "POST",
      url: "/auth",
      body: { username: Cypress.env("BOOKING_USERNAME"), password: Cypress.env("BOOKING_PASSWORD")}
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Store authentication token for later use
      authToken = response.body.token;  
    });
      
    cy.request({
      method: "POST",
      url: "/booking",
      body: initialBooking
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bookingid");
      bookingId = response.body.bookingid;
    });
  });
  
  it("Should update all booking fields properly", () => {
    cy.request({
      method: "PUT",
      url: `/booking/${bookingId}`,
      
      // Include authentication token from above which is required for booking updates
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${authToken}` 
      },
      body: updatedBooking
    }).then((response) => {
      expect(response.status).to.eq(200);

      // Confirm update API response matches the new data
      expect(response.body).to.deep.equal(updatedBooking); 
    });
  
    // Verify the booking update just made
    cy.request({
      method: "GET",
      url: `/booking/${bookingId}`
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(200);

      // Confirm data changed via update is actually saved to the DB
      expect(getResponse.body).to.deep.equal(updatedBooking); 
    });
  });
});
  