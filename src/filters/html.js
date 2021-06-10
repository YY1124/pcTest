export function htmlWithoutTag(value) {
  if (!value) {
    return ''
  }
  return value.replace(/<[^>]+>/g, '')
}

export function ellipsis(value, length = 200) {
  if (!value) {
    return ''
  }

  if (value.length <= length) {
    return value
  }

  return `${value.slice(0, length)}...`
}
