import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const Form = ({ onWave }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      onWave(values.message)
      resolve()
      reset()
    })
  }

  return (
    <Box w="full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4">
          <Textarea
            id="message"
            placeholder="Your message :)"
            {...register('message', { required: 'This is required' })}
            minH="140px"
            bg="gray.50"
          />
          <FormErrorMessage>
            {errors.message && errors.message.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          color="white"
          isLoading={isSubmitting}
          loadingText="Sending..."
          type="submit"
          colorScheme="pink"
          _focus={{ bg: 'red' }}
        >
          Wave at me 👋
        </Button>
      </form>
    </Box>
  )
}

export default Form
