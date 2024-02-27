import { Layer2, ScalingProjectDataAvailabilityMode } from '@l2beat/config'
import {
  assertUnreachable,
  FinalityApiResponse,
  FinalityProjectData,
  formatSeconds,
  notUndefined,
  UnixTime,
} from '@l2beat/shared-pure'

import { formatTimestamp } from '../../../../utils'
import { orderByTvl } from '../../../../utils/orderByTvl'
import { FinalityPagesData, ScalingFinalityViewEntry } from '../types'
import { ScalingFinalityViewProps } from '../view/ScalingFinalityView'

export function getScalingFinalityView(
  projects: Layer2[],
  pagesData: FinalityPagesData,
): ScalingFinalityViewProps {
  const { finalityApiResponse, tvlApiResponse } = pagesData

  const includedProjects = getIncludedProjects(projects, finalityApiResponse)
  const orderedProjectsByTvl = orderByTvl(includedProjects, tvlApiResponse)
  const orderedProjects = moveComingSoonToEnd(
    orderedProjectsByTvl,
    finalityApiResponse,
  )

  return {
    items: orderedProjects
      .map((project) =>
        getScalingFinalityViewEntry(
          project,
          finalityApiResponse.projects[project.id.toString()],
        ),
      )
      .filter(notUndefined),
  }
}

export function getScalingFinalityViewEntry(
  project: Layer2,
  finalityProjectData: FinalityProjectData | undefined,
): ScalingFinalityViewEntry {
  return {
    name: project.display.name,
    shortName: project.display.shortName,
    slug: project.display.slug,
    category: project.display.category,
    dataAvailabilityMode: daModeToDisplay(project.display.dataAvailabilityMode),
    provider: project.display.provider,
    warning: project.display.warning,
    redWarning: project.display.redWarning,
    purposes: project.display.purposes,
    stage: project.stage,
    data: getFinalityData(finalityProjectData, project),
    finalizationPeriod:
      project.display.finality?.finalizationPeriod !== undefined
        ? formatSeconds(project.display.finality.finalizationPeriod, {
            fullUnit: true,
          })
        : undefined,
  }
}

function getFinalityData(
  finalityProjectData: FinalityProjectData | undefined,
  project: Layer2,
) {
  if (!finalityProjectData) return undefined
  return {
    timeToInclusion: {
      averageInSeconds: finalityProjectData.timeToInclusion.averageInSeconds,
      minimumInSeconds: finalityProjectData.timeToInclusion.minimumInSeconds,
      maximumInSeconds: finalityProjectData.timeToInclusion.maximumInSeconds,
      warning: project.display.finality?.warning,
    },
    syncStatus: {
      isSynced: isSynced(finalityProjectData.syncedUntil),
      displaySyncedUntil: formatTimestamp(
        finalityProjectData.syncedUntil.toNumber(),
        {
          mode: 'datetime',
          longMonthName: true,
        },
      ),
    },
  }
}

function isSynced(syncedUntil: UnixTime) {
  return UnixTime.now().add(-1, 'days').add(-1, 'hours').lte(syncedUntil)
}

function getIncludedProjects(
  projects: Layer2[],
  finalityApiResponse: FinalityApiResponse,
) {
  return projects.filter(
    (p) =>
      !p.isUpcoming &&
      !p.isArchived &&
      (p.config.finality || finalityApiResponse.projects[p.id.toString()]) &&
      (p.display.category === 'ZK Rollup' ||
        p.display.category === 'Optimistic Rollup'),
  )
}

function moveComingSoonToEnd(
  projects: Layer2[],
  finalityApiResponse: FinalityApiResponse,
) {
  return [...projects].sort((a, b) => {
    const aResponse = finalityApiResponse.projects[a.id.toString()]
    const bResponse = finalityApiResponse.projects[b.id.toString()]
    const isAConfigured =
      a.config.finality && a.config.finality !== 'coming soon'
    const isBConfigured =
      b.config.finality && b.config.finality !== 'coming soon'
    if (
      (!isAConfigured && isBConfigured) ||
      (aResponse === undefined && bResponse !== undefined)
    ) {
      return 1
    }
    if (
      (!isBConfigured && isAConfigured) ||
      (bResponse === undefined && aResponse !== undefined)
    ) {
      return -1
    }
    return 0
  })
}

function daModeToDisplay(daMode: ScalingProjectDataAvailabilityMode) {
  switch (daMode) {
    case 'StateDiffs':
      return 'State diffs'
    case 'TxData':
      return 'Transaction data'
    case 'NotApplicable':
      return undefined
    default:
      assertUnreachable(daMode)
  }
}
