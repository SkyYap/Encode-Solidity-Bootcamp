import { ethers } from "ethers";

async function signature() {
  const signers = await ethers.getSigners();
  const signer = signers[0];
  console.log(
    `Signing a message with the account of address ${signer.address}`
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter a message to be signed:\n", async (answer) => {
    const signedMessage = await signer.signMessage(answer);
    console.log(`The signed message is:\n${signedMessage}`);
    rl.close();
    testSignature();
  });
}

async function testSignature() {
  console.log("Verifying signature\n");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter message signature:\n", (signature) => {
    rl.question("Enter message:\n", (message) => {
      const address = ethers.utils.verifyMessage(message, signature);
      console.log(`This message signature matches with address ${address}`);
      rl.question("Repeat? [Y/N]:\n", (answer) => {
        rl.close();
        if (answer.toLowerCase() === "y") {
          testSignature();
        }
      });
    });
  });
}

async function sealedSeed() {
  console.log("Deploying contract");
  const contractFactory = await ethers.getContractFactory("PseudoRandom");
  const contract: PseudoRandom = await contractFactory.deploy();
  await contract.deployed();
  const signers = await ethers.getSigners();
  const signer = signers[0];
  console.log(
    `Signing a message with the account of address ${signer.address}`
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter a random seed to be signed:\n", async (seed) => {
    const signedMessage = await signer.signMessage(seed);
    rl.close();
    console.log(`The signed message is:\n${signedMessage}`);
    const sig = ethers.utils.splitSignature(signedMessage);
    console.log("Saving signature at contract");
    await contract.setSignature(sig.v, sig.r, sig.s);
    try {
      console.log("Trying to get a number with the original seed");
      const randomNumber = await contract.getRandomNumber(seed);
      console.log(`Random number result:\n${randomNumber}`);
      console.log("Trying to get a number without the original seed");
      const fakeSeed = "FAKE_SEED";
      const randomNumber2 = await contract.getRandomNumber(fakeSeed);
      console.log(`Random number result:\n${randomNumber2}`);
    } catch (error) {
      console.log("Operation failed");
    }
  });
}

async function randomSealedSeed() {
  console.log("Deploying contract");
  const contractFactory = await ethers.getContractFactory("PseudoRandom");
  const contract: PseudoRandom = await contractFactory.deploy();
  await contract.deployed();
  const signers = await ethers.getSigners();
  const signer = signers[0];
  console.log(
    `Signing a message with the account of address ${signer.address}`
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter a random seed to be signed:\n", async (seed) => {
    const signedMessage = await signer.signMessage(seed);
    rl.close();
    console.log(`The signed message is:\n${signedMessage}`);
    const sig = ethers.utils.splitSignature(signedMessage);
    console.log("Saving signature at contract");
    await contract.setSignature(sig.v, sig.r, sig.s);
    try {
      console.log("Trying to get a number with the original seed");
      const randomNumber = await contract.getCombinedRandomNumber(seed);
      console.log(`Random number result:\n${randomNumber}`);
      console.log("Trying to get a number without the original seed");
      const fakeSeed = "FAKE_SEED";
      const randomNumber2 = await contract.getCombinedRandomNumber(fakeSeed);
      console.log(`Random number result:\n${randomNumber2}`);
    } catch (error) {
      console.log("Operation failed");
    }
  });
}