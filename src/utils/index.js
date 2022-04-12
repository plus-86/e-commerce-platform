import main from '../main'

export const verifyPhoneNumber = (value) => {
  let reg =
    /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return reg.test(value)
}
