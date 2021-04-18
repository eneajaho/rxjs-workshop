export function isEqual(obj1: object, obj2: object): boolean {
  const obj1Length = Object.keys(obj1).length;
  const obj2Length = Object.keys(obj2).length;

  if (obj1Length === obj2Length) {
    return Object.keys(obj1).every(
    // @ts-ignore
      key => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]);
  }
  return false;
}
