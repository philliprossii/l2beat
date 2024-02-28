import React from 'react'

import { ScalingFilters } from '../../../../components/table/filters/ScalingFilters'
import { getScalingRowProps } from '../../../../components/table/props/getScalingRowProps'
import { getScalingDataAvailabilityColumnsConfig } from '../../../../components/table/props/getScalingTableColumnsConfig'
import { TableView } from '../../../../components/table/TableView'
import { RowConfig } from '../../../../components/table/types'
import { ScalingDataAvailabilityViewEntry } from '../types'

export interface ScalingDataAvailabilityViewProps {
  items: ScalingDataAvailabilityViewEntry[]
}

export function ScalingDataAvailabilityView({
  items,
}: ScalingDataAvailabilityViewProps) {
  const rows: RowConfig<ScalingDataAvailabilityViewEntry> = {
    getProps: (entry) => getScalingRowProps(entry, 'data-availability'),
  }
  const columnsConfig = getScalingDataAvailabilityColumnsConfig()

  return (
    <section className="mt-4 flex flex-col gap-y-2 sm:mt-8">
      <ScalingFilters items={items} />
      <TableView columnsConfig={columnsConfig} rows={rows} items={items} />
    </section>
  )
}
