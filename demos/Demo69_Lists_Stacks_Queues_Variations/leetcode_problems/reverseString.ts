// Use a stack and stack specific operations to solve this problem 
 function reverseString(s: string): string {
    let stack: string[] = []; // Initialize an empty array which will operate as a stack

    // Evaluate the base cases
    if (s === '') {
        return '';
    }
    else if (s.length === 1) {
        return s;
    }
    else {
        for (let i = 0; i < s.length; i++) {
            stack.push(s.charAt(i)); // Push each character (left to right) onto the stack
        }
        let reversedString = '';
        let character: string | undefined;

        // Pop all elements off the stack and push to the empty string and return it
        while ((character = stack.pop()) !== undefined) {
            reversedString += character;
        }

        return reversedString;
    }
 };