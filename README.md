# 🌱 Urban Recycle Tokens - Sistema de Smart Contracts
# Urban Recycle Tokens

A Solidity-based system to incentivize urban recycling by issuing ERC‑20 tokens (UrbanCoin) and ERC‑721 certificates (WasteCertificate NFTs) for verified recycling events. This repository contains on‑chain contracts and supporting configuration for a minimal production-ready flows: mint tokens, mint certificates, and record provenance data (IPFS metadata).

Repository contents (key files)
- Contracts:
  - [contracts/RecycleManager.sol](https://github.com/adletgamer/urban-recycle-tokens/blob/main/contracts/RecycleManager.sol) — Orchestrator: calculates rewards, mints tokens & certificates, maintains stats and authorized callers.
  - [contracts/WasteNFT.sol](https://github.com/adletgamer/urban-recycle-tokens/blob/main/contracts/WasteNFT.sol) — ERC‑721 certificate contract with lightweight on‑chain certificate data and tokenURI (IPFS).
  - [contracts/UrbanCoinLima.sol](https://github.com/adletgamer/urban-recycle-tokens/blob/main/contracts/UrbanCoinLima.sol) — Example ERC‑20 token with owner-only mint and district multipliers.
  - [contracts/UrbanCoin.sol](https://github.com/adletgamer/urban-recycle-tokens/blob/main/contracts/UrbanCoin.sol) — alternate / in-progress implementation (review before using).
- Tooling & config:
  - `hardhat.config.js` / `hardhat.config.cjs` — Hardhat config
  - `package.json`, `tsconfig*.json`, `vite.config.ts`, `postcss.config.js` etc.
  - `.env` — environment variables (not committed)

What this system does (high level)
- A verified recycling event (weight, material, district, quality) is recorded by an authorized backend/oracle.
- The RecycleManager calculates tokens to award using per-material price and district multiplier.
- The system mints:
  - an ERC‑20 token reward to the citizen (UrbanCoin),
  - an ERC‑721 WasteCertificate NFT with tokenURI pointing to an IPFS JSON metadata object containing evidence/proof.
- Stats (weights per material, event count) are tracked on‑chain.

Quickstart (developer)
1. Install
   - Node (>=18 recommended)
   - Install packages:
     ```
     npm install
     ```
2. Configure
   - Create a `.env` file (copy from `.env.example` if present). Provide keys for deployment private key, RPC URLs, API keys etc.
3. Compile
   ```
   npx hardhat compile
   ```
4. Tests
   ```
   npx hardhat test
   ```
5. Deploy (example)
   - Use provided deploy scripts (in `scripts/`) or write a Hardhat deploy script. Recommended deployment order:
     1. Deploy `WasteNFT` — set owner to a multisig (Gnosis Safe) for production.
     2. Deploy `UrbanCoinLima` (or your ERC‑20) — configure minter/ownership so RecycleManager can mint rewards.
     3. Deploy `RecycleManager` with addresses of the UrbanCoin and WasteNFT contracts.
     4. From the multisig, call `WasteNFT.setRecycleManager(...)` (or `updateRecycleManager`) to point to the deployed `RecycleManager`.
     5. Add backend/oracle addresses to `RecycleManager.addAuthorizedCaller(...)`.
   - Example compile + deploy with Hardhat:
     ```
     npx hardhat run --network <network> scripts/deploy.js
     ```

Important contract/interface notes (read before using)
- Authorization: Only addresses in `RecycleManager.authorizedCallers` (and owner) can call `recordRecycling` and `recordBatchRecycling`. Keep this list minimal and protected.
- Token minting: `RecycleManager` calls the UrbanCoin mint function. Ensure the ERC‑20 implementation exposes the expected mint function or make RecycleManager the token owner/minter.
- IPFS metadata: `WasteNFT` stores tokenURI that should point to an IPFS JSON payload with proofs (weight, sensor id, signed attestation, images, timestamp). The on‑chain record stores minimal fields — IPFS holds the evidence.
- Canonicalization: `RecycleManager` compares material and district using `keccak256(abi.encodePacked(string))`. Ensure you canonicalize strings (case and whitespace) on the backend to avoid hash mismatches.
- Batch processing: Call `recordBatchRecycling` to reduce gas costs per event. On partial failures, batch callers should handle retries and reconciliation.

Recommended metadata schema (IPFS JSON)
- version
- collectorId
- weight_g
- scaleId
- sensorSignature (or backend signature)
- materialType
- district
- qualityGrade
- images[] (optional)
- timestamp
- verifier (backend DID or public key)

Security & production checklist (high-level)
- Fix/verify compilation issues:
  - Ensure no duplicate contract names across files (e.g., `UrbanCoin.sol` contains a `RecycleManager` placeholder).
  - Remove incorrect OpenZeppelin constructor calls like `Ownable(msg.sender)` — use `Ownable()` default.
  - Replace non‑standard ERC721 overrides with correct OpenZeppelin overrides (e.g., `_beforeTokenTransfer`, `supportsInterface`, `tokenURI`, `_burn`).
- Access control:
  - Manage owner and minter keys with multisig (Gnosis Safe).
  - Use narrow role-based access (consider OpenZeppelin AccessControl).
- Testing:
  - Unit tests for reward math (edge cases), reentrancy, batch flows, and event emissions.
  - Integration tests with a simulated backend generating signed IPFS metadata.
- Auditing:
  - Static analysis (Slither), fuzz testing, and a 3rd‑party security audit before mainnet launch.
- Recovery & emergency:
  - Review emergency withdraw/recover functions and restrict to multisig.
- Observability:
  - Emit detailed events. Index events in a subgraph (The Graph) or custom indexing service for dashboards.

Production improvements and roadmap
- Add role-based access (OpenZeppelin AccessControl) and pausable functionality.
- Replace string-based material/district with enums to remove hash fragility.
- Implement signature-based on-chain verification (verifier signature included in metadata) to reduce trust on backend.
- Integrate a decentralized oracle for sensor attestation (optional).
- Add gas-optimized batch minting patterns and merkle proofs for batched verification.
- Add on‑chain token redemption and integration with local merchants / municipal services.
- Implement monitoring: blocks confirmations, event tracking, alerting for unusual mint volumes.

Contributing
- Please follow repository code style and add tests for any behavior change. Submit PRs and tag maintainers.
- Before opening PRs, run:
  ```
  npx hardhat compile
  npx hardhat test
  ```

License & contact
- License: MIT (check SPDX headers in contracts)
- Repo owner: adletgamer — open issues/PRs or contact via repository for collaboration.

Where to go next
- If you want, I can:
  - Convert this README into a deployment checklist & example scripts.
  - Produce a recommended IPFS metadata JSON schema and a backend signing/verification example.
  - Create Hardhat deploy scripts that follow the recommended multisig workflow.

Thank you — this README is intended to be a practical starting point for developers and operators working to deploy Urban Recycle Tokens in a test or production environment.
