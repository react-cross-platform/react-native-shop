export const prettyPrice = value => {
  const convertToString = value.toString();
  const splitValue = convertToString.split("");
  const valueLength = splitValue.length;

  if (splitValue.length > 3) {
    splitValue.splice(-3, 0, " ");
    return splitValue.join("");
  } else {
    return value;
  }
};
