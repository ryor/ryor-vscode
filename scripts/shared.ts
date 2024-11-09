import { resolve } from 'node:path'

export const PROJECT_DIRECTORY_PATH = new URL('..', import.meta.url).pathname

export const BUILD_DIRECTORY_PATH = resolve(PROJECT_DIRECTORY_PATH, 'build')

export const PACKAGE_DIRECTORY_PATH = resolve(PROJECT_DIRECTORY_PATH, 'dist')
