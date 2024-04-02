package pages;

import java.time.Duration;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class HomePageTest {

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
		
		// Test Home Page features using Selenium locators
		System.out.println("Test 1: " + isValidHomePageTitle(driver.findElement(By.tagName("h1")).getText()));
		System.out.println("Test 2: " + isValidHomePageParagraphText(driver.findElement(By.tagName("i")).getText()));
	
		// Once testing is complete, close the web driver session
		driver.quit();
	}
	
	private static boolean isValidHomePageTitle(String title) {
		return title.equals("Selenium WebDriver Testing Application");
	}
	
	private static boolean isValidHomePageParagraphText(String paragraphText) {
		return paragraphText.equals("Testing React applications using Selenium WebDriver");
	}
}