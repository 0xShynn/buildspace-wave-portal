import { useEffect, useRef, useState } from 'react'

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { NextSeo } from 'next-seo'

import Footer from '../components/Footer'
import Form from '../components/Form'
import WavesContainer from '../components/WavesContainer'
import abi from '../utils/WavePortal.json'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allWaves, setAllWaves] = useState([])

  const contractAddress = '0x376a669aB91BE0Df88E11486f1afD008a42918e9'
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

        const waveTxn = await waveContractPortal.wave('Hello boi', {
          gasLimit: 300000,
        })
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
    let wavePortalContract

    const onNewWave = (from, timestamp, message) => {
      console.log('NewWave', from, timestamp, message)
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
        },
      ])
    }

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      )
      wavePortalContract.on('NewWave', onNewWave)

      return () => {
        if (wavePortalContract) {
          wavePortalContract.off('NewWave', onNewWave)
        }
      }
    }
  }, [])

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true)
      await checkIfWalletIsConnected()
      setIsLoading(false)
    }
    onLoad()
  }, [])

  const ref = useRef(null)
  useEffect(() => {
    import('@lottiefiles/lottie-player')
  })

  return (
    <Box px="4" mb="16">
      {/* Edit the Head info */}
      <NextSeo title="Home" description="Description" />

      <Flex
        role="main"
        direction="column"
        align="center"
        justify="center"
        w="full"
        maxW="740px"
        mx="auto"
        mt="10"
      >
        <Flex textAlign="center" align="center" direction="column" rounded="sm">
          <lottie-player
            ref={ref}
            autoplay
            loop
            mode="normal"
            src="https://assets5.lottiefiles.com/packages/lf20_jm7mv1ib.json"
            style={{ width: '320px', height: '320px' }}
          />
          <Box
            bg="white"
            rounded="sm"
            p={{ base: 6, md: 12 }}
            mt="8"
            color="blue.900"
          >
            <Heading fontFamily="body" mb="4">
              Hello world! ✨
            </Heading>
            <Text fontWeight="bold" mb={{ base: 6, md: 8 }} maxW="540px">
              I&apos;m Antonin, a front-end developer who recently started his
              Web3 journey 🚀 Connect your Wallet and send me a lil&apos;
              message 🤗 wagmi
            </Text>

            {!currentAccount && !isLoading && (
              <Button
                onClick={connectWallet}
                variant="pinkGradient"
                color="white"
              >
                Connect Wallet
              </Button>
            )}

            {currentAccount && !isLoading && <Form />}
          </Box>
        </Flex>

        {allWaves.length !== 0 && <WavesContainer data={allWaves} />}
      </Flex>

      <Footer />
    </Box>
  )
}
