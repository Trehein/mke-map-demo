import * as d3 from 'd3'
import colorScaleData from './colorScaleData'

const colorScaler = (overlaySelect) => {
    let scaleValue = d3.scaleQuantize()
        .range(colorScaleData[overlaySelect].range)
        .domain(colorScaleData[overlaySelect].domain);
    return scaleValue;
}

export default colorScaler;