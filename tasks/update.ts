import { r$ } from '@ryor/ryor'
import { writeFile } from 'node:fs/promises'

export default async () => {
  await r$`log -bitwl update Checking if all dependencies are updated to their latest versions...`

  const denoJSON = await r$`cat deno.json`.json()
  const imports = Object.entries(denoJSON.imports) as [string, string][]
  const currentVersions = Object.fromEntries(imports.map(([name, version]) => [name, version.split('@^')[1]])) as Record<string, string>
  const [jsrUpdatedVersions, npmUpdatedVersions] = (await Promise.all([
    await Promise.all(
      imports.filter(([_, version]) => version.startsWith('jsr')).map(async ([name]) => [name, Object.keys((await (await fetch(`https://jsr.io/${name}/meta.json`)).json()).versions).sort().at(-1)]),
    ),
    await Promise.all(
      imports.filter(([_, version]) => version.startsWith('npm')).map(async ([name]) => [name, (await (await fetch(`https://registry.npmjs.com/${name}/latest`)).json()).version]),
    ),
  ])).map((versions) => versions.filter(([name, version]) => currentVersions[name] !== version))

  if (jsrUpdatedVersions.length > 0 || npmUpdatedVersions.length > 0) {
    for (const [name, version] of jsrUpdatedVersions) denoJSON.imports[name] = `jsr:${name}@^${version}`
    for (const [name, version] of npmUpdatedVersions) denoJSON.imports[name] = `npm:${name}@^${version}`

    await writeFile('deno.json', JSON.stringify(denoJSON, null, '  '))

    await r$`
      log -iwl update Installing updates...
      ${jsrUpdatedVersions.map(([name, value]) => `log -iwl update ' - jsr:${name}: ${currentVersions[name]} > ${value}'`).join('\n')}
      ${npmUpdatedVersions.map(([name, value]) => `log -iwl update ' - npm:${name}: ${currentVersions[name]} > ${value}'`).join('\n')}
      deno install
      log -iwl update Running npm audit...
      npm audit --no-package-lock
    `
  } else await r$`log -cgl update All dependencies are up to date`

  await r$`log -bcgsl update`
}
