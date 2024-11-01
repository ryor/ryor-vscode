import { resolve } from 'node:path'
import { $, write } from 'bun'

const PROJECT_DIRECTORY_PATH = new URL('..', import.meta.url).pathname

const BUILD_DIRECTORY_PATH = resolve(PROJECT_DIRECTORY_PATH, 'build')

const DISTRIBUTION_DIRECTORY_PATH = resolve(PROJECT_DIRECTORY_PATH, 'dist')

const SOURCE_DIRECTORY_PATH = resolve(PROJECT_DIRECTORY_PATH, 'source')

await $`
  rm -rf ${BUILD_DIRECTORY_PATH}
  mkdir ${BUILD_DIRECTORY_PATH}
  cp ${resolve(PROJECT_DIRECTORY_PATH, 'CHANGELOG')} ${resolve(BUILD_DIRECTORY_PATH, 'changelog.md')}
  cp ${resolve(PROJECT_DIRECTORY_PATH, 'LICENSE')} ${resolve(BUILD_DIRECTORY_PATH, 'LICENSE.txt')}
  cp ${resolve(PROJECT_DIRECTORY_PATH, 'README')} ${resolve(BUILD_DIRECTORY_PATH, 'readme.md')}
  cp ${resolve(SOURCE_DIRECTORY_PATH, 'icon-extension.png')} ${BUILD_DIRECTORY_PATH}
  cp ${resolve(SOURCE_DIRECTORY_PATH, 'icon-language.png')} ${BUILD_DIRECTORY_PATH}
  js-yaml ${resolve(SOURCE_DIRECTORY_PATH, 'ryor.tmLanguage.yaml')} > ${resolve(BUILD_DIRECTORY_PATH, 'ryor.tmLanguage.json')}
  touch ${resolve(BUILD_DIRECTORY_PATH, '.vscodeignore')}
`

const [packageJSONProject, packageJSONSource] = await Promise.all([Bun.file(resolve(PROJECT_DIRECTORY_PATH, 'package.json')).json(), Bun.file(resolve(SOURCE_DIRECTORY_PATH, 'package.json')).json()])
const packageJSON = { ...packageJSONProject, ...packageJSONSource }

delete packageJSON.devDependencies
delete packageJSON.scripts

await write(resolve(BUILD_DIRECTORY_PATH, 'package.json'), JSON.stringify(packageJSON, null, '  '))

await $`
  cd ${BUILD_DIRECTORY_PATH}
  vsce package
  rm -rf ${DISTRIBUTION_DIRECTORY_PATH}
  mkdir ${DISTRIBUTION_DIRECTORY_PATH}
  cp $(ls *.vsix) ${DISTRIBUTION_DIRECTORY_PATH}
  rm -rf ${BUILD_DIRECTORY_PATH}
`
