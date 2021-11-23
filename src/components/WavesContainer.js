import { Box, Heading, Text, VStack } from '@chakra-ui/react'

const WavesContainer = ({ data }) => {
  return (
    <VStack bg="blue.100" w="full" p="12">
      <Heading fontFamily="body" fontSize="20">
        Waves log
      </Heading>
      {data.map((wave, index) => (
        <Box key={index}>
          <Text wordBreak="break-all">Address: {wave.address}</Text>
          <Text>Time: {wave.timestamp.toString()}</Text>
          <Text>Message: {wave.message}</Text>
        </Box>
      ))}
    </VStack>
  )
}

export default WavesContainer
