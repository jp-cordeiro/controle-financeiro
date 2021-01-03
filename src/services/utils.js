module.exports = {
  async propsValidation(objToValidation, requiredProps) {
    let invalidProp = null;
    const objProps = Object.keys(objToValidation);

    const validation = requiredProps.every(reqProp => {
      if (!objProps.includes(reqProp)) {
        invalidProp = reqProp.charAt(0).toUpperCase() + reqProp.slice(1);
        return false;
      }
      return true;
    });

    if (!validation) {
      return invalidProp;
    }
  },
};
