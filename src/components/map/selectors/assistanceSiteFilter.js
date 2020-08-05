import * as d3 from 'd3'

function assistanceSiteFilter(id) {
    if (id === "noFilter") {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.type === undefined) {
                        return null
                    } else {
                        return Math.sqrt(parseInt(d.participants)) * 0.85;
                    }
                })
        )
    } else if (id === "foodPantryFilter") {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.type === "Food Pantry") {
                        return Math.sqrt(parseInt(d.participants)) * 0.85;
                    } else if (d.type === undefined) {
                        return null;
                    } else {
                    return 0
                    }
                })
        )
    } 
    else if (id === "grabNGoFilter") {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.type === "grab and Go Kids Meal") {
                    return Math.sqrt(parseInt(d.participants)) * 0.85;
                    } else if (d.type === undefined) {
                        return null;
                    } else {
                    return 0
                    }
                })
        )
    } 
    else if (id === "mobileFilter") {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.type === "Mobile") {
                    return Math.sqrt(parseInt(d.participants)) * 0.85;
                    } else if (d.type === undefined) {
                        return null;
                    } else {
                    return 0
                    }
                })
        )
    } 
    else if (id === "mealProgramFilter") {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.type === "Meal Program") {
                    return Math.sqrt(parseInt(d.participants)) * 0.85;
                    } else if (d.type === undefined) {
                        return null;
                    } else {
                    return 0
                    }
                })
        )
    } 
    else {
        console.log("none")
    }
}

export default assistanceSiteFilter;