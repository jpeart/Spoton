import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3'
import './Viz2.css'
 
class SVGChart2 extends React.Component {
 
  render() {
    let data = this.props.data;
    //data.forEach(function(d) { d.time = new Date(d.time * 1000); });
    console.log(data);

    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

      //Create the element
      const div = new ReactFauxDOM.Element('div')
      div.setAttribute('class', 'viz-container')
       
      //Pass it to d3.select and proceed as normal

      let svg = d3.select(div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

//let parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");


let x = d3.scaleTime()

  .range([0, width]);

let y = d3.scaleLinear()
  .range([height, 0]);

  let line = d3.line()
  .x(function(data) { return x(data.time); })
  .y(function(data) { return y(data.reading); });
  
    x.domain(d3.extent(data, function(d) { return (d.time); }));
    //y.domain([0, d3.max(data, function(d) { return d.reading; })]);
    y.domain([0, 420]); //fixed Y axis
  
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .select(".domain")
  
    svg.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("mg/dl");
  
    /*svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#d30000")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line); */
        
    data.forEach(function(data){//iterate through the chunks

          //console.log("date data= " + data.date);
          let color = "";

          if (data.reading > 180 || data.reading < 70)
            color ="red";//less than 150 so make it red as this chunk is for less than 150
          else if (data.reading > 150 && data.reading < 180)
            color ="orange";//less than 150 so make it red as this chunk is for less than 150
          else 
            color ="green";//greater than 150 so make it blue as this chunk is for greater than 150

        svg.append("g")
          .append("circle")
          .attr("r", 3.5)
          .style("fill", color)
          .attr("cx", x(data.time))
          .attr("cy", y(data.reading));
        }); 

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (height / 12))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .text("Glucose Readings");
 
    //DOM manipulations done, convert to React
    return div.toReact()
    }
  
}

export default SVGChart2;