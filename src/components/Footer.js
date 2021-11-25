import { Box, chakra, Flex, Link, Text } from '@chakra-ui/react'

const Footer = () => {
  const BUILDSPACE_URL = 'https://buildspace.so'
  const ANHEK_URL = 'https://twitter.com/anhek_'
  const GITHUB_URL = 'https://github.com/anhek'
  const GITHUB_PROJECT_URL = 'https://github.com/anhek/buildspace-wave-portal'
  return (
    <Box role="contentinfo" mt="10">
      <Flex justify="center" px="6" textAlign="center">
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
          <br />
          Find me on{' '}
          <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            Github
          </Link>{' '}
          •{' '}
          <Link
            href={GITHUB_PROJECT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Project repo
          </Link>
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
