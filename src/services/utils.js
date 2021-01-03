module.exports = {
  async userValidation(user, requiredProps) {
    let invalidProp = null;
    const userProps = Object.keys(user);

    const validation = requiredProps.every(reqProp => {
      if (!userProps.includes(reqProp)) {
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
