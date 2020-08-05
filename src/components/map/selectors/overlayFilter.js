import * as d3 from 'd3'

function overlayFilter(id, colorFiller) {
    console.log(id)
    let g = d3.select('#mainG')
    let overlaySelect;
    
    if (id === "assistOverlay") {
        console.log(id)

        overlaySelect = "assist"
        g.selectAll('path')
          .style("fill", function(d) {
            colorFiller(d, overlaySelect)
        })
    } else 
    if (id === "languageOverlay") {
        console.log(id)

      overlaySelect = "language"
      // console.log(overlaySelect)
      g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    } else if (id === "povertyOverlay") {
        overlaySelect = "povertyRate"
        // console.log(overlaySelect)
        g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    } else if (id === "medianIncomeOverlay") {
        overlaySelect = "medianIncome"
        // console.log(overlaySelect)
        g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    } else if (id === "medianAgeBothOverlay") {
        overlaySelect = "medianAgeBoth"
        // console.log(overlaySelect)
        g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    } else if (id === "disTotalOverlay") {
        overlaySelect = "disTotal"
        // console.log(overlaySelect)
        g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    } else if (id === "raceBlackPercOverlay") {
        overlaySelect = "raceBlackPerc"
        // console.log(overlaySelect)
        g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    } else if (id === "noInsuranceTotalOverlay") {
        overlaySelect = "noInsuranceTotal"
        // console.log(overlaySelect)
        g.selectAll('path')
        .style("fill", function(d) {
            colorFiller(d)
        })
    }
}

export default overlayFilter