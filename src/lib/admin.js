export const ADMIN_WALLETS = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Example Admin 1
    "0xEB9DB871Bcf34193F7D2f505698bA4A9A6588667", // Example Admin 2
    // Add other admin wallet addresses here
];

export function isAdmin(address) {
    if (!address) return false;
    return ADMIN_WALLETS.some(admin => admin.toLowerCase() === address.toLowerCase());
}
