import { Box, chakra, Flex, Link, Text } from '@chakra-ui/react'

const Footer = () => {
  const BUILDSPACE_URL = 'https://buildspace.so'
  const ANHEK_URL = 'http://twitter.com/anhek_'
  return (
    <Box role="contentinfo">
      <Flex justify="center" p="6" textAlign="center">
        <Text color="white" fontSize="16px">
          🦄{' '}
          <chakra.span fontWeight="bold" ml="1">
            <Link
              href={BUILDSPACE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              buildspace
            </Link>
          </chakra.span>{' '}
          Web3 project coded by
          <Link
            href={ANHEK_URL}
            target="_blank"
            rel="noopener noreferrer"
            ml="1"
          >
            Antonin Nhek
          </Link>
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
