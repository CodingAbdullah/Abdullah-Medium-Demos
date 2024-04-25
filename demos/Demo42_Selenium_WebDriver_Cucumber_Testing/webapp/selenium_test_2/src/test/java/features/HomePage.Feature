Feature: Testing display and content of Home Page

Scenario: User on the Home Page, selects the Home link
Given User lands on Home Page
When  User selects the Home link
Then  Redirect User to the Home Page


Scenario: User on the Home Page, selects the Search link
Given User lands on Home Page
When  User selects the Search link 
Then  Redirect User to the Search Page