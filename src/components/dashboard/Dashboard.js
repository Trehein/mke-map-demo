import React, { Component } from 'react'
import MKEMapController from '../map/MKEMapController'

class Dashboard extends Component {
    state = {
        site: "Select a Site",
        participants: "",
        type: "",
        tract: "Select a Census Tract",
        geoID: "",
        affgeoID: "",
        foodAssist: "",
        assistTotalEst: "",
        foodAssistPerc: "",
        percentBelowPov18to64: "",
        percentBelowPov65up: "",
        percentBelowPovAll: "",
        percentBelowPovFemaleAll: "",
        percentBelowPovMaleAll: "",
        percentBelowPovUnder5: "",
        percentBelowPovUnder18: "",
        percentSpanishLang: "",
        ageMedianBoth: "",
        ageMedianFemale: "",
        ageMedianMale: "",
        disTotal: "",
        raceBlackPerc: "",
        noInsuranceTotal: "",

        //extension site
        program: '',
        partner: '',
        streetAddress: '',
        partner2019: '',
        partner2018: '',
        partner2017: '',
    };

    render(){
        const selectSite = data => {
            this.setState({ site: data.site })
            this.setState({ participants: data.participants })
            this.setState({ type: data.type})
            // console.log(this.state)
        }

        const selectExtensionSite = data => {
            this.setState({ program: data.program })
            this.setState({ partner: data.partner })
            this.setState({ participants: data.participants })
        }

        const selectCensusTract = data => {
            console.log(data)
            this.setState({ tract: data.NAME})
            this.setState({ foodAssistPerc: data.foodAssistPerc })
            this.setState({ assistTotalEst: data.assistTotalEst })
            this.setState({ foodAssistPercent: data.foodAssistPercent })
            this.setState({ percentBelowPov18to64: data.percentBelowPov18to64 })
            this.setState({ percentBelowPov65up: data.percentBelowPov65up })
            this.setState({ percentBelowPovAll: data.percentBelowPovAll })
            this.setState({ percentBelowPovFemaleAll: data.percentBelowPovFemaleAll })
            this.setState({ percentBelowPovMaleAll: data.percentBelowPovMaleAll })
            this.setState({ percentBelowPovUnder5: data.percentBelowPovUnder5 })
            this.setState({ percentBelowPovUnder18: data.percentBelowPovUnder18 })
            this.setState({ percentSpanishLang: data.percentSpanishLang })
            this.setState({ geoID: data.GEOID })
            this.setState({ affgeoID: data.AFFGEOID })
            this.setState({ householdIncomeMedian: data.householdIncomeMedian })
            this.setState({ ageMedianBoth: data.ageMedianBoth })
            this.setState({ ageMedianFemale: data.ageMedianFemale })
            this.setState({ ageMedianMale: data.ageMedianMale })
            this.setState({ disTotal: data.disTotal })
            this.setState({ raceBlackPerc: data.raceBlackPerc })
            this.setState({ noInsuranceTotal: data.noInsuranceTotal })
        }

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s12 m8 l8">
                        <MKEMapController 
                            selectSite={selectSite} 
                            selectCensusTract={selectCensusTract}
                            selectExtensionSite={selectExtensionSite}    
                        />                   
                    </div>
                    <div className="col s12 m4 l4">
                        <div>
                            {/* <h5>{this.state.site}</h5> */}
                            <h5>{this.state.partner}</h5>
                            {/* <h6>Type: {this.state.type}</h6> */}
                            <h6>Program: {this.state.program}</h6>
                            <p>Participants: {this.state.participants}</p>
                            <h5>Census Tract: {this.state.tract}</h5>
                            <table>
                                <tbody>
                                <tr>
                                    <th>% Receiving Assistance</th>
                                    <td>{this.state.foodAssistPerc}</td>
                                </tr>
                                <tr>
                                    <th>% Below Poverty</th>
                                    <td>{this.state.percentBelowPovAll}</td>
                                </tr>
                                <tr>
                                    <th>% Spanish Speaking</th>
                                    <td>{this.state.percentSpanishLang}</td>
                                </tr>
                                <tr>
                                    <th>Median Income</th>
                                    <td>${this.state.householdIncomeMedian}</td>
                                </tr>
                                <tr>
                                    <th>% Black Pop.</th>
                                    <td>{this.state.raceBlackPerc}</td>
                                </tr>
                                <tr>
                                    <th>Median Age</th>
                                    <th>Male</th>
                                    <th>Female</th>
                                </tr>
                                <tr>
                                    <td>{this.state.ageMedianBoth}</td>
                                    <td>{this.state.ageMedianMale}</td>
                                    <td>{this.state.ageMedianFemale}</td>
                                </tr>
                                <tr>
                                    <th>People with Disabilities</th>
                                    <td>{this.state.disTotal}</td>
                                </tr>
                                <tr>
                                    <th>Uninsured</th>
                                    <td>{this.state.noInsuranceTotal}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div>* About the Data</div>
                            <div>The number of participants at a partner is random to demonstrate the map's ability to represent data dynamically.</div>
                            <div>This map uses percentages calculated using estimates from the <a href="https://data.census.gov/cedsci/">2018 ACS</a>. This means that this map is not an accurate representation of the exact demographics in any particular area. It is, however, the most accurate look we have at the moment. When the official Census data is made public, this map will be updated to display an accurate representation of the data.</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard