//Utility to transform camelCase or PascalCase text to separate words.
const transformCases = (casedText: string): string => {
  if (!casedText) {
    return "";
  }
  const result = casedText.replace(/([a-z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default transformCases;
