import * as d3 from 'd3'

// const colorLegendScale = d3.scaleOrdinal()
//       .domain(['Food Pantries', 'Grab n Go', 'Meal Program', 'Mobile'])
//       .range(['gold', '#3f51b5', '#f44336', '#424242'])

const colorLegendScale = d3.scaleOrdinal()
      .domain(['FoodWIse', 'Comm Dev', '4-H','Urban Ag', 'Hort', 'Youth Dev', 'HWB'])
      .range(['#f44336', '#ff9800', 'gold', '#4caf50', '#3f51b5', '#9c27b0', '#424242'])

export default colorLegendScale;