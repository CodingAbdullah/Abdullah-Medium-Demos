package pagefactorypages;

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
    @FindBy(tagName = "a")
    private List<WebElement> anchorList;

    @FindBy(tagName = "h3")
    private WebElement searchPageHeadingText;

    @FindBy(tagName = "i")
    private WebElement searchPageParagraphText;
    
    @FindBy(tagName = "input")
    private List<WebElement> searchPageFormInputList;
    
    @FindBy(tagName = "button")
    private WebElement searchPageFormButton;
    
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
    
    // Select the Search Page Button
    public void clickFormButton() {
    	this.searchPageFormButton.click();
    }
    
    // Enter Values into Form Input
    public void setFormInput(String input) {
    	this.searchPageFormInputList.get(0).sendKeys(input);
    }
    
    // Return Anchor List length
    public int getAnchorTextLength() {
    	return this.anchorList.size();
    }
    
    // Return Web Driver instance for testing
    public WebDriver getWebDriver() {
    	return this.driver;
    }
}