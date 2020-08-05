import * as d3 from 'd3'
const assistanceSiteCircles = (siteData, projection, selectSite, tooltip) => {
    const moreInfo = function(d) {
        d3.selectAll('.siteCircle')
            .style("fill", function(d) {
            if (d.type === "Food Pantry") {
                return "yellow"
            } else if (d.type === "grab and Go Kids Meal") {
                return "blue"
            } else if (d.type === "Meal Program") {
                return "red"
            } else {
                return "black"
            }
            })
            .attr("stroke", "white")
            .attr("stroke-width", 0.25)
            .attr("stroke-opacity", 0.5);

        d3.select(this)
            .style("fill", function(d) {
            return "orange"
            })
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        selectSite(d);
    }

    let tipMouseover = function(d) {
    // eslint-disable-next-line no-useless-concat
    let html  = "Partner - " + "<strong>" + d.site + "</strong>" + "<br />" + "Participants - " + "<strong>" + d.participants + "</strong>" + "<br />" + "Dept. - " + "<strong>" + d.type + "</strong>";
        tooltip.html(html)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 165) + "px")
            .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!
    };
    // tooltip mouseout event handler
    var tipMouseout = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };
    
    // console.log(siteData)
    let g = d3.select('#mainG')

    g.selectAll(".siteCircle")
    .data(siteData)
    .enter()
    .append("circle")
    .attr("class", "siteCircle")
    .attr("cx", function(d) {
      return projection([d.lon, d.lat])[0];
    })
    .attr("cy", function(d) {
      return projection([d.lon, d.lat])[1];
    })
    .attr("r", function(d) {
      return Math.sqrt(parseInt(d.participants)) * 0.85;
    })
    .style("fill", function(d) {
      if (d.type === "Food Pantry") {
        return "yellow"
      } else if (d.type === "grab and Go Kids Meal") {
        return "blue"
      } else if (d.type === "Meal Program") {
        return "red"
      } else {
        return "black"
      }
    })
        .attr("stroke", "white")
        .attr("stroke-width", 0.25)
        .attr("stroke-opacity", 0.5)
        .style("fill-opacity", 0.5)
    .on("click", moreInfo)
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);
}

export default assistanceSiteCircles