import {
  Layer2Provider,
  ScalingProjectCategory,
  ScalingProjectDataAvailability,
  ScalingProjectPurpose,
  StageConfig,
} from '@l2beat/config'
import { TvlApiResponse } from '@l2beat/shared-pure'

export interface DataAvailabilityPagesData {
  tvlApiResponse: TvlApiResponse
}

export interface ScalingDataAvailabilityViewEntry {
  name: string
  shortName: string | undefined
  slug: string
  category: ScalingProjectCategory
  provider: Layer2Provider | undefined
  warning: string | undefined
  redWarning: string | undefined
  purposes: ScalingProjectPurpose[]
  stage: StageConfig
  dataAvailability: ScalingProjectDataAvailability
}
