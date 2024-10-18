import { FC } from 'react'

interface Props {
  text: string
  variant: string
}

const Button: FC<Props> = ({ text, variant }) => {
  return <button className={`btn btn-${variant}`}>{text}</button>
}

export default Button
