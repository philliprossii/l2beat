export type ScalingProjectDataAvailabilityMode =
  | 'State diffs'
  | 'Transaction data'
  | 'Not applicable'

export type ScalingProjectDataAvailability =
  | OnChainDataAvailability
  | OffChainDataAvailability

type OnChainDataAvailability = {
  layer: 'Ethereum' | 'Ethereum (blobs)'
  type: ScalingProjectDataAvailabilityMode
}

type OffChainDataAvailability = {
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

export const isOffChainDataAvailability = (
  dataAvailability: ScalingProjectDataAvailability,
): dataAvailability is OffChainDataAvailability => {
  return 'fallback' in dataAvailability && 'bridge' in dataAvailability
}
