import { r$ } from '@ryor/ryor'
import packageJSON from '../source/package.json' with { type: 'json' }

export default async () => {
  await r$`
    log -bitwl build Building...
    rm -rf build dist
    js-yaml
    log -iwl build Adding other files...
    cp CHANGELOG.md LICENSE.txt README.md source/package.json source/icon-extension.png source/icon-language.png build
    touch build/.vscodeignore
    log -iwl build Packaging extension...
    cd build
    vsce package
    cd ..
    log -iwl build Cleaning up...
    mkdir dist
    cp build/ryor-vscode-${packageJSON.version}.vsix dist
    rm -rf build
    log -bcgsl build
  `
}
