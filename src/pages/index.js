import { Box, Flex, Heading } from '@chakra-ui/layout'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

export default function Home() {
  return (
    <Box>
      {/* Edit the Head info */}
      <NextSeo title="Home" description="Description" />

      <Flex
        role="main"
        bg="white"
        direction="column"
        align="center"
        justify="center"
        py="12"
        px="6"
      >
        <Heading as="h1">Wave Portal 👋</Heading>
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
