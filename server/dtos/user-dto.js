module.exports = class UserDto {
  email
  id
  isActivation
  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActivation = model.isActivation
  }
}