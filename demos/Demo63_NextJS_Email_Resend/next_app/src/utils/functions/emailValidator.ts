import { isEmail } from 'validator';

// Function that validates a string and checks to see if it is an email address or not
export default function emailValidator(email: string) {
    return isEmail(email);
}