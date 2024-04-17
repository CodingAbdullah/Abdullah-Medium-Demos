package pagefactorypages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    private WebDriver driver;
    
    // Constructor to initialize Web Driver and the Page Web Elements
    public HomePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Find Page elements using the @FindBy annotation
    @FindBy(tagName="h1")
    private WebElement headingText;

    @FindBy(tagName="i")
    private WebElement paragraphText;

    // Retrieve Heading text
    public String getHeadingText() {
        return headingText.getText();
    }
    
    // Retrieve Paragraph Text
    public String getParagraphText() {
    	return paragraphText.getText();
    }
    
    // Close Web Driver
    public void closeDriver() {
    	this.driver.close();
    }
}