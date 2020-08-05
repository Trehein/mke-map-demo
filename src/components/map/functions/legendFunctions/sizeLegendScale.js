import * as d3 from 'd3'

const sizeLegendScale = d3.scaleSqrt()
    .domain([0, 200])
    .range([0, 11])

export default sizeLegendScale;