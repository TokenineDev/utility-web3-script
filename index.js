import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

const pKey = process.env.PRIVATE_KEY

const erc20ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function balanceOf(address) view returns (uint)',
    'function transfer(address to, uint amount)',
    'event Transfer(address indexed from, address indexed to, uint amount)'
];

const tokenAddress = '0x9c882a7004D4bB7E5fa77856625225EA29619323'

const wallet = new ethers.Wallet(pKey)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.xchain.asia')
const signer = wallet.connect(provider)
const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer)

// gas limit use in transfer token abount 75000 Unit.
// One transfer will use gas in xchain 20 gwei * 75000 = 1500000 gwei.
// Then, one transfer will use gas about 0.0015 XTH

const wallets = [{
  address: '0x626939e224FbD56F5DE5b244dC04f8a1cEF40613',
  amount: 10 // unit in
}]

const runTransfer = async () => {
  try {
    for (const wallet of wallets) {
      const response = await tokenContract.transfer(
        wallet.address,
        ethers.utils.parseEther(amount) // change ether to wei unit
      )
      console.log(response)
    }
  } catch (err) {
    console.error(err)
  }
}

runTransfer()