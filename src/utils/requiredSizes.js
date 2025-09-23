const requiredSizes = {
    thumbnail: { width: 400, height: 225 },
    cover: { width: 1200, height: 675 },
    banner: { width: 1920, height: 1080 },
};

export const getRequiredSizes = (inputName, setter, e, img) => {
    const required = requiredSizes[inputName];

      if (img.width !== required.width || img.height !== required.height) {
        setter((prev) => ({
          ...prev,
          [inputName]: `Invalid dimensions, Required: ${required.width}x${required.height}`,
        }));
        e.target.value = ""; // reset input
        return false;
    } else {
        setter((prev) => ({ ...prev, [inputName]: null }));
        return true;
    }
}