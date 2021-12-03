import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

const pKey = process.env.PRIVATE_KEY

const wallet = new ethers.Wallet(pKey)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.xchain.asia')
const signer = wallet.connect(provider)

const wallets = [
  {
    address: '0x626939e224FbD56F5DE5b244dC04f8a1cEF40613',
    amount: '0.03'
  },
]

const runTransfer = async () => {
  try {
    for (const wallet of wallets) {
      const response = await signer.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther(wallet.amount)
      })
      console.log(response)
    }
  } catch (err) {
    console.error(err)
  }
}

runTransfer()