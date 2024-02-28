export type ScalingProjectDataAvailabilityMode =
  | 'State diffs'
  | 'Transaction data'
  | 'Not applicable'

export type ScalingProjectDataAvailability =
  | {
      layer: 'On chain' | 'On chain (blobs)'
      type: ScalingProjectDataAvailabilityMode
    }
  | {
      layer: 'MEMO' | 'DAC' | 'Celestia' | 'External' | 'MantleDA'
      fallback: 'None' | 'Not applicable' | 'On chain'
      bridge:
        | 'None'
        | 'Not applicable'
        | 'Blobstream X'
        | 'Optimistic'
        | 'DAC Members'
        | `${number}/${number} DAC Members`
      type: ScalingProjectDataAvailabilityMode
    }
