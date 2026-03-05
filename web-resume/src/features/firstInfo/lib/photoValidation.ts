export const isImage = (file: File | null) =>
  file && file.type.startsWith("image/");

export const isValidSizeImage = (file: File | null) =>
  file && file.size <= 2 * 1024 * 1024;
