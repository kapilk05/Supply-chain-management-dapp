
const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy(unlockTime, { value: lockedAmount });

  await tracking.deployed();

  console.log(
    `Order Tracking was deployed to ${tracking.target}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
