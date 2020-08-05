import * as d3 from 'd3'
const extensionSiteCircles = (extensionSites, projection, selectSite, tooltip) => {
    const moreInfo = function(d) {
        d3.selectAll('.siteCircle')
            .style("fill", function(d) {
                if (d.program === "FoodWIse") {
                    return "red"
                  } else if (d.program === "Comm Dev") {
                    return "orange"
                  } else if (d.program === "4-H") {
                    return "yellow"
                  } else if (d.program === "Urban Agriculture") {
                    return "green"
                  } else if (d.program === "Horticulture") {
                    return "blue"
                  } else if (d.program === "Positive Youth Dev.") {
                    return "purple"
                  } else if (d.program === "Health & Well Being") {
                    return "black"
                  } else {
                    return '#00bcd4'
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
    let html  = "Partner - " + d.partner + "<br />" + 
            "Program - " + d.program + "<br />" + 
            "Participants - " + d.participants;
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

    //filters out and returns only matching objs
    // const getFarmersSites = sites => sites
    //   .filter(obj => obj.program === 'Farmers')
    //   .map(obj => obj)

    // let farmersSites = getFarmersSites(extensionSites)

    // console.log(farmersSites)
    // g.selectAll('.siteCircle')
    // .data(farmersSites)
    // .enter()
    // .append('circle')
    // .attr("cx", function(d) {
    //   return projection([d.long, d.lat])[0];
    // })
    // .attr("cy", function(d) {
    //   return projection([d.long, d.lat])[1];
    // })
    // .attr("r", function(d) {
    //   return Math.sqrt(parseInt(d.participants)) * 0.75;
    // })
    // .style("fill", 'green')
    //     .attr("stroke", "white")
    //     .attr("stroke-width", 0.25)
    //     .attr("stroke-opacity", 0.5)
    //     .style("fill-opacity", 0.5)
    // .on("click", moreInfo)
    // .on("mouseover", tipMouseover)
    // .on("mouseout", tipMouseout);


    g.selectAll(".siteCircle")
    .data(extensionSites)
    .enter()
    .append("circle")
    .attr("class", "siteCircle")
    .attr("cx", function(d) {
      return projection([d.long, d.lat])[0];
    })
    .attr("cy", function(d) {
      return projection([d.long, d.lat])[1];
    })
    .attr("r", function(d) {
      return Math.sqrt(parseInt(d.participants)) * 0.85;
    })
    .style("fill", function(d) {
      if (d.program === "FoodWIse") {
        return "red"
      } else if (d.program === "Comm Dev") {
        return "orange"
      } else if (d.program === "4-H") {
        return "yellow"
      } else if (d.program === "Urban Agriculture") {
        return "green"
      } else if (d.program === "Horticulture") {
        return "blue"
      } else if (d.program === "Positive Youth Dev.") {
        return "purple"
      } else if (d.program === "Health & Well Being") {
        return "black"
      } else {
        return '#00bcd4'
      }
    })
    .attr("stroke", 'white')
    .attr("stroke-width", 0.25)
    .attr("stroke-opacity", 0.5)
    .style("fill-opacity", 0.5)
    .on("click", moreInfo)
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);
}

export default extensionSiteCircles