import { r$ } from '@ryor/ryor'

type PublishTaskFunctionArguments = {
  ovsxToken: string
  vsceToken: string
}

export default async ({ ovsxToken, vsceToken }: PublishTaskFunctionArguments) => {
  if (!ovsxToken && !vsceToken) await r$`log -brnx Open VSX Registry or Visual Studio Marketplace access token required + echo + help`

  await r$`log -bitwl publish Publishing...`

  const { version } = await r$`cat source/package.json`.json()
  const filePath = `dist/ryor-vscode-${version}.vsix`

  const { exitCode: lsExitCode } = await r$`ls ${filePath}`.quiet()

  if (lsExitCode !== 0) await r$`build`
  if (ovsxToken) await r$`log -iwl publish Publishing to Open VSX Registry... + ovsx publish -i ${filePath} -p ${ovsxToken}`
  if (vsceToken) await r$`log -iwl publish Publishing to Visual Studio Marketplace... + vsce publish -i ${filePath} -p ${vsceToken}`

  await r$`log -bcgsl publish`
}
