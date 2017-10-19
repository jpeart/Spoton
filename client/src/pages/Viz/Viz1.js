import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3'
import './Viz1.css';
 
class SVGChart extends React.Component {
 
  render() {
    let data = this.props.data;

 
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom;


    let x = d3.scaleLinear()
    .domain([0, 24])
    .rangeRound([0, width])
    ;

    let y = d3.scaleLinear()
    .domain([0, 420])
    .rangeRound([height, 0])
    ;

    let z = d3.scaleLinear()
    .domain([0, 160])
    .range(["white", "#d30000"])
    .interpolate(d3.interpolateLab);

    let formatTime = d3.timeFormat("%I %p"),
    formatHour = function (d) {
      if (d === 12) return "noon";
      if (d === 24 || d === 0) return "midnight";
      return formatTime(new Date(2013, 2, 9, d, 0));
    };

    let xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(formatHour)
    ;

    let yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(d3.format("d"));
 
 
    //Create the element
    const div = new ReactFauxDOM.Element('div')
    div.setAttribute('class', 'viz-container')
     
    //Pass it to d3.select and proceed as normal
    let svg = d3.select(div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);



      let glucose = svg.selectAll(".glucose")
      .data(data)
    .enter( ).append("g")
      .attr("class", "glucose")
      ;

  glucose.selectAll(".bin")
      .data(function (d) { return d.values; })
    .enter( ).append("rect")
      .attr("class", "bin")
      .attr("x", function (d, i) { return x(i); })
      .attr("width", function (d, i) { return  x(i+1) - x(i); })
      .style("fill", function(d) { return z(d); });

  glucose.each(function (d) {
    d3.select(this).selectAll(".bin")
        .attr("y", y(d.key) )
        .attr("height", 11 );
  });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
      
  svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("mg/dl");
      
  svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", (height / 12))
      .attr("text-anchor", "middle")  
      .style("font-size", "24px") 
      .text("Glucose Heatmap by Time of Day");
 
    //DOM manipulations done, convert to React
    return div.toReact()
  }
 
}

export default SVGChart;