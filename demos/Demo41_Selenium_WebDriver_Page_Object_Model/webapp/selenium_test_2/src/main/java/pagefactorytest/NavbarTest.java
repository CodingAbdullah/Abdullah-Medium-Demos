package pagefactorytest;

import java.time.Duration;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import pagefactorypages.Navbar;

public class NavbarTest {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		WebDriver driver = new ChromeDriver();
				
		// Maximizing window size
		// Setting implicit wait between actions to two seconds
		// Launch the React application on the development server
		// Access it through localhost
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
		driver.manage().window().maximize(); 
		driver.get("https://localhost:3000"); 
		
		// Instantiate a Navbar Page object and pass in the customized web driver
		Navbar navbar = new Navbar(driver);
		
		// Test Home Page features using Selenium locators
		System.out.println("Test 1: " + (navbar.getNavbarAnchorTextListLength() == 2));
		System.out.println("Test 2: " + (navbar.getNavbarHeadingAnchorText().equals("Selenium WebDriver Testing")));
		System.out.println("Test 3: " + (navbar.getNavbarSearchAnchorText().equals("Search")));
	
		// Once testing is complete, close the web driver session
		navbar.closeDriver();
	}
}