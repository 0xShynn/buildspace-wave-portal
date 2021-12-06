import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const Form = ({ onWave }) => {
  const [formIsSent, setFormIsSent] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const toast = useToast()

  async function onSubmit(values) {
    // return new Promise((resolve, reject) => {
    //   setFormIsSent(true)
    //   onWave(values.message)
    //   resolve().then(reset())
    //   reject(() => {
    //     setFormIsSent(false)
    //   })
    // })

    setFormIsSent(true)
    await onWave(values.message)
      .then(() => {
        setFormIsSent(false)
        toast({
          title: 'Thank you!',
          description: 'Your message has been successfully added :)',
          status: 'success',
          duration: 5000,
          position: 'top-right',
          variant: 'subtle',
          isClosable: true,
        })
        reset()
      })
      .catch((error) => {
        console.log(error)
        setFormIsSent(false)
      })
  }

  return (
    <Box w="full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4">
          <Textarea
            id="message"
            placeholder="Your message || favorite quote || gm || wagmi || hello world"
            {...register('message', { required: 'This is required' })}
            minH="140px"
            bg="gray.50"
            disabled={formIsSent}
          />
          <FormErrorMessage>
            {errors.message && errors.message.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          color="white"
          isLoading={isSubmitting}
          loadingText="Mining..."
          type="submit"
          colorScheme="pink"
        >
          Wave at me 👋
        </Button>
      </form>
    </Box>
  )
}

export default Form
