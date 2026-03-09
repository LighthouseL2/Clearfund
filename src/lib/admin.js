export const ADMIN_WALLETS = [
    "0xEB9DB871Bcf34193F7D2f505698bA4A9A6588667",
    "0xb4044a66E1d4780398AeF38Af56b4D51797Aea49"
];

export function isAdmin(address) {
    if (!address) return false;
    return ADMIN_WALLETS.some(admin => admin.toLowerCase() === address.toLowerCase());
}
