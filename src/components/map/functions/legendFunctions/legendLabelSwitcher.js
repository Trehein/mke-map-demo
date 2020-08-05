import * as d3 from 'd3'

const legendLabelWrite = (labelText) => {
    d3.select("#label")
      .text(labelText)
  }

const povertyColor = d3.scaleQuantize()
    .range(["#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"])
    .domain([0, 75])

  const incomeColorScale = d3.scaleQuantize()
    .range(["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"])
    .domain([8500, 150000])

  const color = d3.scaleQuantize()
    .range(["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"])
    .domain([0, 75]);

  const assistColor = d3.scaleQuantize()
    .range(["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"])
    .domain([0, 75]);

  const medianAgeBothColor = d3.scaleQuantize()
    .range(["#880e4f", "#ad1457", "#c2185b", "#d81b60", "#e91e63", "#ec407a", "#f06292", "#f48fb1", "#f8bbd0", "#fce4ec"])
    .domain([18, 55])

  const disTotalColor = d3.scaleQuantize()
    .range(["#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"])
    .domain([0, 1000])

  const raceBlackPercColor = d3.scaleQuantize()
    .range(["#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92"])
    .domain([0, 100])

  const noInsuranceTotalColor = d3.scaleQuantize()
    .range(["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"])
    .domain([0, 750])

  var x = d3.scaleLinear()
    .domain([1, 16])
    .rangeRound([45,85]);

  var x2 = d3.scaleLinear()
    .domain([8500, 150000])
    .rangeRound([40,242]);

  var x3 = d3.scaleLinear()
    .domain([18, 55])
    .rangeRound([42,242]);

  var x4 = d3.scaleLinear()
    .domain([0, 1000])
    .rangeRound([42,242]);

  var x5 = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([42,242]);

  var x6 = d3.scaleLinear()
    .domain([0, 750])
    .rangeRound([42,242]);

const legendLabelSwitcher = (overlaySelect) => {
    let legendColorLabel;
    switch(overlaySelect){
      case "assist":
        legendLabelWrite("% Receiving Assistance")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x)
          .tickSize(13)
          .tickValues(color.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return color(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(color.range().map(function(d) {
            d = color.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return color(d[0]); });
          break;

      case "language":
        legendLabelWrite("% Spanish Speaking")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x)
          .tickSize(13)
          .tickValues(assistColor.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return assistColor(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(assistColor.range().map(function(d) {
            d = assistColor.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return assistColor(d[0]); });
          break;

      case "povertyRate":
        legendLabelWrite("% Below Poverty Rate")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x)
          .tickSize(13)
          .tickValues(povertyColor.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return povertyColor(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(povertyColor.range().map(function(d) {
            d = povertyColor.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return color(d[0]); });
        break;

      case "medianIncome":
        legendLabelWrite("Household Median Income")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x2)
          .tickSize(13)
          .tickValues(incomeColorScale.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return incomeColorScale(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(incomeColorScale.range().map(function(d) {
            d = incomeColorScale.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return incomeColorScale(d[0]); });
        break;

      case "medianAgeBoth":
        legendLabelWrite("Median Age")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x3)
          .tickSize(13)
          .tickValues(medianAgeBothColor.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return medianAgeBothColor(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(medianAgeBothColor.range().map(function(d) {
            d = medianAgeBothColor.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return medianAgeBothColor(d[0]); });
        break;

      case "disTotal":
        legendLabelWrite("People with Disabilities")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x4)
          .tickSize(13)
          .tickValues(disTotalColor.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return disTotalColor(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(disTotalColor.range().map(function(d) {
            d = disTotalColor.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return disTotalColor(d[0]); });
        break;

      case "raceBlackPerc":
        legendLabelWrite("% Black Pop.")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x5)
          .tickSize(13)
          .tickValues(raceBlackPercColor.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return raceBlackPercColor(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(raceBlackPercColor.range().map(function(d) {
            d = raceBlackPercColor.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return raceBlackPercColor(d[0]); });
        break;

      case "noInsuranceTotal":
        legendLabelWrite("Uninsured")
        d3.selectAll(".key")
          .remove()
        legendColorLabel = d3.select("#colorLegendG").append('g')
          .attr("id", "legendKeyTicks")
          .attr("class", "key")
          .attr("transform", "translate(" + (0) + ",224)")
        legendColorLabel.call(d3.axisBottom(x6)
          .tickSize(13)
          .tickValues(noInsuranceTotalColor.domain()))
          .select(".domain")
          .remove();
        d3.selectAll(".legendScaleBox")
          .attr("fill", function(d) { return noInsuranceTotalColor(d[0]); });
          d3.selectAll('.legendScaleBox')
          .data(noInsuranceTotalColor.range().map(function(d) {
            d = noInsuranceTotalColor.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
          .enter().append("rect")
            .attr("class", "legendScaleBox")
            .attr("fill", function(d) { return noInsuranceTotalColor(d[0]); });
        break;

      default:
        break;
    }
  }

export default legendLabelSwitcher