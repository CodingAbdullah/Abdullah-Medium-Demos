import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import Navbar from '../src/Components/Navbar/Navbar';

// A test suite for testing the functionality of the Navbar component
describe('Testing the Navbar Component', () => {

  // Specific test case for testing the Navbar component
  it('Check to see if the title in the Navbar is displayed correctly', () => {
    
    const navbarComponent = shallow(<Navbar />); // Creates an object which represents the entire React component
    const navbarTitleElement = navbarComponent.find('.navbar-brand').at(0).text();
    
    expect(navbarTitleElement).to.equal('Mocha.js/React Application'); // Use assertion to ensure to pass or fail the test
  });

  // Test case for testing the Navbar link element
  it('Check to see if the Navbar contains appropriate links', () => {

    const navbarComponent = shallow(<Navbar />); // Creates an object which represents the entire React component
    const navbarLinkElement = navbarComponent.find('.nav-link').at(0).text();

    expect(navbarLinkElement).to.equal("Search"); // Use assertion to ensure to pass or fail the test
  })
});
