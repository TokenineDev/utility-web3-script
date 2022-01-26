import { BigNumber, ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const pKey = process.env.PRIVATE_KEY;

const erc20ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const tokenAddress = "0xe57EDc546Ee99f17a5d6e32C2457B4569ecD40f8";

const wallet = new ethers.Wallet(pKey);
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);
const signer = wallet.connect(provider);
const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

// gas limit use in transfer token abount 75000 Unit.
// One transfer will use gas in xchain 20 gwei * 75000 = 1500000 gwei.
// Then, one transfer will use gas about 0.0015 XTH

const wallets = [];

const runTransfer = async () => {
  console.log("Total wallet:", wallets.length);
  let totalAmount = BigNumber.from(0);
  for (const wallet of wallets) {
    try {
      const amount = ethers.utils.parseEther(wallet.amount);
      totalAmount = totalAmount.add(amount);
      const response = await tokenContract.transfer(
        wallet.address,
        amount // change ether to wei unit
      );
      console.log("Start:", wallet.address);
      console.log("Amount:", wallet.amount);
      await response.wait();
      console.log("Done");
    } catch (err) {
      console.log("Error at:", wallet.address);
      console.error(err);
    }
  }
  console.log("WEI:", totalAmount.toString());
  console.log("ETHER:", ethers.utils.formatEther(totalAmount));
};

runTransfer();
