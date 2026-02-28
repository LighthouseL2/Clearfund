/**
 * Donation contract configuration
 * Token addresses and ABIs for G$ and CELO donations on the Celo network
 */

// GoodDollar (G$) token on Celo mainnet
export const G_DOLLAR_ADDRESS = '0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A'

// CELO native token wrapper (for balance checks via ERC20 interface)
// CELO is the native gas token, so native transfers are used for CELO donations
export const CELO_TOKEN_ADDRESS = '0x471EcE3750Da237f93B8E339c536989b8978a438'

// Minimal ERC20 ABI for token interactions
export const ERC20_ABI = [
    {
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Transfer event for querying donation history
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: true, name: 'to', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
    },
]

// Token configuration
export const SUPPORTED_TOKENS = [
    {
        name: 'GoodDollar',
        symbol: 'G$',
        address: G_DOLLAR_ADDRESS,
        decimals: 18, // G$ uses 18 decimals on Celo (verified on CeloScan)
        icon: '/donate-icons/Gooddollar-icon.svg',
        isNative: false,
    },
    /* {
        name: 'Celo',
        symbol: 'CELO',
        address: CELO_TOKEN_ADDRESS,
        decimals: 18, // CELO uses 18 decimals
        icon: '/donate-icons/celo-icon.svg',
        isNative: true, // CELO is the native gas token
    }, */
]

// Collective pool addresses (the addresses that receive donations)
// These correspond to the collectives displayed on the donate page
export const COLLECTIVE_ADDRESSES = {
    1: '0x0d43131f1577310D6349bAF9D6Da4fC1Cd39764C', // GoodDollar UBI+ for Women – Colombia
    2: '0xC1dCdf8E70acB44CDbB688C91A4883Cf9052Ea9c', // Silvi - Kenya's Kakamega forest
    3: '0xDd1c12f197E6D1E2FBA15487AaAE500eF6e07BCA', // GoodDollar UBI+ for Women – Nigeria 
    4: '0xE4f65e8644C0f3a1C7ef0BA0F1428A82cDc0E7Bc', // Pesia's Kitchen EAT Initiative 
    5: '0xf3d629a2c198fC91d7D3F18217684166C83C7312', // Global Classrooms Environmental Education
}

// Default collective address (used when no specific collective is selected)
export const DEFAULT_COLLECTIVE_ADDRESS = '0x0d43131f1577310D6349bAF9D6Da4fC1Cd39764C'

// Celo chain configuration
export const CELO_CHAIN_ID = 42220

// Celoscan explorer base URLs
export const CELOSCAN_BASE_URL = 'https://celoscan.io'
export const CELOSCAN_TX_URL = (txHash) => `${CELOSCAN_BASE_URL}/tx/${txHash}`
export const CELOSCAN_ADDRESS_URL = (address) => `${CELOSCAN_BASE_URL}/address/${address}`
