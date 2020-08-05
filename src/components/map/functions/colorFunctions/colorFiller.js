import legendLabelSwitcher from '../legendFunctions/legendLabelSwitcher'
import colorScaler from './colorScaler'
import colorFillerFunc from './colorFillerFunc'

const colorFiller = (d, overlaySelect) => {
    legendLabelSwitcher(overlaySelect)
    let colorScale = colorScaler(overlaySelect)
    colorFillerFunc(colorScale, overlaySelect)
}

export default colorFiller
