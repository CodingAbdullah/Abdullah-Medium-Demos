Feature: Testing display and content of the Navbar

Scenario: User on the Home Page, views the Navbar
Given User lands on Home Page
When  User selects the Navbar
Then  Navbar links should be visible

Scenario: User on the Search Page, views the Navbar
Given User lands on Search Page
When  User selects the Navbar
Then  Navbar links should be visible