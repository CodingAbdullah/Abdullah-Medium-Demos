const bcryptjs = require("bcryptjs");
const password = '123456'; // Lame, but nonetheless, demonstrating it works ;)

// First the salting..
// Generate the hash for the password
( async () => { 
    try {
        const saltValue = await bcryptjs.genSaltSync(10);
        const hashedValue = await bcryptjs.hashSync(password, saltValue);
        
        console.log(hashedValue);

        // Now compare, hypothetically, that the user enters the same password
        let userEnteredPassword = '123456';
        const correctOrNot = await bcryptjs.compareSync(userEnteredPassword, hashedValue);

        console.log("Comparison yields the following boolean value: " + correctOrNot);
    }
    catch (error) {
        console.log("Unable to perform the operation: " + error);
    }
}
)();