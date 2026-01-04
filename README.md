# 🌱 Urban Recycle Tokens - Sistema de Smart Contracts

Sistema blockchain que incentiva el reciclaje en Lima, Perú. Los ciudadanos reciben tokens (UrbanCoin) como recompensa por reciclar materiales, y cada transacción de reciclaje genera un NFT de trazabilidad que certifica el origen y calidad del material.

## 🏗️ Arquitectura

El sistema está compuesto por 3 contratos principales:

- **UrbanCoin.sol** - Token ERC-20 de recompensas
- **WasteNFT.sol** - Certificados ERC-721 de trazabilidad
- **RecycleManager.sol** - Contrato orquestador principal

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta con MATIC para desplegar (Polygon Mumbai para testnet)
- Clave privada de una wallet (NUNCA compartas tu clave privada)

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `env.example.txt` como `.env`:

```bash
# En Windows PowerShell
Copy-Item env.example.txt .env

# En Linux/Mac
cp env.example.txt .env
```

### 3. Editar el archivo `.env`

Abre el archivo `.env` y completa las siguientes variables:

```env
# Clave privada de la cuenta que desplegará (sin el prefijo 0x)
PRIVATE_KEY=tu_clave_privada_aqui

# URL del RPC de Polygon Mumbai (Testnet)
# Puedes obtener una gratis en:
# - Alchemy: https://www.alchemy.com/
# - Infura: https://www.infura.io/
# - QuickNode: https://www.quicknode.com/
POLYGON_MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/TU_API_KEY

# URL del RPC de Polygon Mainnet (para producción)
POLYGON_MAINNET_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/TU_API_KEY

# Dirección de la tesorería municipal (recibirá 1M de tokens iniciales)
TREASURY_ADDRESS=0x...

# API Key de PolygonScan (opcional, para verificar contratos)
POLYGONSCAN_API_KEY=tu_api_key_aqui
```

### 4. Obtener MATIC para testnet

Para desplegar en Polygon Mumbai (testnet), necesitas MATIC de prueba:

