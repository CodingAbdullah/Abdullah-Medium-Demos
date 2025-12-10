function removeDuplicates(s: string): string {
    let stringStack = [];

    for (let i = 0; i < s.length; i++) {
        // Check if stack is empty
        if (stringStack.length === 0) {
            stringStack.push(s.charAt(i)); // Push character to end
        }
        else {
            // Compare new character to the latest pushed element to stack
            let characterElement = stringStack[stringStack.length - 1];

            // If incoming character is equal character element
            // Pop element
            if (characterElement === s.charAt(i)) {
                stringStack.pop();
            }
            else {
                // Push element to string stack
                stringStack.push(s.charAt(i));
            }
        }
    }

    // Join all the elements of the string array to formulate a string
    return stringStack.join(""); 
};