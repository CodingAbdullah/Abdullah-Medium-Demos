Feature: Testing display and content of Search Page

Scenario: User on the Search Page, selects the Home link
Given User lands on Search Page
When  User selects the Home link
Then  Redirect User to the Home Page

Scenario: User on the Search Page, selects the Search link
Given User lands on Search Page
When  User selects the Search link
Then  Redirect User to the Search Page

Scenario Outline: User on the Search Page, enters text
Given User lands on Search Page
When  User selects form and enters text <Text>
Then  Display text as an Alert upon submission
Examples:
	| Text 							          |	
	| "abc"			  							  |
	| "123"   							      |
	| "This is a test sentence!"  |
	| "Hello World!"  		   			|
	| "Just Searching"            | 