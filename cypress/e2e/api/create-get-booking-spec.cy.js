describe("Create and Retrieve Booking API Tests", () => {
    let bookingId;
    const bookingData = {
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
  
    // POST: Create a new booking
    it("Should create a new booking successfully", () => {
      cy.request({
        method: "POST",
        url: "/booking",
        body: bookingData
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("bookingid");
        bookingId = response.body.bookingid; // Store the booking ID for the next test
      });
    });
  
    // GET: Retrieve and verify the created booking
    it("Should retrieve the created booking and confirm details", () => {
      cy.request({
        method: "GET",
        url: `/booking/${bookingId}`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(bookingData); // Ensure data is correctly stored
      });
    });
  });
  
  
  
