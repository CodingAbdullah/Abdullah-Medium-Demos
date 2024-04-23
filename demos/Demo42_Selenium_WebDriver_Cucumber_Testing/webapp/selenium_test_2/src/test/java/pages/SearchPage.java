package pages;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class SearchPage {
    private WebDriver driver;

    // Constructor to initialize Web Driver and the Page Web Elements
    public SearchPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    // Find elements using the @FindBy annotation
    @FindBy(tagName="a")
    private List<WebElement> anchorList;

    @FindBy(tagName="h3")
    private WebElement searchPageHeadingText;

    @FindBy(tagName="i")
    private WebElement searchPageParagraphText;
    
    @FindBy(tagName="input")
    private List<WebElement> searchPageFormInputList;
    
    @FindBy(tagName="button")
    private WebElement searchPageFormButton;
    
    // Retrieve Anchor texts
    public List<WebElement> getAnchorTextList(){
    	return this.anchorList;
    }
    
    // Select the Home Anchor text
    public void selectHomeAnchorText() {
    	this.anchorList.get(0).click();
    }
    
    // Select the Search Anchor text
    public void selectSearchAnchorText() {
    	this.anchorList.get(1).click();
    }
    
    // Return Anchor List length
    public int getAnchorTextLength() {
    	return this.anchorList.size();
    }
    
    // Retrieve Page URL
    public String getPageURL() {
    	return this.driver.getCurrentUrl();
    }  
    
    // Retrieve Search Page Form Input list
    public int getSearchPageFormInputListLength() {
    	return this.searchPageFormInputList.size();
    }
    
    // Retrieve Search Page Heading text
    public String getSearchPageHeadingText() {
    	return this.searchPageHeadingText.getText();
    }
    
    // Retrieve Search Page Paragraph text
    public String getSearchPageParagraphText() {
    	return this.searchPageParagraphText.getText();
    }
    
    // Retrieve Form Button text
    public String getFormButtonInput() {
    	return this.searchPageFormButton.getText();
    }
    
    // Select the Search Page button
    public void clickFormButton() {
    	this.searchPageFormButton.click();
    }
    
    // Enter Values into Form input
    public void setFormInput(String input) {
    	this.searchPageFormInputList.get(0).sendKeys(input);
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