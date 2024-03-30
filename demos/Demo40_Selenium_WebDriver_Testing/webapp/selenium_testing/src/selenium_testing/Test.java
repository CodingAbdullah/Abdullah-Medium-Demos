package selenium_testing;

import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Test {
	
	public static void main(String[] args) {	
		
		// Setting System property to Chrome Driver
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		// Maximize the window		
		driver.manage().window().maximize();

		// Implicitly wait 1 second for each action
		// Access the React application on localhost:3000
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
		driver.get("http://localhost:3000/");
		
		driver.close(); // Close the driver
	}
}