import 'cypress-xpath';
class uiAutomation {
    clientsidedelayBtn= "//a[normalize-space()='Client Side Delay']"
    buttonTriggeringClientSideLogic= "//button[normalize-space()='Button Triggering Client Side Logic']"
    labelText= "//p[@class='bg-success']"
    backBtn= "//a[normalize-space()='UITAP']"
    DynamicTableBtn= "//a[normalize-space()='Dynamic Table']"
    chromeCPU= "//div[@role='row' and .//span[normalize-space()='Chrome']]//span[contains(text(), '%')]"
    YellowLabel= "//p[contains(@class, 'bg-warning')]"
    SampleAppBtn= "//a[normalize-space()='Sample App']"
    usernameBtn= "//input[@placeholder='User Name']"
    PasswordBtn= "//input[@placeholder='********']"
    loginBtn="//button[normalize-space()='Log In']"
    ShadowDomBtn= "//a[normalize-space()='Shadow DOM']"
    AlertBtn= "//a[normalize-space()='Alerts']"
    Alert= "//button[normalize-space()='Alert']"
    confirm= "//button[normalize-space()='Confirm']"
    prompt= "//button[normalize-space()='Prompt']"
    fileUploadBtn= "//a[normalize-space()='File Upload']"


    ClientSideDelayTest(){
        cy.xpath(this.clientsidedelayBtn)
    .scrollIntoView()
    .should('be.visible')
    .click();

  cy.xpath(this.buttonTriggeringClientSideLogic).click();

  cy.wait(15000);

  cy.xpath(this.labelText).should('be.visible');
    }

    DynamicTableTest(){
        cy.xpath(this.backBtn).click()
        cy.xpath(this.DynamicTableBtn)
        .scrollIntoView()
        .click()
        cy.window().then(() => {
        cy.xpath(this.chromeCPU)
        .then(($cpuCell) => {
      expect($cpuCell, "CPU load cell exists").to.exist;

      // Parse CPU value from table
      const tableCpuLoad = parseFloat($cpuCell.text().replace('%', '').trim());
      cy.log("Chrome CPU load from table: " + tableCpuLoad);

;
        cy.xpath(this.YellowLabel)
        .invoke("text")
        .then((labelText) => {
          const match = labelText.match(/([\d.]+)/);
          const labelCpuLoad = match ? parseFloat(match[1]) : NaN;
          cy.log("Chrome CPU load from yellow label: " + labelCpuLoad);

          // Compare with a tolerance of 1%
          expect(tableCpuLoad).to.be.closeTo(labelCpuLoad, 1);
        });
    });
});
    }

    SampleAppTest(){
        cy.xpath(this.backBtn).click()
        cy.xpath(this.SampleAppBtn)
        .scrollIntoView()
        .click()
        cy.xpath(this.usernameBtn).type('oluwaseun')
        cy.xpath(this.PasswordBtn).type('pwd')
        cy.xpath(this.loginBtn).click()

    }

    ShadowDom(){
        cy.xpath(this.backBtn).click()
        cy.xpath(this.ShadowDomBtn)
        .scrollIntoView()
        .click()
        cy.get("guid-generator")
    .shadow()
    .find("#editField") 
    .invoke("val")
    .as("generatedGUID");
    cy.get("guid-generator")
    .shadow()
    .find("#buttonCopy") 
    .click();
    }

    RetriveCopiedGUIDFromClipBoard () {
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((clipboardText) => {
              cy.log("Clipboard Value:", clipboardText); // Debugging log
              cy.get("@generatedGUID").should("eq", clipboardText);
            });
          });
    }

   AlertsTest() {
    cy.xpath(this.backBtn).click()
    

it('uses visitWithDialogStubs', () => {
  cy.visitWithDialogStubs('/alerts', 'cats');

  cy.xpath("//button[normalize-space()='Alert']").click();
  cy.xpath("//button[normalize-space()='Confirm']").click();
  cy.xpath("//button[normalize-space()='Prompt']").click();

  cy.get('@alertStub').should('have.been.called');
  cy.get('@promptStub').should('have.been.called');
  // ...other assertions...
});
  }

    fileUpload() {
  cy.xpath(this.backBtn).click();

  cy.xpath(this.fileUploadBtn)
    .scrollIntoView()
    .click();

  const fileName = 'example.txt';

  // Access the iframe body, then find the file input and attach file.
  // Adjust iframe selector if it's not the first iframe on the page, e.g. 'iframe#uploader'
  cy.getIframeBody('iframe')
    .find('#browse')                // should be input[type="file"]
    .should('exist')
    .then($el => {
      // If #browse is an <input type="file">, attachFile will work directly:
      cy.wrap($el).attachFile(fileName);
    });
}
 
 


 















}
export default uiAutomation