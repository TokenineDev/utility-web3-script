import { ethers } from "ethers";

const run = () => {
  const privatekeyBytes = ethers.utils.randomBytes(32);
  const privateKeyStr = Buffer.from(privatekeyBytes).toString("hex");
  console.log("Private key:", `0x${privateKeyStr}`);
};

run();
