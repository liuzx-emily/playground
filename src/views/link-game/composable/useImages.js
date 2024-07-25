export function useImages() {
  const imageNames = [];

  const svgs = import.meta.glob("../assets/svg/*.svg");
  for (const path in svgs) {
    const matchRes = path.match(/\/svg\/(\w+)\.svg/);
    const imageName = matchRes[1];
    imageNames.push(imageName);
  }
  return imageNames;
}
