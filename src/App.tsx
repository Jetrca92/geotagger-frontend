import { FC, useEffect } from 'react'
import Routes from 'routes/Routes'
import * as API from 'api/Api'
import { ActionType, ComponentType } from 'constants/logConstants'
import { userStorage } from 'utils/localStorage'
import { throttle } from 'lodash'

const App: FC = () => {
  useEffect(() => {
    const token = userStorage.getToken()
    if (!token) return

    const tagToComponentType: Record<string, ComponentType> = {
      A: ComponentType.LINK,
      BUTTON: ComponentType.BUTTON,
      INPUT: ComponentType.INPUT,
      SELECT: ComponentType.DROPDOWN,
      CHECKBOX: ComponentType.CHECKBOX,
      RADIO: ComponentType.RADIO,
    }

    const previousValues = new Map<Element, string>()

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const tagName = target.tagName.toUpperCase()

      const componentType = tagToComponentType[tagName]
      if (componentType) {
        API.logUserAction(token, {
          action: ActionType.CLICK,
          componentType,
          location: window.location.pathname,
        })
      }
    }

    const handleScroll = throttle(() => {
      API.logUserAction(token, {
        action: ActionType.SCROLL,
        location: window.location.pathname,
      })
    }, 2000)

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLSelectElement
      const tagName = target.tagName.toUpperCase()

      const componentType = tagToComponentType[tagName]
      if (componentType) {
        const newValue = target.value
        const previousValue = previousValues.get(target) || ''

        let action: ActionType
        if (!previousValue && newValue) {
          action = ActionType.ADD_VALUE
        } else if (previousValue && !newValue) {
          action = ActionType.REMOVE_VALUE
        } else {
          action = ActionType.CHANGE_VALUE
        }

        previousValues.set(target, newValue)

        API.logUserAction(token, {
          action,
          componentType,
          location: window.location.pathname,
          newValue,
        })
      }
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('change', handleInput)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('change', handleInput)
    }
  }, [])

  return <Routes />
}

export default App
