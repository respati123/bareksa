export const convertHexToRgba = (
  color: string,
  opacityParams: number
): string => {
  const opacity = Math.round(
    Math.min(Math.max(opacityParams || 1, 0), 1) * 255
  );
  return color + opacity.toString(16).toUpperCase();
};
