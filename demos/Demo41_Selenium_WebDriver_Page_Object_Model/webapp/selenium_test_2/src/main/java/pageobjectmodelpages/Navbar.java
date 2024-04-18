package pageobjectmodelpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class Navbar {
    private WebDriver driver;
    
    // Constructor to initialize Web Driver and the Page Web Elements
    public Navbar(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Retrieve Heading Anchor text
    public String getNavbarHeadingAnchorText() {
        return this.driver.findElements(By.tagName("a")).get(0).getText();
    }
    
    // Retrieve Search Anchor text
    public String getNavbarSearchAnchorText() {
        return this.driver.findElements(By.tagName("a")).get(1).getText();
    }
    
    // Retrieve length of Navbar Anchor Text
    public int getNavbarAnchorTextListLength() {
    	return this.driver.findElements(By.tagName("a")).size();
    }
    
    // Close Web Driver
    public void closeDriver() {
    	this.driver.close();
    }
}