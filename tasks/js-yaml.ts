import { r$ } from '@ryor/ryor'
import { writeFile } from 'node:fs/promises'

export default async () => {
  await r$`
    log -bitwl js-yaml Converting YAML grammar files into JSON with js-yaml...
    mkdir -p build
  `

  const [inline, source] = await Promise.all([r$`js-yaml source/ryor.inline.yaml`.quiet(), r$`js-yaml source/ryor.source.yaml`.quiet()])

  if (inline.exitCode === 0) await writeFile(`build/ryor.inline.json`, inline.stdout)
  else console.error(inline.stderr.toString())

  if (source.exitCode === 0) await writeFile(`build/ryor.source.json`, source.stdout)
  else console.error(source.stderr.toString())

  await r$`log -bs${inline.exitCode === 0 && source.exitCode === 0 ? 'cg' : 'rx'}l js-yaml`
}
