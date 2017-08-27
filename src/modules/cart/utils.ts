export const prettyPrice = value => {
    const convertToString = value.toString();
    const splitValue = convertToString.split("");
    const valueLength = splitValue.length;
    switch (splitValue.length) {
      case 4:
        splitValue.splice(-3, 0, " ");
        return  splitValue.join("");
  
      case 5:
        splitValue.splice(-3, 0, " ");
        return splitValue.join("");
  
      case 6:
        splitValue.splice(3, 0, " ");
        return splitValue.join("");
  
      default:
        return value;
    }
  }