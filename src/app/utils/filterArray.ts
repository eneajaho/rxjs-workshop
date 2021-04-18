export function filterArray<T>(data: T[], filters: any): T[] {
  return data.filter(item =>
    Object.entries(filters).every(
      ([ key, val ]) => {
        if (val !== '') {
          if (val === null) {
            return true;
          }
          if (typeof val === 'string') {
            // @ts-ignore
            return (item[key] as string).includes(val);
          } else {
            // @ts-ignore
            return item[key] === val;
          }
        }
        return true;
      })
  );
}
