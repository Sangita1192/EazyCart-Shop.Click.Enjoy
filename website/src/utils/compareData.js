export const isEqualShallow = (obj1, obj2) => {
  for (const key in obj1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 instanceof File || val2 instanceof File) {
      if (!(val1 instanceof File && val2 instanceof File)) return false;
      if (val1.name !== val2.name || val1.size !== val2.size || val1.type !== val2.type) return false;
    } else if (val1 !== val2) {
      return false;
    }
  }
  return true;
};
