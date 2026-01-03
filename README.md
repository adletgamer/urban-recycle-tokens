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

## 📚 Estructura del Proyecto

```
polygon-urbanrecycle/
├── contracts/
│   ├── UrbanCoin.sol      # Token ERC-20
│   ├── WasteNFT.sol       # NFT ERC-721
│   └── RecycleManager.sol # Contrato orquestador
├── scripts/
│   └── deploy.ts          # Script de despliegue
├── test/                  # Tests (por implementar)
├── hardhat.config.ts      # Configuración de Hardhat
└── .env                   # Variables de entorno (NO subir a Git)
```

## ⚠️ Importante

- **NUNCA** subas tu archivo `.env` a Git
- **NUNCA** compartas tu clave privada
- Usa una cuenta separada con fondos mínimos para desplegar
- Prueba primero en testnet antes de desplegar en mainnet

## 📞 Soporte

Para preguntas o problemas, revisa la documentación de los contratos en el código fuente.

## 📄 Licencia

MIT
