import { r$ } from '@ryor/ryor'
import { writeFile } from 'node:fs/promises'

export default async () => {
  await r$`
    log -bitwl js-yaml Converting YAML grammar files into JSON with js-yaml...
    mkdir -p build
  `

  const { exitCode, output: [inline, source] } = await r$`js-yaml source/ryor.inline.yaml +. js-yaml source/ryor.source.yaml`.captureOutput()

  if (!inline.exitCode) await writeFile(`build/ryor.inline.json`, inline.stdout)
  else console.error(inline.stderr!.toString())

  if (!source.exitCode) await writeFile(`build/ryor.source.json`, source.stdout)
  else console.error(source.stderr!.toString())

  if (!exitCode) await r$`log -bscgl js-yaml`
}
