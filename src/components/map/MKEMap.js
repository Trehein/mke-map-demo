import React, { useEffect, useRef } from "react"
import * as d3 from 'd3'
import { colorLegend } from './ColorLegend'
import { sizeLegend } from './SizeLegend'
import assistanceSiteFilter from './selectors/assistanceSiteFilter'
import assistanceSiteCircles from "./components/assistanceSiteCircles"

import colorLegendScale from './functions/legendFunctions/colorLegendScale'
import sizeLegendScale from './functions/legendFunctions/sizeLegendScale'

import {color, assistColor} from './functions/colorFunctions/colorScales'
import colorFiller from './functions/colorFunctions/colorFiller'

import extensionSiteCircles from './components/extensionSiteCircles'
import extensionSiteFilter from './selectors/extensionSiteFilter'

const MKEMap = props => {
  const ref = useRef(null);

  useEffect(() => {
    const { width, 
        height, 
        foodAssistData, 
        mapData, 
        data, 
        selectSite, 
        selectCensusTract, 
        povertyData, 
        languageData, 
        allBoundData, 
        supervisorDistricts, 
        extensionSites,
        selectExtensionSite } = props;
    const siteData = data;
    let supervisorFilter = false;

    let overlaySelect = "assist";

    var x = d3.scaleLinear()
      .domain([1, 16])
      .rangeRound([45,85]);

    const moreTractInfo = function(d) {
      d3.selectAll('path')
        .style("fill", function(d) {
          colorFiller(d, overlaySelect)
        })
        .attr("stroke-width", .075);
      d3.select(this).style("fill", function(d) {
        return "#663399"
      })
      .attr("stroke-width", 2);
      selectCensusTract(d.properties);
    }

    const svg = d3.select(ref.current);

    const projection = d3.geoMercator()
        .translate([width/2, height/2])
        .scale([85000])
        .center([-87.9065, 43.0389]);
    
    const path = d3.geoPath()
        .projection(projection);

    // binds datasets with geo path info
    for (var i = 0; i < foodAssistData.length; i++) {
        var dataTract = foodAssistData[i].geoID;
        var dataValue = parseFloat(foodAssistData[i].foodAssistPercent);
        // let assistValue = assistData[i].estTotal;
        //poverty data
        let percentBelowPov18to64 = parseFloat(povertyData[i].percentBelowPov18to64)
        let percentBelowPov65up = parseFloat(povertyData[i].percentBelowPov65up)
        let percentBelowPovAll = parseFloat(povertyData[i].percentBelowPovAll)
        let percentBelowPovFemaleAll = parseFloat(povertyData[i].percentBelowPovFemaleAll)
        let percentBelowPovMaleAll = parseFloat(povertyData[i].percentBelowPovMaleAll)
        let percentBelowPovUnder5 = parseFloat(povertyData[i].percentBelowPovUnder5)
        let percentBelowPovUnder18 = parseFloat(povertyData[i].percentBelowPovUnder18)
        //language data
        let percentSpanishLang = parseFloat(languageData[i].percentSpanishLang)

        for (var j = 0; j < mapData.features.length; j++) {
            var jsonTract = mapData.features[j].properties.AFFGEOID;

            if (dataTract === jsonTract) {
                mapData.features[j].properties.foodAssistPercent = dataValue;
                mapData.features[j].properties.percentBelowPov18to64 = percentBelowPov18to64;
                mapData.features[j].properties.percentBelowPov65up = percentBelowPov65up;
                mapData.features[j].properties.percentBelowPovAll = percentBelowPovAll;
                mapData.features[j].properties.percentBelowPovFemaleAll = percentBelowPovFemaleAll;
                mapData.features[j].properties.percentBelowPovMaleAll = percentBelowPovMaleAll;
                mapData.features[j].properties.percentBelowPovUnder5 = percentBelowPovUnder5;
                mapData.features[j].properties.percentBelowPovUnder18 = percentBelowPovUnder18;
                mapData.features[j].properties.percentSpanishLang = percentSpanishLang;
                break;
            }
        }
    }

      const render = (mapData, allBoundData, supervisorDistricts, extensionSites) => {
        // console.log(mapData)
        // console.log(allBoundData)
          const g = svg.append('g')
              .attr('id', 'mainG')
              
          const tooltip = d3.select("#mapBox").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

          //legend stuff

          const colorLegendG = svg.append('g')
            .attr("id", "colorLegendG")
            .attr('transform', `translate(50, 275)`)

          colorLegendG.append('rect')
            .attr('class', 'legendBox')
            .attr('x', 10 * 2)
            .attr('y', height - 500)
            .attr('rx', 10 * 2)
            .attr('width', 250)
            .attr('height', 210)
            .attr('fill', 'white') //change to white
            .attr('opacity', .55);

          colorLegendG.selectAll('.legendScaleBox')
            .data(assistColor.range().map(function(d) {
              d = assistColor.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              return d;
            }))
            .enter().append("rect")
              .attr("class", "legendScaleBox")
              .attr("height", 9)
              .attr('y', height - 455)
              .attr("x", function(d) { return x(d[0]); })
              .attr("width", function(d) { return x(d[1]) - x(d[0]); })
              .attr("fill", function(d) { return color(d[0]); });

            colorLegendG.append("text")
              .attr("class", "legendOverlayLabel")
              .attr("id", "label")
              .attr("x", x.range()[0] + 20)
              .attr("y", height - 465)
              .attr("fill", "#000")
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text("% Receiving Assistance");

            let legendColorLabel = colorLegendG.append("g")
              .attr("id", "legendKeyTicks")
              .attr("class", "key")
              .attr("transform", "translate(" + (0) + ",224)")

            legendColorLabel.call(d3.axisBottom(x)
              .tickSize(13)
              .tickValues(color.domain()))
              .select(".domain")
              .remove();

            //cat circle legend

            let legCol = colorLegendG.append('g')
              .attr('transform', `translate(45, 283)`)
              .call(
                colorLegend, {
                  colorLegendScale,
                  circleRadius: 4,
                  spacing: 15,
                  textOffset: 12
                }
              )

            legCol.append('text')
              .text("Category")
              .attr('font-size', '1em')
              .attr('text-anchor', 'start')
              .attr('x', 12)
              .attr('y', -16)
            
            let legSize = colorLegendG.append('g')
              .attr('transform', `translate(175, 285)`)
              .call(
                sizeLegend, {
                  sizeLegendScale,
                  numTicks: 5,
                  spacing: 21,
                  textOffset: 10,
                  circleFill: 'rgba(0, 0, 0, 0.5'
                }
              )
            
            legSize.append('text')
              .text("Participants")
              .attr('font-size', '1em')
              .attr('text-anchor', 'start')
              .attr('x', -18)
              .attr('y', -16)

          //map

          g.selectAll('path')
              .data(mapData.features)
              .enter()
              .append('path')
              .attr('d', path)
              .attr("stroke-width", .075)
              .attr("stroke", "black")
              .attr('fill', 'lightBlue')
              .style("fill", function(d) {
                if(d.properties.foodAssistPerc === undefined) {
                }
                colorFiller(d, overlaySelect)
              })
              .on("click", (moreTractInfo))

            //supervisor overlay

            // g.selectAll('.supervisor')
            //     .data(supervisorDistricts.features)
            //     .enter()
            //     .append('path')
            //     .attr('class', 'supervisor')
            //     .attr('d', path)
            //     .attr('stroke-width', .475)
            //     .attr('stroke', 'blue')
            //     .attr('fill', 'white')
            //     .attr('opacity', .55)

            // assistanceSiteCircles(siteData, projection, selectSite, tooltip)

            // extensionSiteCircles(extensionSites, projection, selectExtensionSite, tooltip)

            d3.selectAll(".catButton")
              .on("click", function() {
                assistanceSiteFilter(this.id)
              })

            d3.selectAll('.extCatButton')
              .on("click", function() {
                extensionSiteFilter(this.id)
              })

            d3.selectAll(".overlayButton")
              .on("click", function() {
                switch(this.id) {
                  case 'assistOverlay':
                    overlaySelect = 'assist'
                    break;
                  case 'languageOverlay':
                    overlaySelect = 'language'
                    break;
                  case 'povertyOverlay':
                    overlaySelect = 'povertyRate'
                    break;
                  case 'medianIncomeOverlay':
                    overlaySelect = 'medianIncome'
                    break;
                  case 'medianAgeBothOverlay':
                    overlaySelect = 'medianAgeBoth'
                    break;
                  case 'disTotalOverlay':
                    overlaySelect = 'disTotal'
                    break;
                  case 'raceBlackPercOverlay':
                    overlaySelect = 'raceBlackPerc'
                    break;
                  case 'noInsuranceTotalOverlay':
                    overlaySelect = 'noInsuranceTotal'
                    break;
                  default: 
                    break;
                }
                g.selectAll('path')
                  .style('fill', function(d) {
                    colorFiller(d, overlaySelect)
                  })
              })

              //supervisor districts

              g.selectAll('.supervisor')
              .data(supervisorDistricts.features)
              .enter()
              .append('path')
              .attr('class', 'supervisor')
              .attr('d', path)
              .attr('stroke-width', .475)
              .attr('stroke', 'blue')
              .attr('fill', 'white')
              .attr('opacity', .55)
              .style('visibility', 'hidden')
              .on('mouseover', handleSupervisorOver)
              .on('mouseout', handleSupervisorOut)

              g.selectAll('.supervisorLabel')
              .data(supervisorDistricts.features)
              .enter()
              .append('text')
              .attr('class', 'supervisorLabel')
              .text(d => {
                  return d.properties.District_N;
              })
              .attr("x", (d) => {
                  if(d.properties.District_N === 1)
                      { return path.centroid(d)[0] + 20 }
                  else if (d.properties.District_N === 3)
                      { return path.centroid(d)[0] + 10 }
                  else if (d.properties.District_N === 2)
                      { return path.centroid(d)[0] + 8 }
                  else if (d.properties.District_N === 7)
                      { return path.centroid(d)[0] + 12 }
                  else if (d.properties.District_N === 3)
                      { return path.centroid(d)[0] + 12 }
                  else if (d.properties.District_N === 13)
                      { return path.centroid(d)[0] + 10 }
                  else if (d.properties.District_N === 5)
                      { return path.centroid(d)[0] - 20 }
                  else if (d.properties.District_N === 15)
                      { return path.centroid(d)[0] + 10 }
                  else if (d.properties.District_N === 10)
                      { return path.centroid(d)[0] - 8 }
                  else if (d.properties.District_N === 12)
                      { return path.centroid(d)[0] + 8 }
                  else if (d.properties.District_N === 4)
                      { return path.centroid(d)[0] + 35 }
                  else if (d.properties.District_N === 8)
                      { return path.centroid(d)[0] + 5 }
                  else if (d.properties.District_N === 17)
                      { return path.centroid(d)[0] + 35 }
                  else if (d.properties.District_N === 11)
                      { return path.centroid(d)[0] + 20 }
                  else if (d.properties.District_N === 9)
                      { return path.centroid(d)[0] + 55 }
                  return path.centroid(d)[0];
              })
              .attr("y", (d) => {
                  if (d.properties.District_N === 7)
                      { return path.centroid(d)[1] + 41 }
                  else if (d.properties.District_N === 13)
                      { return path.centroid(d)[1] + 15 }
                  else if (d.properties.District_N === 15)
                      { return path.centroid(d)[1] - 20 }
                  else if (d.properties.District_N === 10)
                      { return path.centroid(d)[1] + 20 }
                  else if (d.properties.District_N === 12)
                      { return path.centroid(d)[1] + 9 }
                  else if (d.properties.District_N === 4)
                      { return path.centroid(d)[1] + 4 }
                  else if (d.properties.District_N === 14)
                      { return path.centroid(d)[1] + 12 }
                  else if (d.properties.District_N === 17)
                      { return path.centroid(d)[1] + 18 }
                  else if (d.properties.District_N === 2)
                      { return path.centroid(d)[1] + 29 }
                  else if (d.properties.District_N === 11)
                      { return path.centroid(d)[1] - 25 }
                  return  path.centroid(d)[1];
              })
              .attr("text-anchor","middle")
              .style('visibility', 'hidden')

            
            
              extensionSiteCircles(extensionSites, projection, selectExtensionSite, tooltip)


            function handleSupervisorOver(d, i) {
              d3.select(this)
                .transition()
                .duration(550)
                .attr('opacity', 0)
            }

            function handleSupervisorOut(d, i) {
              d3.select(this)
                .transition()
                .duration(550)
                .attr('opacity', 0.55)
            }

              d3.selectAll(".municipalOverlayButton")
              .on("click", () => {                
                console.log("yup")
                if (supervisorFilter)
                  {
                    g.selectAll('.supervisor')
                      .style('visibility', 'hidden')
                    g.selectAll('.supervisorLabel')
                      .style('visibility', 'hidden')
                    supervisorFilter = false;
                  }
                else {
                  g.selectAll('.supervisor')
                    .style('visibility', 'visible')
                  g.selectAll('.supervisorLabel')
                    .style('visibility', 'visible')
                  supervisorFilter = true;
                }
              })

          svg.call(d3.zoom()
              .on('zoom', () => {
                  g.attr('transform', d3.event.transform);
              }))
      }   

      render(mapData, allBoundData, supervisorDistricts, extensionSites);
    // eslint-disable-next-line
  }, []); //change this to include foodAssist
    
  return (
      <div id="mapBox">
          <svg width={props.width} height={props.height}>
              <g ref={ref} />
          </svg>
      </div>
  )
}

export default MKEMap;