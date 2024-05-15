package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

import jakarta.mail.MessagingException;
import util.JavaMailUtil;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class PricesPage {
	private WebDriver driver;
	private String email;
	private String password;
	
	// Initializing the page and start by retrieving coin prices and collect data to send email
	public PricesPage(WebDriver driver, String email, String password) throws MessagingException {
		this.driver = driver;
		this.email = email;
		this.password = password;
		PageFactory.initElements(driver, this);
		
		findCoinPrices();
	}
			
	// Retrieving the prices of the three coins from the CoinGecko cryptocurrency price page
	@FindBy(xpath="//table[1]/tbody[1]/tr[1]/td[5]/span[1]")
	private WebElement bitcoinPriceWebElement;

	@FindBy(xpath="//table[1]/tbody[1]/tr[2]/td[5]/span[1]")
	private WebElement ethereumPriceWebElement;
		
	@FindBy(xpath="//table[1]/tbody[1]/tr[5]/td[5]/span[1]")
	private WebElement solanaPriceWebElement;
	
	// Helper methods for sending back web driver and cryptocurrency prices	
	public String getBitcoinPrice() {
		return this.bitcoinPriceWebElement.getText();
	}
		
	public String getEthereumPrice() {
		return this.ethereumPriceWebElement.getText();
	}
		
	public String getSolanaPrice() {
		return this.solanaPriceWebElement.getText();
	}
		
	public WebDriver getWebDriver() {
		return this.driver;
	}
	
	public void findCoinPrices() throws MessagingException {
		String msg = "Cryptocurrency Prices: \n";
		msg += "Bitcoin: " + getBitcoinPrice() + "\n";
		msg += "Ethereum: " + getEthereumPrice() + "\n";
		msg += "Solana: " + getSolanaPrice() + "\n";

		// Once all the data formatting is complete, pass in the msg for the email along with email and password
		JavaMailUtil.sendEmail(msg, email, password);
	}		
}