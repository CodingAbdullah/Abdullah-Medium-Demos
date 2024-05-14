package util;

import java.util.Properties;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

public class JavaMailUtil {
	
	public static void sendEmail(String msg, String emailAddress, String password) throws MessagingException {
		Properties properties = new Properties();
		
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com"); // Configurations set to GMail by default accessing port 587
		properties.put("mail.smtp.port", "587");
	
		Session session = Session.getInstance(properties, new Authenticator() {
		
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(emailAddress, password); // Authenticate credentials here
			}
		});
		
		Message message = prepareMessage(session, emailAddress, password, msg); // Specify the item bought and the price
		
		Transport.send(message);
		System.out.println("Message sent successfully");
	}

	public static Message prepareMessage(Session session, String emailAddress, String password, String msg) {
		try {
			
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(emailAddress));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(emailAddress)); // Recipient is the same as sender
			message.setSubject("BTC, ETH, SOL Cryptocurrency Prices");
			message.setText(msg); // Populate the message

			return message;
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
}
