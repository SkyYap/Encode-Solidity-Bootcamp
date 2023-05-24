import { ethers } from "ethers";
import { NotQuiteRandom } from "../typechain-types";
import * as readline from 'node:readline';

async function main() {
  async function main() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      "Select operation: \n Options: \n [1]: Random from block hash \n [2]: Toss a coin \n [3]: Message signature \n [4]: Random from a sealed seed \n [5]: Random from block hash plus a sealed seed \n [6]: Random from randao \n",
      (answer) => {
        console.log(`Selected: ${answer}`);
        const option = Number(answer);
        switch (option) {
          case 1:
            blockHashRandomness();
            break;
          case 2:
            tossCoin();
            break;
          case 3:
            // signature();
            break;
          case 4:
            // sealedSeed();
            break;
          case 5:
            // randomSealedSeed();
            break;
          case 6:
            // randao();
            break;
          default:
            console.log("Invalid");
            break;
        }
        rl.close();
      }
    );
  }
  
  ...
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

async function blockHashRandomness() {
  const contractFactory = await ethers.getContractFactory("NotQuiteRandom");
  contractFactory.deploy().then(async (result) => {
    result.deployed().then(async (contract: NotQuiteRandom) => {
      const currentBlock = await ethers.provider.getBlock("latest");
      const randomNumber = await contract.getRandomNumber();
      console.log(
        `Block number: ${currentBlock.number}\nBlock hash: ${currentBlock.hash}\nRandom number from this block hash: ${randomNumber}`
      );
      await ethers.provider.send("evm_mine", [currentBlock.timestamp + 1]);
      const currentBlock2 = await ethers.provider.getBlock("latest");
      const randomNumber2 = await contract.getRandomNumber();
      console.log(
        `Block number: ${currentBlock2.number}\nBlock hash: ${currentBlock2.hash}\nRandom number from this block hash: ${randomNumber2}`
      );
      await ethers.provider.send("evm_mine", [currentBlock2.timestamp + 1]);
      const currentBlock3 = await ethers.provider.getBlock("latest");
      const randomNumber3 = await contract.getRandomNumber();
      console.log(
        `Block number: ${currentBlock3.number}\nBlock hash: ${currentBlock3.hash}\nRandom number from this block hash: ${randomNumber3}`
      );
      await ethers.provider.send("evm_mine", [currentBlock3.timestamp + 1]);
      const currentBlock4 = await ethers.provider.getBlock("latest");
      const randomNumber4 = await contract.getRandomNumber();
      console.log(
        `Block number: ${currentBlock4.number}\nBlock hash: ${currentBlock4.hash}\nRandom number from this block hash: ${randomNumber4}`
      );
      await ethers.provider.send("evm_mine", [currentBlock4.timestamp + 1]);
      const currentBlock5 = await ethers.provider.getBlock("latest");
      const randomNumber5 = await contract.getRandomNumber();
      console.log(
        `Block number: ${currentBlock5.number}\nBlock hash: ${currentBlock5.hash}\nRandom number from this block hash: ${randomNumber5}`
      );
    });
  });
}

async function tossCoin() {
  const contractFactory = await ethers.getContractFactory("NotQuiteRandom");
  contractFactory.deploy().then(async (result) => {
    result.deployed().then(async (contract: NotQuiteRandom) => {
      const currentBlock = await ethers.provider.getBlock("latest");
      const heads = await contract.tossCoin();
      console.log(
        `Block number: ${currentBlock.number}\nBlock hash: ${
          currentBlock.hash
        }\nThe coin landed as: ${heads ? "Heads" : "Tails"}`
      );
      await ethers.provider.send("evm_mine", [currentBlock.timestamp + 1]);
      const currentBlock2 = await ethers.provider.getBlock("latest");
      const heads2 = await contract.tossCoin();
      console.log(
        `Block number: ${currentBlock2.number}\nBlock hash: ${
          currentBlock2.hash
        }\nThe coin landed as: ${heads2 ? "Heads" : "Tails"}`
      );
      await ethers.provider.send("evm_mine", [currentBlock2.timestamp + 1]);
      const currentBlock3 = await ethers.provider.getBlock("latest");
      const heads3 = await contract.tossCoin();
      console.log(
        `Block number: ${currentBlock3.number}\nBlock hash: ${
          currentBlock3.hash
        }\nThe coin landed as: ${heads3 ? "Heads" : "Tails"}`
      );
      await ethers.provider.send("evm_mine", [currentBlock3.timestamp + 1]);
      const currentBlock4 = await ethers.provider.getBlock("latest");
      const heads4 = await contract.tossCoin();
      console.log(
        `Block number: ${currentBlock4.number}\nBlock hash: ${
          currentBlock4.hash
        }\nThe coin landed as: ${heads4 ? "Heads" : "Tails"}`
      );
      await ethers.provider.send("evm_mine", [currentBlock4.timestamp + 1]);
      const currentBlock5 = await ethers.provider.getBlock("latest");
      const heads5 = await contract.tossCoin();
      console.log(
        `Block number: ${currentBlock5.number}\nBlock hash: ${
          currentBlock5.hash
        }\nThe coin landed as: ${heads5 ? "Heads" : "Tails"}`
      );
    });
  });
}