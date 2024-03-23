import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import SearchPage from '../src/Components/SearchPage/SearchPage';

// A test suite for testing the functionality of the Search Page component
describe('Testing the Search Page Component', () => {

  // Specific test case for testing the Search Page component
  it('Check to see if the title in the Search Page is displayed correctly', () => {
    
    const searchPageComponent = shallow(<SearchPage />); // Creates an object which represents the entire React component
    const searchPageTitleElement = searchPageComponent.find('h3').text();
    
    expect(searchPageTitleElement).to.equal('Search Form'); // Use assertion to ensure to pass or fail the test
  });

  // Test case for testing the Search Page paragraph element
  it('Check to see if the Search Page paragraph description is displayed correctly', () => {

    const searchPageComponent = shallow(<SearchPage />); // Creates an object which represents the entire React component
    const searchPageParagraphElement = searchPageComponent.find('i').text();

    expect(searchPageParagraphElement).to.equal("Testing application search functionality"); // Use assertion to ensure to pass or fail the test
  });

  // Test case for testing the Search Page input element
  it('Check to see if the input is displayed correctly in the Search Page', () => {

    const searchPageComponent = shallow(<SearchPage />); // Creates an object which represents the entire React component
    const searchPageInputElement = searchPageComponent.find('i').text();

    expect(searchPageInputElement).to.equal("Testing application search functionality"); // Use assertion to ensure to pass or fail the test
  });

  // Test case for testing the Search Page button element
  it('Check to see if the submit button is displayed correctly in the Search Page', () => {

    const searchPageComponent = shallow(<SearchPage />); // Creates an object which represents the entire React component
    const searchPageButtonElement = searchPageComponent.find('button').text();

    expect(searchPageButtonElement).to.equal("Submit"); // Use assertion to ensure to pass or fail the test
  });
});