let counter = 0;

module.exports = {
  test: (val) => typeof val === 'string',
  print: (val) => {
    if (val.match(/^Ursa-Icon-/)) {
      const newVal = `"Ursa-Icon-${counter}"`;
      counter++;
      return newVal;
    }
    return val;
  }
};
