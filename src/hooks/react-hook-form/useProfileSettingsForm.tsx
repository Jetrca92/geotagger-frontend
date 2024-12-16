import { yupResolver } from '@hookform/resolvers/yup'
import { UserType } from 'models/auth'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ProfileSettingsFields {
  firstName: string
  lastName: string
  email: string
}

export const useProfileSettingsForm = (user: UserType) => {
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    email: Yup.string().email().required('Please enter a valid email'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
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

export type ProfileSettingsForm = ReturnType<typeof useProfileSettingsForm>
