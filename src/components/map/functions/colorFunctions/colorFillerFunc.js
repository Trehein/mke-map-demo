import * as d3 from 'd3'
// import dataSelector from '../../selectors/dataSelector'
// import colorScaler from './colorScaler'

const dataSelector = (d, overlaySelect) => {
  switch (overlaySelect) {
    case 'assist':
      return d.properties.foodAssistPerc;
    case 'medianIncome':
      return d.properties.householdIncomeMedian;
    case 'language':
      return d.properties.percentSpanishLang;
    case 'povertyRate':
      return d.properties.percentBelowPovAll;
    case 'medianAgeBoth':
      return d.properties.ageMedianBoth;
    case 'disTotal':
      return d.properties.disTotal;
    case 'raceBlackPerc':
      return d.properties.raceBlackPerc;
    case 'noInsuranceTotal':
      return d.properties.noInsuranceTotal;
    default:
      break;
  }
}

const colorFillerFunc = (colorScale, overlaySelect) => {
    d3.selectAll('path')
    .style('fill', (d) => {
        let selectedOverlayData = dataSelector(d, overlaySelect);
        if (selectedOverlayData) {
          return colorScale(selectedOverlayData)
        } else {
          return "#c9ddff";
        }
    })
}

export default colorFillerFunc;