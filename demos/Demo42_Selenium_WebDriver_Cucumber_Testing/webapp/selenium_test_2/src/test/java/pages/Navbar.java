package pages;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class Navbar {
    private WebDriver driver;
    
    // Constructor to initialize Web Driver and the Page Web Elements
    public Navbar(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Find Page elements using the @FindBy annotation
    @FindBy(tagName="a")
    private List<WebElement> anchorTagList;

    // Select the Navbar Heading Anchor text
    public void selectNavbarHeadingAnchorText() {
    	anchorTagList.get(0).click();
    }
    
    // Select the Navbar Search Anchor text
    public void selectNavbarSearchAnchorText() {
    	anchorTagList.get(1).click();
    }
    
    // Retrieve Heading Anchor text
    public String getNavbarHeadingAnchorText() {
        return anchorTagList.get(0).getText();
    }
    
    // Retrieve Search Anchor text
    public String getNavbarSearchAnchorText() {
        return anchorTagList.get(1).getText();
    }
    
    // Retrieve length of Navbar Anchor Text
    public int getNavbarAnchorTextListLength() {
    	return anchorTagList.size();
    }
    
    // Close Web Driver
    public void closeDriver() {
    	this.driver.close();
    }
    
    // Return Web Driver
    public WebDriver getWebDriver() {
    	return this.driver;
    }
}