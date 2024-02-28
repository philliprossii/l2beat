function DAC_BRIDGE(dac: {
  membersCount: number
  requiredSignatures: number
}): `${number}/${number} DAC Members` {
  return `${dac.requiredSignatures}/${dac.membersCount} DAC Members`
}

export const DATA_AVAILABILITY = {
  DAC_BRIDGE,
}
