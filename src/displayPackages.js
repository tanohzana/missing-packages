// Displays packages given in parameters
const displayPackages = (packagesToShow, installed) => {
  const display = packagesToShow
    .filter((pack) => !installed.includes(pack))
    .map((pack) => pack)

  // eslint-disable-next-line
  console.log(`Packages to install: ${display.toString()}`)
}

export default displayPackages