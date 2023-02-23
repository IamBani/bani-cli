
function base (value) {
  return Object.prototype.toString.call(value)
}

function isObject (value) {
  return base(value) === '[object Object]'
}

function isString (value) {
 return base(value) === '[object String]'
}
function isNumber (value) {
  return base(value) === '[object Number]'
}
function isBoolean (value) {
  return base(value) === '[object Boolean]'
}
function isArray (value) {
  return base(value) === '[object Array]'
}

function isNull (value) {
  return base(value) === '[object Null]'
}
function isUndefined (value) {
  return base(value) === '[object Undefined]'
}

function isFunction (value) {
  return base(value) === '[object Function]'
}
function isDate (value) {
  return base(value) === '[object Date]'
}
function isRegExp (value) {
  return base(value) === '[object RegExp]'
}
function isSymbol (value) { 
  return base(value) === '[object Symbol]'
}
function isArguments (value) {
  return base(value) ===  '[object Arguments]' && typeof value === 'object'
}
module.exports = {
  isObject,
  isString,
  isNumber,
  isBoolean,
  isArray,
  isDate,
  isFunction,
  isNull,
  isUndefined,
  isRegExp,
  isSymbol,
  isArguments
}