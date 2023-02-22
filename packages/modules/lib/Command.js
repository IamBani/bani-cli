class Command{
  constructor(arg) {
    console.log('constructor', arg);
    this._arg = arg
  }
  init(){
   throw new Error('')
  }
  exce () {
    throw new Error('')
  }
}

module.exports = {
  Command
}