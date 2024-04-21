package pagefactorytest;

import pagefactorypages.HomePage;

import java.time.Duration;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class HomePageTest {

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
		
		// Instantiate a Home Page object and pass in the customized web driver
		HomePage homePage = new HomePage(driver);
		
		// Test Home Page features using Selenium locators
		System.out.println("Test 1: " + homePage.getHeadingText().equals("Selenium WebDriver POM and Page Factory")); 
		System.out.println("Test 2: " + homePage.getParagraphText().equals("Utilizing the POM and Page Factory using Selenium WebDriver"));
	
		// Once testing is complete, close the web driver session
		homePage.closeDriver();
	}
}