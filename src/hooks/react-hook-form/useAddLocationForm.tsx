import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface AddLocationFields {
  address: string
  latitude: string
  longitude: string
}

export const useAddLocationForm = () => {
  const RegisterSchema = Yup.object().shape({
    address: Yup.string().required('Address is required.'),
    latitude: Yup.string().required('Latitude is required.'),
    longitude: Yup.string().required('Longitude is required.'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      address: '',
      latitude: '',
      longitude: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(RegisterSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
    setValue,
  }
}

export type AddLocationForm = ReturnType<typeof useAddLocationForm>