1. Ve a [Polygon Faucet](https://faucet.polygon.technology/)
2. Conecta tu wallet
3. Solicita MATIC de prueba

## 📦 Compilar Contratos

```bash
npx hardhat compile
```

## 🚀 Desplegar Contratos

### Desplegar en Polygon Mumbai (Testnet)

```bash
npx hardhat run scripts/deploy.ts --network mumbai
```

### Desplegar en Polygon Mainnet

```bash
npx hardhat run scripts/deploy.ts --network polygon
```

### Desplegar en Hardhat Network Local (para pruebas)

```bash
npx hardhat run scripts/deploy.ts
```

El script de despliegue:
1. ✅ Despliega UrbanCoin con supply inicial de 1M tokens
2. ✅ Despliega WasteNFT
3. ✅ Despliega RecycleManager
4. ✅ Configura todos los permisos automáticamente

## 📊 Características del Sistema

### Precios Base por Material (tokens por kg)
- 🥤 **Plástico**: 10 URB/kg
- 📄 **Papel**: 8 URB/kg
- 🍾 **Vidrio**: 5 URB/kg
- 🔩 **Metal**: 15 URB/kg

### Multiplicadores por Distrito
- **Miraflores**: 120% (+20% zona piloto)
- **San Isidro**: 100% (base)
- **Villa Maria del Triunfo**: 130% (+30% bono social)
- **Comas**: 150% (+50% bono crecimiento)

## 🔧 Uso de los Contratos

### Registrar un Reciclaje

```javascript
// Desde un backend autorizado
await recycleManager.recordRecycling(
  "0x...",              // Dirección del ciudadano
  5000,                 // Peso en gramos (5 kg)
  "PLASTIC",            // Tipo de material
  "Miraflores",         // Distrito
  "A"                   // Calidad: A, B, o C
);
```

### Agregar Backend Autorizado

```javascript
// Solo el owner puede hacer esto
await recycleManager.addAuthorizedCaller("0x...");
```

## 🧪 Testing

```bash
npx hardhat test
```

## 📝 Verificar Contratos en PolygonScan

Después del despliegue, puedes verificar los contratos:

```bash
npx hardhat verify --network mumbai <CONTRACT_ADDRESS> [CONSTRUCTOR_ARGS]
```

## 🔒 Seguridad

- ✅ Todos los contratos usan OpenZeppelin (auditados)
- ✅ Control de acceso con `Ownable`
- ✅ Modifiers para proteger funciones críticas
- ✅ Validación de inputs en todas las funciones

# Mango Chain

[![Project Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/adletgamer/mango-chain)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/adletgamer/mango-chain.svg)](https://github.com/adletgamer/mango-chain/graphs/contributors)

One-line tagline: A modular, production-ready blockchain application platform focused on secure, scalable, and inclusive decentralized services.

Table of Contents
- About
- Elevator Pitch
- Problem & Solution
- Key Features
- Architecture Overview
- Technology Stack
- Quick Start
- Local Development
- Running Tests & CI
- Deployment
- API & Smart Contracts (Summary)
- Security & Audits
- Performance & Scaling
- Monitoring & Metrics
- Roadmap
- How to Showcase this Project in Job Applications
- Suggested CV / LinkedIn Bullets
- Demo & Interview Tips
- Contributing
- License & Contact

About
---
Mango Chain is a modular blockchain platform designed to accelerate real-world decentralized applications with a focus on security, performance, and global adoption. It provides developer-friendly tooling, clear upgrade paths, and integration points for web and mobile front-ends.

Elevator Pitch
---
Mango Chain lets teams build secure and scalable decentralized applications quickly by combining battle-tested primitives with an intuitive developer experience. It targets financial inclusion, transparent supply chains, and programmable assets with low friction for developers and users worldwide.

Problem & Solution
---
Problem:
- Centralized platforms create single points of failure, lack transparency, and often exclude unbanked populations.
- Building secure and scalable blockchain solutions remains complex and time-consuming.

Solution:
- Mango Chain provides a modular, auditable, and developer-centric framework that reduces time-to-market for decentralized applications while prioritizing security and global accessibility.

Key Features
---
- Modular architecture for rapid feature composition
- Transactional smart contract platform with safe upgrade paths
- Developer tools: CLI, local testnet, SDKs (JavaScript/TypeScript, optionally others)
- Authentication and wallet integration-ready (e.g., MetaMask, WalletConnect)
- Local and cloud deployment options (Docker, Kubernetes)
- CI/CD and automated testing pipelines
- Observability: metrics, logs, and tracing
- Internationalization and accessibility-focused client components

Architecture Overview
---
High-level components:
- Consensus & Execution Layer: <<describe consensus (e.g., PoA, Tendermint, Ethereum layer-2, etc.)>>
- Smart Contracts / Runtime: <<smart contract language and contract repository>>
- Node / Validator Software: <<node binary or container>>
- Off-chain Services: Relayers, Indexers, Oracles
- Client: Web UI, Mobile SDK, and REST / GraphQL APIs
- Storage & Indexing: Postgres, RocksDB, or preferred indexing solution

(Include architecture diagram: add PNG/SVG in /docs/ or link to design docs.)

Technology Stack (example)
---
- Core: <<e.g., Rust / Go / Solidity / Substrate / CosmWasm / Hardhat, etc.>>
- Runtime & Contracts: <<language>>
- Frontend: React / Next.js / TypeScript
- API: Node.js / Express / GraphQL
- Database: PostgreSQL / Redis / IndexedDB
- DevOps: Docker, Docker Compose, GitHub Actions, Kubernetes
- Testing: Jest, Mocha, Hardhat / Truffle / Foundry (contracts), Testcontainers

Quick Start (fill with repo-specific commands)
---
Prerequisites
- Git
- Node.js >= 16 (if frontend/SDK uses Node)
- Docker & Docker Compose (recommended)
- <<other languages/build tools>>

Clone
```bash
git clone https://github.com/adletgamer/mango-chain.git
cd mango-chain
```

Local dev (example)
```bash
# Option A: Docker (recommended)
docker-compose up --build

# Option B: Local (replace with actual commands)
cd ./backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

Running Tests
```bash
# Unit tests
npm run test

# Smart contract tests (example)
cd contracts
npm run test
```

Running a local testnet
```bash
# Example: start a local node
./scripts/start-local-net.sh
# Or start local dev chain with docker
docker-compose -f docker-compose.local.yml up
```

CI & GitHub Actions
---
- CI runs: lint, unit tests, integration (contract) tests, and build.
- Protect main branch with required checks: unit tests, contract tests, and security scanning.

Deployment
---
- Containerized images (Docker) published to registry (Docker Hub / GitHub Container Registry).
- Cloud deployment options:
  - Kubernetes cluster (Helm charts)
  - Managed containers (AWS ECS / GCP Cloud Run)
  - Frontend hosting: Vercel / Netlify
- Example Docker build & push:
```bash
docker build -t ghcr.io/<owner>/mango-chain:latest .
docker push ghcr.io/<owner>/mango-chain:latest
```

API & Smart Contracts (Summary)
---
Document the most important endpoints and contract functions here.

Example REST endpoints
- POST /api/v1/transactions — submit transactions
- GET /api/v1/accounts/:id — account state
- GET /api/v1/blocks/:height — block info

Example smart contract functions
- mint(address, amount)
- transfer(from, to, amount)
- setOwner(address)

(Replace with actual contract ABIs and examples. Add full API reference in /docs/api.md or auto-generate with Swagger/OpenAPI.)

Security & Audits
---
- Threat model: replay attacks, front-running, oracle manipulation, misconfiguration.
- Defensive programming: type-safe language where possible, strict linting, code reviews.
- Key practices:
  - Unit & integration tests with edge cases
  - Fuzz testing for contracts (e.g., Foundry / Echidna)
  - Regular dependency scanning (Dependabot/GitHub security alerts)
  - External audit recommended before production and before handling real user funds

Performance & Scaling
---
- Horizontal scaling for stateless API components
- Use of batching & indexing for high TPS use-cases
- Caching strategies (Redis, CDN)
- Sharding & layer-2 integration strategies (document any planned approaches)

Monitoring & Metrics
---
- Expose Prometheus metrics from nodes and services
- Centralized logging with ELK or Loki
- Distributed tracing with OpenTelemetry
- Define SLOs/SLIs (latency, error rate, throughput)

Roadmap
---
Short-term
- Add e2e tests and upgradeable contract patterns
- CI improvements: parallel contract test matrix

Mid-term
- Cross-chain bridging support
- Production-grade observability and alerting

Long-term
- Governance module
- Global adoption initiatives and localized client experiences

Contributing
---
We welcome contributions. Please follow these steps:
1. Fork the repo and create a feature branch.
2. Open a draft PR describing the change and the rationale.
3. Run tests and linters before submitting (see scripts in package.json).
4. For security or vulnerability disclosures, contact: <<security@your.org or GitHub security policy link>>.

Code of Conduct
- This project follows a Code of Conduct. See CODE_OF_CONDUCT.md for more details.
Appendix — What to add next (high priority)
---
- Replace placeholders with concrete commands, contract names, and live demo URLs.
- Add architecture images in /docs/ and link them here.
- Add automated OpenAPI / Swagger docs for APIs and publish to /docs/api.md.
- Add badges for CI, code coverage, and security scans.

Notes for maintainers / reviewers
---
This README is designed to be recruiter- and hiring-manager-friendly: it emphasizes impact, technical depth, and demoability. Tailor the "Suggested CV bullets" and "Metrics" with real measured numbers from your repo or test runs to strengthen job applications.


MIT
