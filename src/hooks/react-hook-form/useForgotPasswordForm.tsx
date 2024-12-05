import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ForgotPasswordFormFields {
  email: string
}

export const useForgotPasswordForm = () => {
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter a valid email'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(ForgotPasswordSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type ForgotPasswordForm = ReturnType<typeof useForgotPasswordForm>
