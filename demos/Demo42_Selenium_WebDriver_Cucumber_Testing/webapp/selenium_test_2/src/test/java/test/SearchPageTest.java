package test;

import java.time.Duration;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import pages.SearchPage;

public class SearchPageTest {
	
	// Search Page Testing
	public static void main(String[] args) {
		
		// Set System property to point to the Chrome driver executable file
		// Instantiate a web driver of type Chrome driver
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		// Maximizing Window size
		// Setting Implicit Wait between actions to two seconds
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
		driver.manage().window().maximize(); 
		
		// Launch the React application on the development server
		// Access it through localhost
		driver.get("http://localhost:3000"); 
		
		// Instantiate a Search Page object and pass in the customized web driver
		SearchPage searchPage = new SearchPage(driver);
				
		// Test to check if valid number of Anchor elements are present
		System.out.println("Test 1: " + (searchPage.getAnchorTextLength() == 2));
		
		// If so, proceed to select the Search Anchor element
		// Find the second link in the Navbar and click to navigate to the Search page
		if (searchPage.getAnchorTextLength() == 2) {
			searchPage.selectSearchAnchorText();
			System.out.println("Test 2: " + (searchPage.getPageURL().equals("http://localhost:3000/search")));
			
			// Proceed to the next test
			// Check to see if the Search Page title text matches its intended value
			if (searchPage.getPageURL().equals("http://localhost:3000/search")) {
				System.out.println("Test 3: " + (searchPage.getSearchPageHeadingText().equals("Search Form")));
				
				// Proceed to the next test
				// Check to see if the Search Page paragraph text matches its intended value
				if (searchPage.getSearchPageHeadingText().equals("Search Form")) {
					System.out.println("Test 4: " + (searchPage.getSearchPageParagraphText().equals("Testing application search functionality")));
						
					// Proceed to the next test
					// Check to see if an input field exists
					if ((searchPage.getSearchPageParagraphText().equals("Testing application search functionality"))) {
						System.out.println("Test 5: " + (searchPage.getSearchPageFormInputListLength() == 1));	
						
						// Proceed to the next test
						// Check to see if the submit button exists
						if (searchPage.getSearchPageFormInputListLength() == 1) {
							System.out.println("Test 6: " + (searchPage.getFormButtonInput().equals("Submit")));
							// Proceed to the next test
							// Fill in the input field and click submit
							// Alert should appear at this point
							searchPage.setFormInput("This is a test sentence!");
							searchPage.clickFormButton();
							
							// Switch the window reference to the Alert window
							Alert alert = searchPage.getWebDriver().switchTo().alert();
							System.out.println("Test 7: " + alert.getText().equals("This is a test sentence!"));
							
							// Close the Alert and proceed to close the web driver
							if (alert.getText().equals("This is a test sentence!")) {
								alert.dismiss();
								searchPage.closeDriver();
							}
							else {
								searchPage.closeDriver();
							}
						}
						else {
							searchPage.closeDriver();
						}
					}
					else {
						searchPage.closeDriver();
					}
				}
				else {
					searchPage.closeDriver();
				}
			}
			else {
				searchPage.closeDriver();
			}
		}
		
		// Once testing is complete, close the web driver session
		searchPage.closeDriver();
	}
}