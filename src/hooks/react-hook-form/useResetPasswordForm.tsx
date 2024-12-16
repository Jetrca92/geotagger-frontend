import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ResetPasswordFormFields {
  newPassword: string
  confirmNewPassword: string
}

export interface ApiResetPasswordFormFields {
  newPassword: string
}

export const useResetPasswordForm = () => {
  const RegisterSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be longer than 5 characters.')
      .required('Password is required.'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match.')
      .required('Passwords do not match.'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
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

export type ResetPasswordForm = ReturnType<typeof useResetPasswordForm>
