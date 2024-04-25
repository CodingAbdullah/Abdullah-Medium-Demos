package stepDefinitions;

import java.time.Duration;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.HomePage;
import pages.Navbar;


public class HomePageStepDefinition {
	private WebDriver driver;
	private HomePage homePageInstance;	
	private Navbar navbarInstance;
	
	@Given("User lands on Home Page")
	public void user_lands_on_Home_Page() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe"); // Wild card address added for example

		this.driver = new ChromeDriver(); // Setting up driver
		this.driver.get("http://localhost:3000"); // Launch home page of the Cucumber Framework project

		this.driver.manage().window().maximize(); // Maximize window
		this.driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
		 
		homePageInstance = new HomePage(this.driver);
		navbarInstance = new Navbar(this.driver);

		String homePageTitle = homePageInstance.getHeadingText();
		String homeParagraphText = homePageInstance.getParagraphText();
		
		Assert.assertEquals("http://localhost:3000", this.driver.getCurrentUrl());
		Assert.assertEquals("The Cucumber Framework", homePageTitle);
		Assert.assertEquals("Utilizing Selenium WebDriver using a new testing framework", homeParagraphText);
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
}