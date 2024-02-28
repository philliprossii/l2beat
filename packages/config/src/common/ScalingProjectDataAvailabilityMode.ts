export type ScalingProjectDataAvailabilityMode =
  | 'StateDiffs'
  | 'TxData'
  | 'NotApplicable'

export type ScalingProjectDataAvailability =
  | {
      layer: 'On chain' | 'On chain (blobs)'
      type: 'State diffs' | 'Transaction data' | 'Not applicable'
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
      type: 'State diffs' | 'Transaction data' | 'Not applicable'
    }
