import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import HomePage from '../src/Components/HomePage/HomePage';

// A test suite for testing the functionality of the Home Page component
describe('Testing the Home Page Component', () => {

  // Specific test case for testing the Home Page component
  it('Check to see if the title is displayed correctly', () => {
    
    const homePageTestComponent = shallow(<HomePage />); // Creates an object which represents the entire React component
    const homePageTitletext = homePageTestComponent.find('h1').text();
    
    expect(homePageTitletext).to.equal('Home Page of the Mocha.js/React Test Application!'); // Use assertion to ensure to pass or fail the test
  });

  // Test case for testing the Home Page button element
  it('Check to see if the button to navigate to the Search Page exists', () => {

    const homePageTestComponent = shallow(<HomePage />); // Creates an object which represents the entire React component
    const homePageButtonElement = homePageTestComponent.find('button').text();

    expect(homePageButtonElement).to.equal("Search!"); // Use assertion to ensure to pass or fail the test
  })
});
