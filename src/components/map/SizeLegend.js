export const sizeLegend = (selection, props ) => {
    const { 
        sizeLegendScale, 
        spacing,
        textOffset,
        numTicks,
        circleFill
    } = props; //unpacks all of the props

    const ticks = sizeLegendScale.ticks(numTicks)
        .filter(d => d !== 0) //gets all of the values from sizeScale domain that aren't 0
        .reverse() // puts the largest value in the array on top instead of bottom

    const groups = selection.selectAll('g').data(ticks);
    const groupsEnter = groups.enter().append('g');
    
    groupsEnter
        .merge(groups)
            .attr('transform', (d, i) => 
                `translate(0, ${i * spacing})`
            )

    groups.exit().remove(); 

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
            .attr('fill', circleFill)
            .attr('r', sizeLegendScale);

    groupsEnter.append('text')
        .merge(groups.select('text'))
            .text(d => d)
            .attr('font-size', '.75em')
            .attr('text-anchor', 'start')
            .attr('x', d => sizeLegendScale(d) + textOffset)//measures the distance from the edge of the circle
            .attr('dy', '0.32em') //magical vertical offset
}