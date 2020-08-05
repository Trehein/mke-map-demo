const mapDataBinder = (mapData, allCensusData) => {
    let boundMapData = mapData;

    for (let i = 0; i < allCensusData.length; i++) {
        let dataTract = allCensusData[i].geoID;
        let ageMedianBoth = parseFloat(allCensusData[i].ageMedianBoth)
        let ageMedianFemale = parseFloat(allCensusData[i].ageMedianFemale)
        let ageMedianMale = parseFloat(allCensusData[i].ageMedianMale)
        let ageOver60 = parseFloat(allCensusData[i].ageOver60)
        let disTotal = parseFloat(allCensusData[i].disFemaaleUnder5) +
            parseFloat(allCensusData[i].disFemale5to17) +
            parseFloat(allCensusData[i].disFemale18to34) +
            parseFloat(allCensusData[i].disFemale35to64) +
            parseFloat(allCensusData[i].disFemale65to74) +
            parseFloat(allCensusData[i].disFemaleOver75) +
            parseFloat(allCensusData[i].disMaleUnder5) +
            parseFloat(allCensusData[i].disMale5to17) +
            parseFloat(allCensusData[i].disMale18to34) +
            parseFloat(allCensusData[i].disMale35to64) +
            parseFloat(allCensusData[i].disMale65to74) +
            parseFloat(allCensusData[i].disMaleOver75);
        let enrolledInPrimaryNursery = parseFloat(allCensusData[i].enrolledInPrimaryNursery);
        let enrolledInKindergarten = parseFloat(allCensusData[i].enrolledInKindergarten);
        let enrolled1to4 = parseFloat(allCensusData[i].enrolled1to4);
        let enrolled5to8 = parseFloat(allCensusData[i].enrolled5to8);
        let enrolled9to12 = parseFloat(allCensusData[i].enrolled9to12);
        let householdIncomeMedian = parseFloat(allCensusData[i].householdIncomeMedian);
        let noInsuranceTotal = parseFloat(allCensusData[i].noInsureFemale6to18) +
            parseFloat(allCensusData[i].noInsureFemale19to25) +
            parseFloat(allCensusData[i].noInsureFemale25to34) +
            parseFloat(allCensusData[i].noInsureFemale35to44) +
            parseFloat(allCensusData[i].noInsureFemale45to54) +
            parseFloat(allCensusData[i].noInsureFemale55to64) +
            parseFloat(allCensusData[i].noInsureFemale65to74) +
            parseFloat(allCensusData[i].noInsureFemaleOver75) +
            parseFloat(allCensusData[i].noInsureFemaleUnder5) +
            parseFloat(allCensusData[i].noInsureMale6to18) +
            parseFloat(allCensusData[i].noInsureMale19to25) +
            parseFloat(allCensusData[i].noInsureMale25to34) +
            parseFloat(allCensusData[i].noInsureMale35to44) +
            parseFloat(allCensusData[i].noInsureMale45to54) +
            parseFloat(allCensusData[i].noInsureMale55to64) +
            parseFloat(allCensusData[i].noInsureMale65to74) +
            parseFloat(allCensusData[i].noInsureMaleOver75) +
            parseFloat(allCensusData[i].noInsureMaleUnder5);
        let povIncomeBelowPovUnder5Perc = parseFloat(allCensusData[i].povIncomeBelowPovUnder5Perc);
        let povIncomeBelowPovUnder18Perc = parseFloat(allCensusData[i].povIncomeBelowPovUnder18Perc);
        let povIncomeBelowPov18to64 = parseFloat(allCensusData[i].povIncomeBelowPov18to64);
        let povIncomeBelowPovOver65 = parseFloat(allCensusData[i].povIncomeBelowPovOver65);
        let povIncomeBelowPovFemale = parseFloat(allCensusData[i].povIncomeBelowPovFemale);
        let povIncomeBelowPovMale = parseFloat(allCensusData[i].povIncomeBelowPovMale);
        let povIncomeBelowPovPerc = parseFloat(allCensusData[i].povIncomeBelowPovPerc);
        let raceAsianPerc = parseFloat(allCensusData[i].raceAsianPerc);
        let raceBlackPerc = parseFloat(allCensusData[i].raceBlackPerc);
        let raceNativePerc = parseFloat(allCensusData[i].raceNativePerc);
        let raceOtherPerc = parseFloat(allCensusData[i].raceOtherPerc);
        let racePacificIslanderPerc = parseFloat(allCensusData[i].racePacificIslanderPerc);
        let raceTwoOrMorePerc = parseFloat(allCensusData[i].raceTwoOrMorePerc);
        let raceWhitePerc = parseFloat(allCensusData[i].raceWhitePerc);
        let transBikeOrWalkPerc = parseFloat(allCensusData[i].transBikeOrWalkPerc);
        let transCarTruckVanPerc = parseFloat(allCensusData[i].transCarTruckVanPerc);
        let transPublicPerc = parseFloat(allCensusData[i].transPublicPerc)
        let langNonEngPerc = parseFloat(allCensusData[i].langNonEngPerc)
        let langSpanPerc = parseFloat(allCensusData[i].langSpanPerc)
        let foodAssistPerc = parseFloat(allCensusData[i].foodAssistPerc)

        for (let j = 0; j < mapData.features.length; j++) {
            let jsonTract = mapData.features[j].properties.AFFGEOID;

            if (dataTract === jsonTract) {
                boundMapData.features[j].properties.ageMedianBoth = ageMedianBoth;
                boundMapData.features[j].properties.ageMedianFemale = ageMedianFemale;
                boundMapData.features[j].properties.ageMedianMale = ageMedianMale;
                boundMapData.features[j].properties.ageOver60 = ageOver60;
                boundMapData.features[j].properties.disTotal = disTotal;
                boundMapData.features[j].properties.enrolledInPrimaryNursery = enrolledInPrimaryNursery;
                boundMapData.features[j].properties.enrolledInKindergarten = enrolledInKindergarten;
                boundMapData.features[j].properties.enrolled1to4 = enrolled1to4;
                boundMapData.features[j].properties.enrolled5to8 = enrolled5to8;
                boundMapData.features[j].properties.enrolled9to12 = enrolled9to12;
                boundMapData.features[j].properties.householdIncomeMedian = householdIncomeMedian;
                boundMapData.features[j].properties.noInsuranceTotal = noInsuranceTotal;
                boundMapData.features[j].properties.povIncomeBelowPovUnder5Perc = povIncomeBelowPovUnder5Perc;
                boundMapData.features[j].properties.povIncomeBelowPovUnder18Perc = povIncomeBelowPovUnder18Perc;
                boundMapData.features[j].properties.povIncomeBelowPov18to64 = povIncomeBelowPov18to64;
                boundMapData.features[j].properties.povIncomeBelowPovOver65 = povIncomeBelowPovOver65;
                boundMapData.features[j].properties.povIncomeBelowPovFemale = povIncomeBelowPovFemale;
                boundMapData.features[j].properties.povIncomeBelowPovMale = povIncomeBelowPovMale;
                boundMapData.features[j].properties.povIncomeBelowPovPerc = povIncomeBelowPovPerc;
                boundMapData.features[j].properties.raceAsianPerc = raceAsianPerc;
                boundMapData.features[j].properties.raceBlackPerc = raceBlackPerc;
                boundMapData.features[j].properties.raceNativePerc = raceNativePerc;
                boundMapData.features[j].properties.raceOtherPerc = raceOtherPerc;
                boundMapData.features[j].properties.racePacificIslanderPerc = racePacificIslanderPerc;
                boundMapData.features[j].properties.raceTwoOrMorePerc = raceTwoOrMorePerc;
                boundMapData.features[j].properties.raceWhitePerc = raceWhitePerc;
                boundMapData.features[j].properties.transBikeOrWalkPerc = transBikeOrWalkPerc;
                boundMapData.features[j].properties.transCarTruckVanPerc = transCarTruckVanPerc;
                boundMapData.features[j].properties.transPublicPerc = transPublicPerc;
                boundMapData.features[j].properties.langNonEngPerc = langNonEngPerc;
                boundMapData.features[j].properties.langSpanPerc = langSpanPerc;
                boundMapData.features[j].properties.foodAssistPerc = foodAssistPerc;

                break;
            }
        }
    }

    return boundMapData
}

export default mapDataBinder