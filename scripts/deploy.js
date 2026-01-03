// scripts/deploy.js
import hre from "hardhat";

async function main() {
    // 1. Deploy UrbanCoin
    const UrbanCoin = await hre.ethers.getContractFactory("UrbanCoin");
    const urbanCoin = await UrbanCoin.deploy();
    await urbanCoin.waitForDeployment();
    console.log("UrbanCoin deployed to:", await urbanCoin.getAddress());

    // 2. Deploy WasteNFT
    const WasteNFT = await hre.ethers.getContractFactory("WasteNFT");
    const wasteNFT = await WasteNFT.deploy();
    await wasteNFT.waitForDeployment();
    console.log("WasteNFT deployed to:", await wasteNFT.getAddress());

    // 3. Deploy RecycleManager
    const RecycleManager = await hre.ethers.getContractFactory("RecycleManager");
    const recycleManager = await RecycleManager.deploy(
        await urbanCoin.getAddress(),
        await wasteNFT.getAddress()
    );
    await recycleManager.waitForDeployment();
    console.log("RecycleManager deployed to:", await recycleManager.getAddress());

    // 4. Configurar direcciones
    // Note: Using setRecycleManager as per contract definition
    await wasteNFT.setRecycleManager(await recycleManager.getAddress());
    console.log("WasteNFT configured with RecycleManager address");

    // 5. Autorizar RecycleManager para mintear tokens
    await urbanCoin.addMinter(await recycleManager.getAddress());
    console.log("RecycleManager authorized to mint tokens");

    // 6. Guardar addresses para frontend
    const addresses = {
        urbanCoin: await urbanCoin.getAddress(),
        wasteNFT: await wasteNFT.getAddress(),
        recycleManager: await recycleManager.getAddress()
    };

    console.log("\n=== CONTRACTS DEPLOYED SUCCESSFULLY ===");
    console.log("Addresses:", JSON.stringify(addresses, null, 2));
    console.log("\n🔍 Check on Polygonscan:");
    console.log(`UrbanCoin: https://amoy.polygonscan.com/address/${addresses.urbanCoin}`);
    console.log(`WasteNFT: https://amoy.polygonscan.com/address/${addresses.wasteNFT}`);
    console.log(`RecycleManager: https://amoy.polygonscan.com/address/${addresses.recycleManager}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
