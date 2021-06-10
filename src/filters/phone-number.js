export function hidePhoneNumber(value) {
  if (!value) {
    return
  }
  value = value.toString()
  return value.replace(/^(.{3}).*(.{4})$/, '$1****$2')
}
