package pageobjectmodelpages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

public class SearchPage {
    private WebDriver driver;

    // Constructor to initialize Web Driver and the Page Web Elements
    public SearchPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    // Retrieve Anchor texts
    public List<WebElement> getAnchorTextList(){
    	return this.driver.findElements(By.tagName("a"));
    }
    
    // Select the Home Anchor text
    public void selectHomeAnchorText() {
    	this.driver.findElements(By.tagName("a")).get(0).click();
    }
    
    // Select the Search Anchor text
    public void selectSearchAnchorText() {
    	this.driver.findElements(By.tagName("a")).get(1).click();
    }
    
    // Return Anchor List length
    public int getAnchorTextLength() {
    	return this.driver.findElements(By.tagName("a")).size();
    }
    
    // Retrieve Page URL
    public String getPageURL() {
    	return this.driver.getCurrentUrl();
    }  
    
    // Retrieve Search Page Form Input list
    public int getSearchPageFormInputListLength() {
    	return this.driver.findElements(By.tagName("input")).size();
    }
    
    // Retrieve Search Page Heading text
    public String getSearchPageHeadingText() {
    	return this.driver.findElement(By.tagName("h3")).getText();
    }
    
    // Retrieve Search Page Paragraph text
    public String getSearchPageParagraphText() {
    	return this.driver.findElement(By.tagName("i")).getText();
    }
    
    // Retrieve Form Button text
    public String getFormButtonInput() {
    	return this.driver.findElement(By.tagName("button")).getText();
    }
    
    // Select the Search Page button
    public void clickFormButton() {
    	this.driver.findElement(By.tagName("button")).click();
    }
    
    // Enter Values into Form input
    public void setFormInput(String input) {
    	this.driver.findElements(By.tagName("input")).get(0).sendKeys(input);
    }
    
    // Return Web Driver instance for testing
    public WebDriver getWebDriver() {
    	return this.driver;
    }
    
    // Close Web Driver
    public void closeDriver() {
    	this.driver.close();
    }
}