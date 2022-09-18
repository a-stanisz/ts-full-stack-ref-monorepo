import convict from 'convict'

let convictConfigurationProvider: convict.Config<any> | undefined

export function initialize(schema) {
  convictConfigurationProvider = convict(schema)
  convictConfigurationProvider.validate()
}

export function getValue(keyName: string): string {
  if (convictConfigurationProvider === undefined) {
    throw new Error('Configuration has not been initialized yet')
  }
  return convictConfigurationProvider.get(keyName) as string
}
