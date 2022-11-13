export class Toast {
  static dropDown
  static setDropDown(dropDown) {
    this.dropDown = dropDown
  }
  static getDropDown() {
    return this.dropDown
  }
  static show(type = 'info', title = '', message = '', options = {}) {
    this.dropDown?.alertWithType(type, title, message, options)
  }
}
