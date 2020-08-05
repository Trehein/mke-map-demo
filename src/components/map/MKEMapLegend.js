export const MKEMapLegend = (selection, props ) => {
    const { 
        colorScale, 
        circleRadius,
        spacing,
        textOffset
    } = props; //unpacks all of the props

    const groups = selection.selectAll('g')
        .data(colorScale.domain());
    const groupsEnter = groups.enter().append('g');
    
    groupsEnter
        .merge(groups)
            .attr('transform', (d, i) => 
                `translate(0, ${i * spacing})`
            )

    groups.exit().remove(); 

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
            .attr('fill', colorScale)
            .attr('r', circleRadius);

    groupsEnter.append('text')
        .merge(groups.select('text'))
            .text(d => d)
            .attr('font-size', '1em')
            .attr('text-anchor', 'start')
            .attr('x', textOffset) //moving 120 right off of the group translation
            .attr('dy', '0.32em') //magical vertical offset
}