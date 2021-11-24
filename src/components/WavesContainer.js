import { Box, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import { IoTime } from 'react-icons/io5'

const WavesContainer = ({ data, currentAccount }) => {
  const sortedData = data.sort((a, b) => b.timestamp - a.timestamp)

  return (
    <VStack mt="16" spacing="8">
      <Heading fontFamily="body" color="white" textAlign="center">
        Thank you 💛
      </Heading>
      {sortedData.map((wave, index) => {
        const selected =
          wave.address.toLowerCase() === currentAccount.toLowerCase()

        return (
          <Box
            key={index}
            bg={selected ? 'pink.100' : 'gray.100'}
            rounded="sm"
            color="gray.600"
            overflow="hidden"
          >
            <Box px={{ base: 3, md: 5 }} py="3">
              <Flex align="center">
                <Icon as={IoTime} boxSize="14px" mb="0.5" />
                <Text fontSize="14px" ml="1">
                  {wave.timestamp.toLocaleString()}
                </Text>
              </Flex>
              <Text
                color="gray.600"
                fontSize={{ base: '14px', md: '16px' }}
                wordBreak="break-all"
              >
                From {selected ? 'me ' : null}
                {wave.address}
              </Text>
            </Box>

            <Box bg={selected ? 'pink.50' : 'white'} p={{ base: 3, md: 5 }}>
              <Text fontWeight="medium">{wave.message}</Text>
            </Box>
          </Box>
        )
      })}
    </VStack>
  )
}

export default WavesContainer
