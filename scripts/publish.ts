import { $ } from 'bun'
import { BUILD_DIRECTORY_PATH } from './shared'

await $`
  cd ${BUILD_DIRECTORY_PATH}
  vsce publish
  ovsx publish
`
