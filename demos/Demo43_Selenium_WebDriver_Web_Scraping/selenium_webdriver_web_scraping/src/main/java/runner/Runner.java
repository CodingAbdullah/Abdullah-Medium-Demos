package runner;

import java.time.Duration;
import java.util.Scanner;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import jakarta.mail.MessagingException;
import pages.PricesPage;

public class Runner {
	
	public static void main(String[] args) throws MessagingException, InterruptedException {
		
		try (Scanner scanner = new Scanner(System.in)) {
		
			// Retrieve email and password from user input
			System.out.println("Please enter the email address: ");
			String email = scanner.nextLine();
			
			System.out.println("Please enter the password: ");
			String password = scanner.nextLine();
			
			System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			
			driver.manage().window().maximize();
			
			driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
			driver.get("https://www.coingecko.com/"); // Navigate to the CoinGecko cryptocurrency price page
			
			PricesPage pricesPage = new PricesPage(driver, email, password); // Pass in web driver to Page class
			driver = pricesPage.getWebDriver();	
			
			driver.close(); // Close the driver
		}
	}
}