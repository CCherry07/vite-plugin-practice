// vite 的插件必须返回一个对象
import fs from 'fs'
import { resolve } from 'path'
import { AliasOptions, Plugin } from 'vite'

interface IAliasConfig {
  prefix?: string
  baseDir?: string
  ExFolders?: string[]
}

function findDirs(path: string, ExFolders): string[] {
  const files = fs.readdirSync(path)
  const dirs = files.filter((file) => {
    const stat = fs.statSync(resolve(path, file))
    if (ExFolders.includes(file)) return false
    return stat.isDirectory()
  })
  return dirs
}

function generateAlias(alias: AliasOptions, dirs: string[], rootPath: string, config: IAliasConfig): AliasOptions {
  dirs.forEach((dir) => {
    alias[`${config.prefix + dir}`] = resolve(rootPath, dir)
  })
  return alias
}

function getTatalAlias(config: Required<IAliasConfig>): AliasOptions {
  const { prefix, baseDir } = config
  const alias: AliasOptions = {}
  const cwdPath = process.cwd()
  alias[prefix] = resolve(cwdPath, baseDir)
  const dirs = findDirs(resolve(cwdPath, baseDir), config.ExFolders)
  const aliasDirs = generateAlias(alias, dirs, alias[prefix], config)
  return aliasDirs
}

export default function ViteAliases(aliasConfig?: IAliasConfig): Plugin {
  return {
    name: 'vite-aliases',
    config(config) {
      const AliasConfig: Required<IAliasConfig> = {
        prefix: '@',
        baseDir: 'src',
        ExFolders: [],
        ...aliasConfig
      }
      const alias = getTatalAlias(AliasConfig)
      return {
        resolve: {
          alias: {
            ...config.resolve?.alias,
            ...alias
          }
        }
      }
    }
  }
}
