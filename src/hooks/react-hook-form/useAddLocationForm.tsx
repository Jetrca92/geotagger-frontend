import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface AddLocationFields {
  imageUrl: string
  address: string
}

export const useAddLocationForm = () => {
  const RegisterSchema = Yup.object().shape({
    imageUrl: Yup.string().required('Location image is required.'),
    address: Yup.string().required('Address is required.'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      imageUrl: '',
      address: '',
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

export type RegisterForm = ReturnType<typeof useAddLocationForm>
