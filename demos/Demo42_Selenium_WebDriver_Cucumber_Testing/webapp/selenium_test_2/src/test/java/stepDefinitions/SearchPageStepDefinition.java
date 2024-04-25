package stepDefinitions;

import java.time.Duration;

import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.Navbar;
import pages.SearchPage;

public class SearchPageStepDefinition {
	private WebDriver driver;
	private SearchPage searchPageInstance;
	private Navbar navbarInstance;
	
	@Given("User lands on Search Page")
	public void user_lands_on_Search_Page() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe"); // Wild card address added for example

		this.driver = new ChromeDriver(); // Setting up driver
		this.driver.get("http://localhost:3000"); // Launch home page of the Cucumber Framework Project

		this.driver.manage().window().maximize(); // Maximize window
		this.driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
		 
		searchPageInstance = new SearchPage(this.driver);
		navbarInstance = new Navbar(this.driver);

		navbarInstance.selectNavbarSearchAnchorText();
		
		Assert.assertEquals("http://localhost:3000/search", searchPageInstance.getWebDriver().getCurrentUrl());
		Assert.assertEquals("Search Form", searchPageInstance.getSearchPageHeadingText());
		Assert.assertEquals("Testing application search functionality", searchPageInstance.getSearchPageParagraphText());
	}
	
	// Testing selecting the Home Navbar link on Home Page
	@When("User selects the Home link")
	public void user_selects_the_home_link() {
		String navbarHomeAnchorText = navbarInstance.getNavbarHeadingAnchorText();
		Assert.assertEquals(navbarHomeAnchorText, "Selenium WebDriver and the Cucumber Framework");
	}
	
	// Testing selecting the Search Navbar link on Search Page
	@When("User selects the Search link")
	public void user_select_the_search_link() {
		String navbarSearchAnchorText = navbarInstance.getNavbarSearchAnchorText();
		Assert.assertEquals(navbarSearchAnchorText, "Search");
	}
	
	// Testing User input in Search form
	@When("User selects form and enters text \\”([^\\”]*)\\")
	public void user_selects_form_and_enters_text(String text) {
		searchPageInstance.setFormInput(text);
		searchPageInstance.clickFormButton();
	}

	// Testing User redirect to Home Page
	@Then("Redirect User to the Home Page")
	public void redirect_user_to_the_home_page() {
		navbarInstance.selectNavbarHeadingAnchorText();
		Assert.assertEquals("http://localhost:3000", navbarInstance.getWebDriver().getCurrentUrl());
	}
	
	// Testing User redirect to Search Page
	@Then("Redirect User to the Search Page")
	public void redirect_user_to_the_search_page() {
		navbarInstance.selectNavbarSearchAnchorText();
		Assert.assertEquals("http://localhost:3000/search", navbarInstance.getWebDriver().getCurrentUrl());
	}
	
	// Testing Alert window feature
	@Then("Display text as an Alert upon submission")
	public void display_text_as_an_alert_upon_submission() {
		// Switch perspective to Alert window
		Alert alert = searchPageInstance.getWebDriver().switchTo().alert();
		alert.dismiss();
		
		// Setting a default list of strings to ensure alert text matches one of these
		String[] textTypes = new String[] { "abc", "123", "This is a test sentence!", "Hello World!", "Just Searching" };
		String alertText = alert.getText();
		
		boolean matchingFlag = false;
		
		// Check to see if a match is found
		// If so, pass the test
		for (String phrase: textTypes) {
			if (alertText.equals(phrase)) {
				matchingFlag = true;
				break;
			}
		}
		
		Assert.assertEquals(matchingFlag, true);
	}
}