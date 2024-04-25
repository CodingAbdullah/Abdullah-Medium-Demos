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
import pages.SearchPage;

public class NavbarStepDefinition {
	private WebDriver driver;
	private HomePage homePageInstance;
	private SearchPage searchPageInstance;
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
		
		Assert.assertEquals("http://localhost:3000", homePageInstance.getWebDriver().getCurrentUrl());
		Assert.assertEquals("The Cucumber Framework", homePageTitle);
		Assert.assertEquals("Utilizing Selenium WebDriver using a new testing framework", homeParagraphText);
	}
	
	@Given("User lands on Search Page")
	public void user_lands_on_Search_Page() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe"); // Wild card address added for example

		this.driver = new ChromeDriver(); // Setting up driver
		this.driver.get("http://localhost:3000"); // Launch home page of the Cucumber Framework Project

		this.driver.manage().window().maximize(); // Maximize window
		this.driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
		 
		homePageInstance = new HomePage(this.driver);
		searchPageInstance = new SearchPage(this.driver);
		navbarInstance = new Navbar(this.driver);

		navbarInstance.selectNavbarSearchAnchorText();
		
		Assert.assertEquals("http://localhost:3000/search", searchPageInstance.getWebDriver().getCurrentUrl());
		Assert.assertEquals("Search Form", searchPageInstance.getSearchPageHeadingText());
		Assert.assertEquals("Testing application search functionality", searchPageInstance.getSearchPageParagraphText());
	}
	
	// Testing selecting the Navbar link on any page
	@When("User selects the Navbar")
	public void user_selects_the_navbar() {
		String navbarHomeAnchorText = navbarInstance.getNavbarHeadingAnchorText();
		String navbarSearchAnchorText = navbarInstance.getNavbarSearchAnchorText();
		
		Assert.assertEquals("Selenium WebDriver and the Cucumber Framework", navbarHomeAnchorText);
		Assert.assertEquals("Search", navbarSearchAnchorText);
	}

	// Testing User redirect to Search Page
	@Then("Navbar links should be visible")
	public void navbar_links_should_be_visible() {
		navbarInstance.selectNavbarHeadingAnchorText();
		String homeAnchorURL = navbarInstance.getWebDriver().getCurrentUrl();
		
		navbarInstance.selectNavbarSearchAnchorText();
		String searchAnchorURL = navbarInstance.getWebDriver().getCurrentUrl();
		
		Assert.assertEquals("http://localhost:3000", homeAnchorURL);
		Assert.assertEquals("http://localhost:3000/search", searchAnchorURL);
	}
}