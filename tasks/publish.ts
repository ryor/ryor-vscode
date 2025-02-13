import { r$ } from '@ryor/ryor'
import packageJSON from '../source/package.json' with { type: 'json' }

type PublishTaskFunctionArguments = {
  ovsxToken: string
  vsceToken: string
}

export default async ({ ovsxToken, vsceToken }: PublishTaskFunctionArguments) => {
  if (!ovsxToken && !vsceToken) {
    await r$`log -brnx Open VSX Registry or Visual Studio Marketplace access token required + echo + help`
    return 1
  }

  const { version } = packageJSON
  const filePath = `dist/ryor-vscode-${version}.vsix`

  await r$`
    log -bitwl publish Publishing...
    rm -rf build dist
    build
    ${ovsxToken ? `log -iwl publish Publishing to Open VSX Registry... + ovsx publish -i ${filePath} -p ${ovsxToken}` : ''}
    ${vsceToken ? `log -iwl publish Publishing to Visual Studio Marketplace... + vsce publish -i ${filePath} -p ${vsceToken}` : ''}
    log -bcgsl publish
  `
}
