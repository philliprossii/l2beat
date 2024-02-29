export type ScalingProjectDataAvailabilityMode =
  | 'State diffs'
  | 'Transaction data'
  | 'Not applicable'

export type ScalingProjectDataAvailability =
  | OnChainDataAvailability
  | OffChainDataAvailability

type OnChainDataAvailability = {
  type: 'On chain'
  layer: 'Ethereum' | 'Ethereum (blobs)'
  mode: ScalingProjectDataAvailabilityMode
}

type OffChainDataAvailability = {
  type: 'Off chain'
  layer: 'MEMO' | 'DAC' | 'Celestia' | 'External' | 'MantleDA'
  fallback: 'None' | 'Not applicable' | 'On chain'
  bridge:
    | 'None'
    | 'Not applicable'
    | 'Blobstream X'
    | 'Optimistic'
    | 'DAC Members'
    | `${number}/${number} DAC Members`
  mode: ScalingProjectDataAvailabilityMode
}
