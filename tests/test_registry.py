# tests/test_registry.py
from wake.testing import *
from pytypes.src.contracts.ClearFundRegistry import ClearFundRegistry
import pytest

@default_chain.connect()
def test_full_registry_workflow():
    # 1. Setup Accounts
    admin = default_chain.accounts[0]
    moderator = default_chain.accounts[1]
    submitter = default_chain.accounts[2]
    unauthorized = default_chain.accounts[3]
    
    print(f"\n[TEST] Starting Comprehensive Registry Tests...")
    print(f"Admin: {admin.address}")
    print(f"Moderator: {moderator.address}")
    print(f"Submitter: {submitter.address}")

    # 2. Deploy Contract
    registry = ClearFundRegistry.deploy(from_=admin)
    print(f"[OK] Contract deployed at: {registry.address}")

    # 3. Setup Roles
    MODERATOR_ROLE = registry.MODERATOR_ROLE()
    registry.grantRole(MODERATOR_ROLE, moderator.address, from_=admin)
    print(f"[OK] Moderator role granted to: {moderator.address}")

    # 4. Project Submission
    text_info = [
        "Eco-Restore Lagos", "Regenerating coastal ecosystems", "Lagos, Nigeria",
        "https://ecorestore.ng", "@ecorestore", "github.com/ecorestore",
        "Planting mangroves", "CLIMATE"
    ]
    assets = ["QmLogo123", "QmBanner456"]

    print(f"[TEST] Submitting project...")
    tx = registry.submitProject(text_info, assets, from_=submitter)
    project_id = tx.return_value
    assert registry.getProject(project_id).active == True
    print(f"[OK] Project #{project_id} is active")

    # 5. Test Deactivation (by Moderator)
    print(f"[TEST] Testing Moderation: Deactivating project...")
    registry.deactivateProject(project_id, "Inappropriate content", from_=moderator)
    assert registry.getProject(project_id).active == False
    print(f"[OK] Project deactivated by Moderator")

    # 6. Test Reactivation Failure (Moderator cannot reactivate)
    print(f"[TEST] Testing Security: Moderator attempting reactivation (Should Fail)...")
    try:
        registry.reactivateProject(project_id, from_=moderator)
        assert False, "Moderator should NOT be able to reactivate"
    except Exception:
        print("[OK] Access Control: Moderator correctly denied reactivation rights")

    # 7. Test Reactivation Success (by Admin)
    print(f"[TEST] Testing Admin: Reactivating project...")
    registry.reactivateProject(project_id, from_=admin)
    assert registry.getProject(project_id).active == True
    print(f"[OK] Project successfully reactivated by Admin")

    # 8. Test Submitter's own Deactivation power
    print(f"[TEST] Testing Submitter: Deactivating own project...")
    registry.deactivateProject(project_id, "Project completed", from_=submitter)
    assert registry.getProject(project_id).active == False
    print(f"[OK] Submitter successfully deactivated own project")

    # 9. Test Unauthorized Deactivation (Should Fail)
    print(f"[TEST] Testing Security: Unauthorized user deactivating (Should Fail)...")
    try:
        registry.deactivateProject(project_id, "Malicious attempt", from_=unauthorized)
        assert False, "Unauthorized user should NOT be able to deactivate"
    except Exception:
        print("[OK] Access Control: Unauthorized user correctly denied deactivation rights")

    print("\n" + "="*50)
    print("[SUCCESS] ALL SECURITY AND MODERATION TESTS PASSED")
    print("="*50)

if __name__ == "__main__":
    test_full_registry_workflow()
