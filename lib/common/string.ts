export const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
