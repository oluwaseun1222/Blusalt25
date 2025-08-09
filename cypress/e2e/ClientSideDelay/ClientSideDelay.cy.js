
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import uiAutomation from '../PageOject/ClientSideDelay';
test = new uiAutomation

Given('I am on the home page', () => {
    cy.visit('/');
});

Then('i valid client side delay',() => {
    test.ClientSideDelayTest()
});

Then('i validated dynamic table', () => {
    test.DynamicTableTest()
})

Then('i validated sample App', ()=> {
    test.SampleAppTest()
})

Then('i validated shadow dom', () => {
    test.ShadowDom()
})

Then('i validated alert', () => {
    test.AlertsTest()
})

Then('i validated file upload', () => {
    test.fileUpload()
})

