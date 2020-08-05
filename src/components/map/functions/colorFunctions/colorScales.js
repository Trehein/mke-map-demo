import * as d3 from 'd3'

export const color = d3.scaleQuantize()
.range(["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"])
.domain([0, 75]);

export const assistColor = d3.scaleQuantize()
.range(["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"])
.domain([0, 75]);