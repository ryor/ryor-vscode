import { r$ } from '@ryor/ryor'

export default async () => {
  await r$`
    log -bitwl build Building...
    rm -rf build dist
    js-yaml
    log -iwl build Adding other files...
    cp CHANGELOG.md LICENSE.txt README.md source/package.json source/icon-extension.png source/icon-language.png build
    touch build/.vscodeignore
    log -iwl build Packaging extension...
  `

  await r$`cd build + vsce package + cd ..`.quiet()

  const { version } = await r$`cat build/package.json`.json()

  await r$`
    log -iwl build Cleaning up...
    mkdir dist
    cp build/ryor-vscode-${version}.vsix dist
    rm -rf build
    log -bcgsl build
  `
}
