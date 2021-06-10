export class Dictionary extends Array {
  getName(value) {
    const { name } = this.find(item => item.value === value)
    return name
  }

  getValue(name) {
    const { value } = this.find(item => item.name === name)
    return value
  }
}
