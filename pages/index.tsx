import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'

import * as web3 from '@solana/web3.js'

const Home: NextPage = () => {
  // const addressSubmittedHandler = (address: string) => {
  //   setAddress(address)
  //   setBalance(1000)
  // }
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [executable, setExecutable] = useState(false)

  
  const addressSubmittedHandler=(address_:string)=>{
    try {
      const key=new web3.PublicKey(address_);
      setAddress(key.toBase58())
  
      const connection=new web3.Connection(web3.clusterApiUrl('devnet'));
      connection.getAccountInfo(key).then(exec=>{
       executable && setExecutable(exec?.executable ?? false)
      })
      
      connection.getBalance(key).then(balance=>{
        
        setBalance(balance/web3.LAMPORTS_PER_SOL)


      })
    } catch (error) {
      setAddress("")
      setBalance(0)
      alert(error)
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

        {executable ? <h2>This Account is Executable</h2>: <h2>Sorry not executable</h2> }
      </header>
    </div>
    
  )
}

export default Home
