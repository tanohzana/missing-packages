import fs from 'fs'
import extractPackagesToInstall from './utils/extractPackagesToInstall'

// Checks a file before deciding weither to install or display
const checkFile = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8')
  const packages = extractPackagesToInstall(file)

  return packages
}

export default checkFile