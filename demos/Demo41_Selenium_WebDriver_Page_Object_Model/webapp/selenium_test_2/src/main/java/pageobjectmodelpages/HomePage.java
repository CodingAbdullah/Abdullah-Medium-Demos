package pageobjectmodelpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    private WebDriver driver;
    
    // Constructor to initialize Web Driver and the Page Web Elements
    public HomePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Retrieve Heading text
    public String getHeadingText() {
        return this.driver.findElement(By.tagName("h1")).getText();
    }
    
    // Retrieve Paragraph Text
    public String getParagraphText() {
    	return this.driver.findElement(By.tagName("i")).getText();
    }
    
    // Close Web Driver
    public void closeDriver() {
    	this.driver.close();
    }
}