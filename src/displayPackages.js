// Compare packages given in parameters and shows those to install
const displayPackages = (packagesToShow, installed) => {
  const display = packagesToShow
    .filter((pack) => !installed.includes(pack))

  const message = display.length ?
    ` ⚡️ Package(s) to install: ${display.toString()}` : " ❌ No package to install"

  console.log(message)
}

export default displayPackages