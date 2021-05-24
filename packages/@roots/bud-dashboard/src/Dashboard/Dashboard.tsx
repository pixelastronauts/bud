import {Dashboard} from '@roots/bud-framework'

import React from 'react'
import {Text, Static, Box, useInput} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'

import {Assets, Time, Git, Progress, Module} from '../components'
import {useCompilation, usePackageJson} from '../hooks'

const Dashboard: Dashboard.Component = ({bud}) => {
  const compilation = useCompilation(bud)
  const theme = useStyle(bud.store.get('theme'))
  const pkg = usePackageJson(bud)

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        process.exit()
      } catch (err) {}
    }
  })

  const appProps: Dashboard.AppProps = {
    bud,
    theme,
    pkg,
    ...compilation,
  }

  return (
    <Box flexDirection="column">
      {appProps.errors?.length > 0 && (
        <Static marginBottom={1} items={appProps.errors}>
          {(err: Dashboard.Compilation.WebpackMessage, id) => (
            <Module
              key={`${id}-webpack-error`}
              color={appProps.theme.colors.error}
              labelColor={theme.colors.foreground}
              label={`Error: ${err.moduleName}`}>
              <Box width={theme.bounds.width - 4}>
                <Text>{err.message}</Text>
              </Box>
            </Module>
          )}
        </Static>
      )}

      {appProps.hasWarnings && appProps.warnings?.length > 0 && (
        <Static marginBottom={1} items={appProps.warnings}>
          {(warning: Dashboard.Compilation.WebpackMessage) => (
            <Module
              key={warning.moduleIdentifier}
              color={appProps.theme.colors.warning}
              labelColor={theme.colors.foreground}
              label={`Error: ${warning.moduleName}`}>
              <Box width={theme.bounds.width - 4}>
                <Text>{warning.message}</Text>
              </Box>
            </Module>
          )}
        </Static>
      )}

      {appProps.stats?.assets && (
        <>
          <Assets {...appProps} />
          <Time {...appProps} />
        </>
      )}

      <Progress {...appProps} />

      <Git theme={appProps.theme} />
    </Box>
  )
}

export {Dashboard}