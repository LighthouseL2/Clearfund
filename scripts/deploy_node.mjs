/**
 * ClearFundRegistry Deployment Script (Node.js + ethers.js)
 * Deploys to Celo Sepolia Testnet (Alfajores is deprecated since Sep 2025)
 * 
 * Usage: node scripts/deploy_node.mjs
 */

import { ethers } from "ethers";
import solc from "solc";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(ROOT, ".env") });

// --- Configuration ---
const RPC_URL = "https://forno.celo-sepolia.celo-testnet.org";
const CHAIN_ID = 11142220;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
    console.error("-".repeat(50));
    console.error("ERROR: PRIVATE_KEY not found in .env file!");
    console.error('Please add PRIVATE_KEY="0x..." to your .env file');
    console.error("-".repeat(50));
    process.exit(1);
}

// Normalize: ensure 0x prefix
const normalizedKey = PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : "0x" + PRIVATE_KEY;

// --- Solidity Compiler Helper ---
function findImports(importPath) {
    const candidates = [
        path.join(ROOT, "node_modules", importPath),
        path.join(ROOT, "node_modules", "@openzeppelin", "contracts", importPath.replace("@openzeppelin/contracts/", "")),
    ];

    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return { contents: fs.readFileSync(candidate, "utf8") };
        }
    }
    return { error: `File not found: ${importPath}` };
}

function compileSolidity() {
    console.log("\n[1/4] Compiling ClearFundRegistry.sol...");

    const contractPath = path.join(ROOT, "src", "contracts", "ClearFundRegistry.sol");
    const source = fs.readFileSync(contractPath, "utf8");

    const input = {
        language: "Solidity",
        sources: {
            "ClearFundRegistry.sol": { content: source },
        },
        settings: {
            optimizer: { enabled: true, runs: 200 },
            evmVersion: "paris",
            outputSelection: {
                "*": {
                    "*": ["abi", "evm.bytecode.object"],
                },
            },
        },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

    // Check for errors
    if (output.errors) {
        const errors = output.errors.filter((e) => e.severity === "error");
        if (errors.length > 0) {
            console.error("Compilation errors:");
            errors.forEach((e) => console.error(e.formattedMessage));
            process.exit(1);
        }
        // Show warnings but continue
        const warnings = output.errors.filter((e) => e.severity === "warning");
        if (warnings.length > 0) {
            warnings.forEach((w) => console.warn("  Warning:", w.message));
        }
    }

    const contractOutput = output.contracts["ClearFundRegistry.sol"]["ClearFundRegistry"];
    const abi = contractOutput.abi;
    const bytecode = "0x" + contractOutput.evm.bytecode.object;

    console.log(`  Compiled successfully! Bytecode size: ${(bytecode.length / 2).toLocaleString()} bytes`);
    return { abi, bytecode };
}

// --- Deploy ---
async function deploy() {
    const { abi, bytecode } = compileSolidity();

    console.log(`\n[2/4] Connecting to Celo Sepolia Testnet...`);
    console.log(`  RPC: ${RPC_URL}`);
    console.log(`  Chain ID: ${CHAIN_ID}`);

    const provider = new ethers.JsonRpcProvider(RPC_URL, CHAIN_ID);
    const wallet = new ethers.Wallet(normalizedKey, provider);

    const address = wallet.address;
    const balanceWei = await provider.getBalance(address);
    const balanceCelo = ethers.formatEther(balanceWei);

    console.log(`  Deployer: ${address}`);
    console.log(`  Balance: ${balanceCelo} CELO`);

    if (balanceWei === 0n) {
        console.error("\n  ERROR: Wallet has 0 CELO. Get testnet tokens from https://faucet.celo.org/celo-sepolia");
        process.exit(1);
    }

    console.log(`\n[3/4] Deploying contract...`);
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();

    console.log(`  Transaction sent: ${contract.deploymentTransaction().hash}`);
    console.log(`  Waiting for confirmation...`);

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    // Verify the deployment by reading contract values
    console.log(`\n[4/4] Verifying deployment...`);
    const deployed = new ethers.Contract(contractAddress, abi, provider);
    const contractName = await deployed.CONTRACT_NAME();
    const version = await deployed.VERSION();

    console.log("\n" + "=".repeat(55));
    console.log("  DEPLOYMENT SUCCESSFUL!");
    console.log("=".repeat(55));
    console.log(`  Contract:  ${contractName}`);
    console.log(`  Version:   ${version}`);
    console.log(`  Address:   ${contractAddress}`);
    console.log(`  Network:   Celo Sepolia Testnet`);
    console.log(`  Explorer:  https://celo-sepolia.celoscan.io/address/${contractAddress}`);
    console.log("=".repeat(55));
    console.log(`\n  Add this to your .env file:`);
    console.log(`  NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS=${contractAddress}`);
    console.log();
}

deploy().catch((err) => {
    console.error("\nDeployment failed:", err.message || err);
    process.exit(1);
});
