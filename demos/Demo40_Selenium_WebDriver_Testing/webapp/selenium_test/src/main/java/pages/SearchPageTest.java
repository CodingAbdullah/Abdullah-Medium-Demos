package pages;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SearchPageTest {

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
		
		// Test to check if valid number of anchor elements are present
		System.out.println("Test 1: " + isValidAnchorElementSize(anchorElementsList));
		
		// If so, proceed to select the Search anchor element
		// Find the second link in the Navbar and click to navigate to the Search page
		if (isValidAnchorElementSize(anchorElementsList)) {
			anchorElementsList.get(2).click();
			System.out.println("Test 2: " + isValidSearchPageURL(driver.getCurrentUrl()));
			
			// Proceed to the next test
			// Check to see if the Search Page title text matches its intended value
			if (isValidSearchPageURL(driver.getCurrentUrl())) {
				System.out.println("Test 3: " + isValidSearchPageTitle(driver.findElement(By.tagName("h3")).getText()));
				
				// Proceed to the next test
				// Check to see if the Search Page paragraph text matches its intended value
				if (isValidSearchPageTitle(driver.findElement(By.tagName("h3")).getText())) {
					System.out.println("Test 4: " + isValidSearchPageParagraphText(driver.findElement(By.tagName("i")).getText()));
						
					// Proceed to the next test
					// Check to see if an input field exists
					if (isValidSearchPageParagraphText(driver.findElement(By.tagName("i")).getText())) {
						List<WebElement> inputFieldList = driver.findElements(By.tagName("input"));
						System.out.println("Test 5: " + (inputFieldList.size() == 1));	
						
						// Proceed to the next test
						// Check to see if the submit button exists
						if (inputFieldList.size() == 1) {
							System.out.println("Test 6: " + isValidSubmitButton(driver.findElement(By.tagName("button")).getText()));
							
							// Proceed to the next test
							// Fill in the input field and click submit
							// Alert should appear at this point
							inputFieldList.get(0).sendKeys("This is a test sentence!");
							driver.findElement(By.tagName("button")).click();
							
							// Switch the window reference to the alert window
							Alert alert = driver.switchTo().alert();
							System.out.println("Test 7: " + isValidAlertText(alert.getText()));
							
							// Close the alert and proceed to close the web driver
							if (isValidAlertText(alert.getText())) {
								alert.dismiss();
								driver.quit();
							}
							else {
								driver.quit();
							}
						}
						else {
							driver.quit();
						}
					}
					else {
						driver.quit();
					}
				}
				else {
					driver.quit();
				}
			}
			else {
				driver.quit();
			}
		}
		// Once testing is complete, close the web driver session
		driver.quit();
	}
	
	// Validate the size of the Anchor list (should be 2)
	private static boolean isValidAnchorElementSize(List<WebElement> anchorList) {
		return anchorList.size() == 2;
	}
	
	// Validate the correct Search Page URL
	private static boolean isValidSearchPageURL(String URL) {
		return URL.equals("http://localhost:3000/search");
	}
	
	// Validate Anchor elements have matching text
	private static boolean isValidSearchPageTitle(String searchPageTitleText) {
		return searchPageTitleText.equals("Search Form");
	}
	
	// Validate Paragraph text on the Search Page
	private static boolean isValidSearchPageParagraphText(String searchPageParagraphText) {
		return searchPageParagraphText.equals("Testing application search functionality");
	}
	
	// Validate the Button text on the Search Page
	private static boolean isValidSubmitButton(String buttonText) {
		return buttonText.equals("Submit");
	}
	
	// Validate the Alert text on the Search Page
	private static boolean isValidAlertText(String alertText) {
		return alertText.equals("This is a test sentence!");
	}
}