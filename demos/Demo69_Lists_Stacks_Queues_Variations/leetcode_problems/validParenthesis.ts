function isValid(s: string): boolean {
    // traverse through the string using the stack data structure
    let bracketMap = new Map<string, string>();
    let bracketStack = [];

    bracketMap.set("(", ")");
    bracketMap.set("[", "]");
    bracketMap.set("{", "}");

    for (let i = 0; i < s.length; i++){
        if (bracketMap.has(s.charAt(i))) {
            bracketStack.push(s.charAt(i)); // Push the opening brace to stack
        }
        else {
            let element = bracketStack.pop(); // Run a comparison to the popped element
            if (bracketMap.get(element) !== s.charAt(i)) {
                return false; // If no match is found, return false
            }
            else {
                continue;
            }
        }
    }

    return bracketStack.length === 0 ? true : false; // Reach here, it is assumed to have worked
}