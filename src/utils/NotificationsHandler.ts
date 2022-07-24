import { Notify } from 'quasar'

export const showCodedError = (errorCode) => {
  // or with a config object:
  let errorText = ''
  switch (errorCode) {
    case 1:
      errorText = "We don't have enough questions for the chosen settings :( Please, select a lower number or try different settings."
      break
    case 2:
      errorText = 'Received settings are invalid.'
      break
    default:
      errorText = 'Something went wrong. Please, try again.'
      break
  }
  Notify.create({ color: 'negative', position: 'top', message: errorText, icon: 'report_problem' })
}

export const showBasicError = () => {
  // or with a config object:
  Notify.create({ color: 'negative', position: 'top', message: 'Something went wrong. Please try again.', icon: 'report_problem' })
}
