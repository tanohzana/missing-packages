// Displays packages given in parameters
const displayPackages = (packagesToShow, installed) => {
  console.log(packagesToShow);
  const display = packagesToShow
    .filter((pack) => { console.log(pack); return !installed.includes(pack)})

  // eslint-disable-next-line
  console.log('Packages to install: ', display)
}

export default displayPackages