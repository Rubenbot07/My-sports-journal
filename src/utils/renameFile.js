export function renameFile(file, inputName) {
  let newName = file.name; // fallback, por si no matchea

  if (inputName === "thumbnail") {
    newName = "thumbnail.webp";
  } else if (inputName === "cover") {
    newName = "cover.webp";
  } else if (inputName === "banner") {
    newName = "banner.webp";
  }

  return new File([file], newName, { type: file.type });
}