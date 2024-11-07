import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface RegisterUserFields {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface ApiRegisterUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useRegisterForm = () => {
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      .min(6, 'Password must be longer than 5 characters.')
      .required('Password is required.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match.')
      .required('Passwords do not match.'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(RegisterSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type RegisterForm = ReturnType<typeof useRegisterForm>
