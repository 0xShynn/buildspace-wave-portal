import { useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import abi from '../utils/WavePortal.json'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allWaves, setAllWaves] = useState([])

  const contractAddress = '0x49331A9745E3cDd860e473b80701faC2Fc9107f3'
  const contractABI = abi.abi

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have MetaMask!')
        return
      } else {
        console.log('We have ethereum object', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account: ', account)
        setCurrentAccount(account)
        getAllWaves()
      } else {
        console.log('No authorized account found.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const waveContractPortal = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        let count = await waveContractPortal.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())

        const waveTxn = await waveContractPortal.wave('Hello boi')
        console.log('Mining...', waveTxn.hash)

        await waveTxn.wait()
        console.log('Mined --', waveTxn.hash)

        count = await waveContractPortal.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const waveContractPortal = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        const waves = await waveContractPortal.getAllWaves()

        let wavesCleaned = []

        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          })
        })
        setAllWaves(wavesCleaned)
      }
    } catch (error) {
      console.log("Ethereum object doesn't exist!")
    }
  }

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true)
      await checkIfWalletIsConnected()
      setIsLoading(false)
    }
    onLoad()
  }, [])

  return (
    <Box px="4">
      {/* Edit the Head info */}
      <NextSeo title="Home" description="Description" />

      <Flex
        role="main"
        direction="column"
        align="center"
        justify="center"
        py="12"
        px="4"
        bg="white"
        w="full"
        maxW="540px"
        mx="auto"
        mt="10"
        rounded="md"
      >
        <Heading as="h1">
          Wave Portal <span>👋</span>
        </Heading>
        <VStack>
          <Button colorScheme="blue" size="lg" mt="8" onClick={wave} mb="8">
            Wave at me
          </Button>

          {allWaves.length !== 0 && (
            <VStack>
              <Heading fontFamily="body" fontSize="20">
                Waves log
              </Heading>
              {allWaves.map((wave, index) => (
                <Box key={index}>
                  <Text wordBreak="break-all">Address: {wave.address}</Text>
                  <Text>Time: {wave.timestamp.toString()}</Text>
                  <Text>Message: {wave.message}</Text>
                </Box>
              ))}
            </VStack>
          )}

          {!currentAccount && !isLoading && (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          )}
        </VStack>
      </Flex>

      <Box role="contentinfo">
        <Flex justify="center" p="6">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </Flex>
      </Box>
    </Box>
  )
}
