import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'
import eyeIcon from 'styles/icons/eye.png'
import UserAvatar from 'components/ui/icons/UserAvatar'

import { Link, useNavigate } from 'react-router-dom'
import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'
import * as API from 'api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'stores/authSlice'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { routes } from 'constants/routesConstants'
import { Controller } from 'react-hook-form'
import { RootState } from 'stores/store'
import { ErrorType } from 'constants/errorConstants'
import { isValidFile } from 'utils/fileUtils'

const SignupForm: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, fileError, showApiError, showFileError } = useSelector(
    (state: RootState) => state.error,
  )
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    if (!file) {
      dispatch(
        setError({ type: ErrorType.FILE, message: 'Please upload an avatar' }),
      )
      return
    }
    const { confirmPassword, ...submitData } = data
    const response = await API.signup(submitData)
    if (response.data?.statusCode) {
      dispatch(
        setError({ type: ErrorType.API, message: response.data.message }),
      )
    } else {
      // Login user
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode) {
        dispatch(
          setError({
            type: ErrorType.API,
            message: loginResponse.data.message,
          }),
        )
      } else {
        // upload image
        try {
          const formData = new FormData()
          formData.append('image', file as File, file?.name)

          const imageResponse = await API.uploadImage(
            loginResponse.data.access_token,
            formData,
            response.data.id,
          )
          if (imageResponse.data?.statusCode) {
            dispatch(
              setError({
                type: ErrorType.FILE,
                message: imageResponse.data.message,
              }),
            )
            return
          }
        } catch (error) {
          console.log(error)
          dispatch(
            setError({
              type: ErrorType.FILE,
              message: 'Failed to upload a file.',
            }),
          )
          return
        }
        try {
          const user = await API.fetchUser(loginResponse.data.access_token)
          dispatch(login({ user, token: loginResponse.data.access_token }))
          navigate('/')
        } catch (error) {
          dispatch(
            setError({
              type: ErrorType.API,
              message: 'Failed to fetch user information.',
            }),
          )
        }
      }
    }
  })

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      if (!isValidFile(myfile, dispatch)) return
      setFile(myfile)
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }, [file])

  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword)

  return (
    <Container className={styles.authFormContainer}>
      <div className={styles.authFormTitleContainer}>
        <h3 className={styles.authFormTitle}>Sign up</h3>
        <div className={styles.authFormSubtitle}>
          Your name will appear on posts and your public profle.
        </div>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className={styles.formGroupCentered}>
          <div className={styles.emptyAvatar}>
            {preview ? (
              <UserAvatar avatarSrc={preview} />
            ) : (
              <>
                <label htmlFor="image" className={styles.addAvatarButton}>
                  <UserAvatar />
                </label>
                <input
                  onChange={handleFileChange}
                  id="image"
                  name="image"
                  type="file"
                />
              </>
            )}
          </div>
          {showFileError && (
            <Form.Text className={styles.formErrorText}>{fileError}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="email"
                placeholder="hey@geotagger.com"
                className={styles.formControl}
                isInvalid={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Form.Text className={styles.formErrorText}>
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Row className={styles.signupRow}>
          <Col className={styles.signupCol}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.labelText}>First name</Form.Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="John"
                    className={styles.formControl}
                    isInvalid={!!errors.firstName}
                  />
                )}
              />
              {errors.firstName && (
                <Form.Text className={styles.formErrorText}>
                  {errors.firstName.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col className={styles.signupCol}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.labelText}>Last name</Form.Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Doe"
                    className={styles.formControl}
                    isInvalid={!!errors.lastName}
                  />
                )}
              />
              {errors.lastName && (
                <Form.Text className={styles.formErrorText}>
                  {errors.lastName.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Password</Form.Label>
          <div className={styles.inputWithIcon}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  className={styles.formControl}
                  isInvalid={!!errors.password}
                />
              )}
            />
            <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
              <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
            </span>
          </div>
          {errors.password && (
            <Form.Text className={styles.formErrorText}>
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Repeat password</Form.Label>
          <div className={styles.inputWithIcon}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type={showRepeatPassword ? 'text' : 'password'}
                  className={styles.formControl}
                  isInvalid={!!errors.password}
                />
              )}
            />
            <span
              onClick={toggleRepeatPasswordVisibility}
              className={styles.eyeIcon}
            >
              <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
            </span>
          </div>
          {errors.confirmPassword && (
            <Form.Text className={styles.formErrorText}>
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button className={styles.formButton} type="submit">
          Sign up
        </Button>
        {showApiError && (
          <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
        )}
        <div className={styles.createAccountText}>
          <div className={styles.createAccountTextLeft}>
            Already have an account?
          </div>
          <Link to={routes.LOGIN} className={styles.createAccountTextRight}>
            Sign in
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignupForm
