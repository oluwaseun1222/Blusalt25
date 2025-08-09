describe("User Registration and Login API", () => {
  // We declare variables to store our user credentials
  let email, password;

  it("should register a new user", () => {
    // Generate a unique email each time
    email = `testuser_${Date.now()}@example.com`;
    password = "Password123!";

    // Send a POST request to register the user
    cy.request({
      method: "POST",
      url: "/rest/V1/customers", // relative to baseUrl
      body: {
        customer: {
          email,
          firstname: "Test",
          lastname: "User",
          website_id: 1
        },
        password
      },
      failOnStatusCode: false // optionally handle errors yourself
    }).then((response) => {
      // Registration in Magento often returns a 200 status code if successful
      expect(response.status).to.eq(200);
      cy.log("Registration response:", response.body);
    });
  });

  it("should log in the newly registered user", () => {
    // Use the same email and password generated in the previous test
    cy.request({
      method: "POST",
      url: "/rest/V1/integration/customer/token",
      body: {
        username: email,
        password: password
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Magento returns a token (a string) upon successful login
      expect(response.body).to.be.a("string");
      cy.log("Login token:", response.body);
    });
  });
});
