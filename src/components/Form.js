import {
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb="4">
        <Textarea
          id="message"
          placeholder="Your message <3"
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
        type="submit"
        variant="pinkGradient"
      >
        Wave at me 👋
      </Button>
    </form>
  )
}

export default Form
