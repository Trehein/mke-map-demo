const dataSelector = (d, overlaySelect) => {
    console.log(d)
    switch (overlaySelect) {
      case 'assistOverlay':
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
        return 0
        // break;
    }
  }

export default dataSelector