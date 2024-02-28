import React from 'react'

import {
  Footer,
  FooterProps,
  Navbar,
  NavbarProps,
} from '../../../../components'
import { About } from '../../../../components/About'
import { HorizontalSeparator } from '../../../../components/HorizontalSeparator'
import { ScalingNavigationTabs } from '../../../../components/navigation-tabs/ScalingNavigationTabs'
import { OtherSites } from '../../../../components/other-sites/OtherSites'
import { PageContent } from '../../../../components/PageContent'
import {
  ScalingDataAvailabilityView,
  ScalingDataAvailabilityViewProps,
} from './ScalingDataAvailabilityView'

export interface ScalingDataAvailabilityPageProps {
  dataAvailabilityView: ScalingDataAvailabilityViewProps
  navbar: NavbarProps
  footer: FooterProps
  showActivity: boolean
  showLiveness: boolean
  showFinality: boolean
}

export function ScalingDataAvailabilityPage(
  props: ScalingDataAvailabilityPageProps,
) {
  return (
    <>
      <Navbar {...props.navbar} />
      <PageContent>
        <ScalingNavigationTabs
          showActivity={props.showActivity}
          showFinality={props.showFinality}
          showLiveness={props.showLiveness}
          selected="data-availability"
        />
        <main>
          <header className="mt-4 md:mt-12">
            <h1 className="mb-1 text-3xl font-bold">Data availability</h1>
            <HorizontalSeparator className="mt-2 md:hidden" />
          </header>
          <ScalingDataAvailabilityView {...props.dataAvailabilityView} />
          <OtherSites />
          <About />
        </main>
      </PageContent>
      <Footer {...props.footer} />
    </>
  )
}
