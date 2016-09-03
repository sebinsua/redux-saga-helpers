export default function construct (Class) {
  return (...args) => new Class(...args)
}
