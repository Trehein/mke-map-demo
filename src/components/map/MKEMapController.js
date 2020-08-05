/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react"
import { fetchJSON } from '../dataFetchers/fetchJSON'
import { fetchCSV } from "../dataFetchers/fetchCSV"
import MKEMap from './MKEMap'
import mapDataBinder from '../dataFetchers/mapDataBinder'
import colors from './selectors/colors'
// import SelectorTabs from './selectors/SelectorTabs'

//Map Controller
const MKEMapController = props => {
    const { selectSite, selectCensusTract, selectExtensionSite } = props

    // console.log(colors)

    const [mapData] = fetchJSON("https://raw.githubusercontent.com/trevorhein-matc/portfolio/master/milwaukeeCensusTractMap.json")
    const [supervisorDistricts] = fetchJSON("https://gist.githubusercontent.com/Trehein/1e09ab2019e5a62f190a3dd466106edb/raw/72a967e2e0f245f9cb25149125555b3e491c43f3/mkeSupervisorDistrictGeoJson")
    const [data] = fetchCSV("https://raw.githubusercontent.com/Trehein/datasets/master/MKEFoodMapDataLatLong.csv")
    const [allCensusData] = fetchCSV("https://raw.githubusercontent.com/Trehein/datasets/master/ACS%20MKE%20Master%20Data%20v2.csv")
    const [foodAssistData] = fetchCSV("https://raw.githubusercontent.com/trevorhein-matc/portfolio/master/foodAssistMilwaukee.csv")
    const [mkeSiteData] = fetchCSV("https://raw.githubusercontent.com/trevorhein-matc/portfolio/master/testMKESpread.csv")
    const [assistData] = fetchCSV("https://gist.githubusercontent.com/Trehein/1794aac812055a56f0156084856c06de/raw/ACS2018Assistance.csv")
    const [povertyData] = fetchCSV("https://gist.githubusercontent.com/Trehein/2bb5cd7a100e41a6adfe256c83011b3e/raw/ACS2018PovertyData.csv")
    const [languageData] = fetchCSV("https://gist.githubusercontent.com/Trehein/3e0da513ed5b2b4620f2e947305a5f70/raw/ACS2018Language.csv")
    //extension data
    // const [extensionSites] = fetchCSV("https://raw.githubusercontent.com/Trehein/datasets/master/mkeExtensionSitesLatLong.csv")
    const [extensionSites] = fetchCSV("https://raw.githubusercontent.com/Trehein/datasets/master/mkeExtensionSitesFarmersLatLong.csv")

    const inputRef = useRef();
    let height = 680;
    let width = 600;

    if(inputRef.current !== undefined)
        { width = inputRef.current.getBoundingClientRect().width }

    if (mapData.length !== 0 &&
        supervisorDistricts.length !== 0 &&
        allCensusData.length !== 0 &&
        foodAssistData.length !== 0 && 
        mkeSiteData.length !== 0 && 
        assistData.length !== 0 &&
        data.length !== 0 &&
        povertyData.length !== 0 &&
        languageData.length !== 0 &&
        extensionSites.length !== 0) {
            const allBoundData = mapDataBinder(mapData, allCensusData);
            return (
                <div>
                    <div className="row">
                        <div className="col s12 noPad">
                            <div className="row noMargin">
                                <div className="col s3">
                                    <h5 className="center-heading">Overlays: </h5>
                                </div>
                                <div className="col s9">
                                    <button id="assistOverlay" className="btn waves-effect waves-light overlayButton" style={colors.buttonColors.green}>Assistance</button>
                                    <button id="povertyOverlay" className="btn waves-effect waves-dark overlayButton" style={colors.buttonColors.teal}>Poverty</button>
                                    <button id="languageOverlay" className="btn waves-effect waves-white overlayButton" style={colors.buttonColors.cyan}>Spanish</button>
                                    <button id="medianIncomeOverlay" className="btn waves-effect waves-light overlayButton" style={colors.buttonColors.green}>Median Income</button>
                                    <button id="medianAgeBothOverlay" className="btn waves-effect waves-light overlayButton" style={colors.buttonColors.pink}>Median Age</button>
                                    <button id="disTotalOverlay" className="btn waves-effect waves-light overlayButton" style={colors.buttonColors.purple}>People with Disabilities</button>
                                    <button id="raceBlackPercOverlay" className="btn waves-effect waves-light overlayButton" style={colors.buttonColors.deepPurple}>% Black Pop.</button>
                                    <button id="noInsuranceTotalOverlay" className="btn waves-effect waves-light overlayButton" style={colors.buttonColors.orange}>Uninsured</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card z-depth-3" ref={inputRef}>
                        <MKEMap 
                            width={width}
                            height={height}
                            allBoundData={allBoundData}
                            mapData={mapData} 
                            allCensusData={allCensusData}
                            supervisorDistricts={supervisorDistricts}
                            foodAssistData={foodAssistData} 
                            mkeSiteData={mkeSiteData} 
                            assistData={assistData} 
                            data={data}
                            selectSite={selectSite}
                            selectCensusTract={selectCensusTract}
                            povertyData={povertyData}
                            languageData={languageData}
                            //extension sites
                            extensionSites={extensionSites}
                            selectExtensionSite={selectExtensionSite}                        
                        />
                    </div>
                    <div className="row noMargin">
                        <div className="col s12 noPad">
                            <div className="row noMargin marginTop">
                                {/* <div className="col s3">
                                    <h5 className="center-heading">Category: </h5>
                                </div>
                                <div className="col s9">
                                    <button id="noFilter" className="btn waves-effect waves-light catButton">All</button>
                                    <button id="foodPantryFilter" className="btn waves-effect waves-dark catButton" style={colors.buttonColors.gold}>Food Pantries</button>
                                    <button id="grabNGoFilter" className="btn waves-effect waves-light catButton" style={colors.buttonColors.indigo}>Grab n' Go</button>
                                    <button id="mealProgramFilter" className="btn waves-effect waves-dark catButton" style={colors.buttonColors.red}>Meal Program</button>
                                    <button id="mobileFilter" className="btn waves-effect waves-light catButton" style={colors.buttonColors.black}>Mobile</button>
                                </div> */}
                                <div className="col s3">
                                    <h5 className="center-heading">Program: </h5>
                                </div>
                                <div className="col s9">
                                    <button id="noFilter" className="btn waves-effect waves-light extCatButton">All Extension</button>
                                    <button id="foodWIseFilter" className="btn waves-effect waves-dark extCatButton" style={colors.buttonColors.red}>FoodWIse</button>
                                    <button id="commDevFilter" className="btn waves-effect waves-light extCatButton" style={colors.buttonColors.orange}>Comm. Dev.</button>
                                    <button id="fourHFilter" className="btn waves-effect waves-dark extCatButton" style={colors.buttonColors.gold}>4-H</button>
                                    <button id="urbanAgFilter" className="btn waves-effect waves-light extCatButton" style={colors.buttonColors.green}>Urban Ag.</button>
                                    <button id="hortFilter" className="btn waves-effect waves-light extCatButton" style={colors.buttonColors.indigo}>Hort.</button>
                                    <button id="youthDevFilter" className="btn waves-effect waves-light extCatButton" style={colors.buttonColors.purple}>Youth Dev.</button>
                                    <button id="hwbFilter" className="btn waves-effect waves-light extCatButton" style={colors.buttonColors.black}>HWB</button>
                                    <button id="farmersFilter" className="btn waves-effect waves-light extCatButton" style={colors.buttonColors.cyan}>Farmer's Markets</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 noPad">
                            <div className="row noMargin">
                                <div className="col s3">
                                    <h5 className="center-heading">Municipal Boundaries: </h5>
                                </div>
                                <div className="col s9">
                                    <button id="supervisorOverlay" className="btn waves-effect waves-light municipalOverlayButton" style={colors.buttonColors.green}>County Supervisor</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    return (
        <div ref={inputRef}>Loading</div>
    )
}

export default MKEMapController