export function bang () {
  try {
    Infinity();
  } catch (typeErr) {
    const typeErrPrototype = Object.getPrototypeOf(typeErr);
    const errPrototype = Object.getPrototypeOf(typeErrPrototype);
    process.emit('error', errPrototype.constructor('Just th' + 'row like this!'));
  }
}
