import CancelButton from 'components/ui/button/CancelButton'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import * as API from 'api/Api'
import { userStorage } from 'utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import { RootState } from 'stores/store'

interface Props {
  show: boolean
  locationId?: string
  onHide: () => void
  onDelete: () => void
}

const DeleteModal: FC<Props> = ({ show, locationId, onHide, onDelete }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const token = userStorage.getToken()
  if (!token) {
    navigate(routes.LOGIN)
    return null
  }

  const handleDelete = async () => {
    if (locationId) {
      try {
        const response = await API.deleteLocation(token, locationId)
        if (response.statusCode) {
          dispatch(setError({ type: ErrorType.API, message: response.message }))
          return
        }

        onHide()
        onDelete()
      } catch (error) {
        dispatch(
          setError({
            type: ErrorType.API,
            message: 'An error occurred. Please try again.',
          }),
        )
      }
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h4 className={styles.customModalTitle}>Are you sure?</h4>
        <div className={styles.customModalText}>
          This location will be deleted. There is no undo of this action.
        </div>
        <div className={styles.customModalButtons}>
          <div onClick={onHide}>
            <CancelButton text="Cancel" />
          </div>
          <div onClick={handleDelete}>
            <PrimaryButton text="Submit" />
          </div>
        </div>
        {showApiError && (
          <div className={styles.profileSettingsModalFormErrorText}>
            {apiError}
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default DeleteModal
