// Custom Address Validator function
export default function addressValidator(walletAddress: string): boolean {
    // Run a condition to check wallet address validity
    if (walletAddress.length !== 42 || walletAddress.substring(0, 2) !== '0x' || walletAddress === null) {
        return false;
    }
    else {
        return true;
    }
}