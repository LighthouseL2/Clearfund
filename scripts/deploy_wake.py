# scripts/deploy_wake.py
from wake.deployment import *
from pytypes.src.contracts.ClearFundRegistry import ClearFundRegistry
import os
from dotenv import load_dotenv

# Load environment variables (ensure PRIVATE_KEY is in your .env or terminal)
load_dotenv()

# Mainnet connect: @default_chain.connect("https://forno.celo.org")
@default_chain.connect("https://alfajores-rpc.celo-community.org") # Alfajores Testnet RPC
def main():
    # Load your private key securely
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        print("-" * 50)
        print("ERROR: PRIVATE_KEY not found in environment or .env file!")
        print("Please add 'PRIVATE_KEY=0x...' to your .env file or terminal session.")
        print("-" * 50)
        return

    deployer = default_chain.accounts.add(private_key)
    print(f"\n🚀 Deploying ClearFund Registry from: {deployer.address}")
    print(f"💰 Balance: {deployer.balance / 10**18} CELO")

    # Deploy the contract
    # Wake handles gas, nonces, and transaction confirmation automatically
    print("\n⏳ Sending transaction...")
    registry = ClearFundRegistry.deploy(from_=deployer)

    print("-" * 50)
    print(f"✅ SUCCESS! ClearFundRegistry deployed to: {registry.address}")
    print(f"📦 Contract Name: {registry.CONTRACT_NAME()}")
    print(f"📜 Version: {registry.VERSION()}")
    print("-" * 50)
    print("\nCopy this address to your .env file as:")
    print(f"NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS={registry.address}")

if __name__ == "__main__":
    main()
