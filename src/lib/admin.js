export const ADMIN_WALLETS = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Example Admin 1
    "0xEB9DB871Bcf34193F7D2f505698bA4A9A6588667", // Example Admin 2
    "0xBBab0Ae09B7DBE12c6123D5449843f99F189f35e", // Authorized user
];

export function isAdmin(address) {
    if (!address) return false;
    return ADMIN_WALLETS.some(admin => admin.toLowerCase() === address.toLowerCase());
}
