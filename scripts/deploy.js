// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const candidatesName = ["Atiku", "Tinubu", "Peter Obi"];
  const durationInMinutes = 10080; //equivalent of one week in minutes

  const votingContract = await ethers.getContractFactory("Voting");
  const vContract = await votingContract.deploy(candidatesName, durationInMinutes);
  await vContract.deployed();
  console.log(`Voting deployed to: https://sepolia.etherscan.io/address/${vContract.address}`);

  console.log("Waiting 30 seconds before verifying the contract...");
  await sleep(30 * 1000);

  console.log("Verifying contract on Etherscan...");
  await hre.run("verify:verify", {
    address: vContract.address,
    constructorArguments: [candidatesNames, timeInMinutes],
    network: "sepolia",
  });
  console.log("Contract verified on Etherscan");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
