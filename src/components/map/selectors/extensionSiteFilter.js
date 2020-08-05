import * as d3 from 'd3'

function extensionSiteFilter(id) {
    let programSelect;
    switch(id) {
        case 'noFilter':
            programSelect = 'noFilter'
            break;
        case 'foodWIseFilter':
            programSelect = 'FoodWIse'
            break;
        case 'commDevFilter':
            programSelect = 'Comm Dev'
            break;
        case 'fourHFilter':
            programSelect = '4-H'
            break;
        case 'urbanAgFilter':
            programSelect = 'Urban Agriculture'
            break;
        case 'hortFilter':
            programSelect = 'Horticulture'
            break;
        case 'youthDevFilter':
            programSelect = 'Positive Youth Dev.'
            break;
        case 'hwbFilter':
            programSelect = 'Health & Well Being'
            break;
        case 'farmersFilter':
            programSelect = 'Farmers'
            break;
        default:
            break;
    }

    if (programSelect === 'noFilter') {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.program === undefined) {
                        return null
                    } else {
                        return Math.sqrt(parseInt(d.participants)) * 0.85;
                    }
                })
        )
    } else {
        return (
            d3.selectAll(".siteCircle")
                .transition()
                .duration(750)
                .attr("r", function(d) {
                    if (d.program === programSelect) {
                        return Math.sqrt(parseInt(d.participants)) * 0.85;
                    } else if (d.type === undefined) {
                        return null;
                    } else {
                    return 0
                    }
                })
        )
    }
}

export default extensionSiteFilter