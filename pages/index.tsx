import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from "@solana/web3.js"

interface AccountInfo {
  executable: boolean
}

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [info, setInfo] = useState({})

  const addressSubmittedHandler = async (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))
      connection.getBalance(key)
        .then((balance) => {
          setBalance(balance / Web3.LAMPORTS_PER_SOL)
        })

      // console.log(await connection.getAccountInfo(key))
      connection.getAccountInfo(key)
        .then((accInfo) => {
          if (accInfo !== null) {
            setInfo(accInfo)
          }
        })

      setBalance(1000)
    } catch (error) {
      setAddress("")
      setBalance(0)
      alert(error);
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${info.executable}`}</p>
      </header>
    </div>
  )
}

export default Home
