package pages;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavbarTest {

	public static void main(String[] args) {
		
		// Set System property to point to the Chrome driver executable file
		// Instantiate a web driver of type Chrome driver
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		// Maximizing window size
		// Setting implicit wait between actions to two seconds
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
		driver.manage().window().maximize(); 
		
		// Launch the React application on the development server
		// Access it through localhost
		driver.get("https://localhost:3000"); 
		
		// Get a list of all the anchor elements within the Navbar
		List<WebElement> anchorElementsList = driver.findElements(By.tagName("a"));
		
		// Test Home Page features using Selenium locators
		System.out.println("Test 1: " + isValidAnchorElementSize(anchorElementsList));
		System.out.println("Test 2: " + isValidHomeNavbarLink(anchorElementsList.get(0).getText()));
		System.out.println("Test 3: " + isValidSearchPageNavbarLink(anchorElementsList.get(1).getText()));
	
		// Once testing is complete, close the web driver session
		driver.quit();
	}
	
	// Size of the anchor list should be 2
	private static boolean isValidAnchorElementSize(List<WebElement> anchorList) {
		return anchorList.size() == 2;
	}
	
	// Check to see if anchor elements have matching text
	private static boolean isValidHomeNavbarLink(String homeNavbarLinkText) {
		return homeNavbarLinkText.equals("Selenium WebDriver Testing");
	}
	
	private static boolean isValidSearchPageNavbarLink(String searchNavbarLinkText) {
		return searchNavbarLinkText.equals("Search");
	}
}