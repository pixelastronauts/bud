import type {
  StatsAsset,
  StatsCompilation,
} from '@roots/bud-framework/config'

import {relative} from 'node:path'

import Messages from '@roots/bud-dashboard/components/messages'
import View from '@roots/bud-dashboard/components/view'
import {useCompilationColor} from '@roots/bud-dashboard/hooks/useCompilationColor'
import {duration} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'

import Assets from './assets.js'
import Entrypoints from './entrypoints.js'

export interface Props {
  basedir: string
  borderColor?: string
  compact?: boolean
  compilation: StatsCompilation
  debug?: boolean
  displayAssets?: boolean
  displayEntrypoints?: boolean
  id: number
  total: number
}

export interface Asset extends Partial<StatsAsset> {}

export interface AssetGroup {
  assets?: Array<Asset>
}

const Compilation = ({
  basedir,
  compact,
  compilation,
  displayAssets,
  displayEntrypoints,
  id,
  total,
}: Props) => {
  const compilationColor = useCompilationColor(compilation)

  return (
    <View
      head={
        <Head
          basedir={basedir}
          compilation={compilation}
          id={id}
          total={total}
        />
      }
      borderColor={compilationColor}
      footer={<Footer compilation={compilation} />}
      paddingY={1}
    >
      <Box flexDirection="column" gap={1}>
        <Messages color="red" messages={compilation.errors} />
        <Messages color="yellow" messages={compilation.warnings} />

        <Entrypoints
          compact={compact}
          compilation={compilation}
          displayEntrypoints={displayEntrypoints}
        />

        <Assets
          compact={compact}
          compilation={compilation}
          displayAssets={displayAssets}
        />
      </Box>
    </View>
  )
}

const Head = ({basedir, compilation, id, total}: Props) => {
  const color = useCompilationColor(compilation)
  if (!compilation) return <Text dimColor>Loading</Text>

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      overflow="hidden"
      width="100%"
    >
      <Box flexDirection="row" overflow="hidden">
        <Text color={color} wrap="truncate">
          {compilation.name?.split(`/`).pop() ?? `compilation`}
        </Text>

        {total > 1 && (
          <Text dimColor wrap="truncate">
            {` `}[{id}/{total}]
          </Text>
        )}

        {compilation.hash && (
          <Text dimColor wrap="truncate">
            {` `}[{compilation.hash}]
          </Text>
        )}
      </Box>

      {basedir && compilation.outputPath && (
        <Text wrap="truncate">
          ./{relative(`${basedir}`, `${compilation.outputPath}`)}
        </Text>
      )}
    </Box>
  )
}

const Footer = ({compilation}: Partial<Props>) => {
  if (!compilation || !compilation?.assets)
    return <Text dimColor>...</Text>

  const formattedErrorCount =
    compilation.errorsCount > 1
      ? `${compilation.errorsCount} errors`
      : `${compilation.errorsCount} error`

  const cachedModuleCount =
    compilation.modules?.filter(mod => mod?.cached)?.length ?? 0
  const totalModuleCount =
    compilation.modules?.filter(mod => mod && mod.hasOwnProperty(`cached`))
      ?.length ?? 0

  const formattedModuleCount =
    cachedModuleCount > 0
      ? `${cachedModuleCount}/${totalModuleCount} modules cached`
      : `${totalModuleCount} modules`

  const formattedTime = `${duration(compilation.time)}`

  if (compilation.errorsCount > 0) {
    return (
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Text wrap="truncate-end">{formattedErrorCount}</Text>
      </Box>
    )
  }

  if (totalModuleCount === 0) {
    return (
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Text wrap="truncate-end">{formattedTime}</Text>
      </Box>
    )
  }

  if (cachedModuleCount === 0) {
    return (
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Text wrap="truncate-end">
          {formattedTime}
          <Text dimColor>{` ${totalModuleCount} modules`}</Text>
        </Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
      <Text wrap="truncate-end">
        {formattedTime}
        {<Text dimColor>{` [${formattedModuleCount}]`}</Text>}
      </Text>
    </Box>
  )
}

export default Compilation