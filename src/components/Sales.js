import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


function Sales({ data }) {
  const { sales } = data;

    
  const d3Chart1 = useRef();
  const d3Chart2 = useRef();
  

  function drawChart() {
    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50,
      },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%Y-%m-%d");

    var x = d3.scaleTime().range([0, 900]);

    var y = d3.scaleLinear().range([height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = d3.axisBottom().scale(x);

    var yAxis = d3.axisLeft().scale(y);

    var line = d3
      .line()
      .x(function (d) {
        return x(d.weekEnding);
      })
      .y(function (d) {
        return y(d.saleAmount);
      })
      .curve(d3.curveBasis);

    color.domain(
      Object.keys(sales[0]).filter(function (key) {
        return key === "retailSales" || key === "wholesaleSales";
      })
    );

    sales.forEach((d) => {
      d.weekEnding = parseDate(d.weekEnding);
    });

    let saleChartData = color.domain().map(function (name) {
      return {
        name: name,
        values: sales.map((d) => {
          return {
            weekEnding: d.weekEnding,
            saleAmount: d[name],
          };
        }),
      };
    });


    x.domain(
      d3.extent(sales, function (d) {
        return d.weekEnding;
      })
    );

    y.domain([
      d3.min(saleChartData, function (c) {
        return d3.min(c.values, function (v) {
          return v.saleAmount;
        });
      }),
      d3.max(saleChartData, function (c) {
        return d3.max(c.values, function (v) {
          return v.saleAmount;
        });
      }),
    ]);

    var svg = d3
      .select(d3Chart2.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var legend = svg
      .selectAll("g")
      .data(saleChartData)
      .enter()
      .append("g")
      .attr("class", "legend");

    legend
      .append("rect")
      .attr("x", width - 45)
      .attr("y", function (d, i) {
        return i * 20;
      })
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function (d) {
        return color(d.name);
      });

    legend
      .append("text")
      .attr("x", width - 30)
      .attr("y", function (d, i) {
        return i * 20 + 10;
      })
      .text(function (d) {
        return d.name;
      });

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
    //.text("Temperature (ºF)");

    var city = svg
      .selectAll(".city")
      .data(saleChartData)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", function (d) {
        return line(d.values);
      })
      .style("stroke", function (d) {
        return color(d.name);
      })
      .style("fill", "none");

  }

  useEffect(() => {    

    drawChart();
  }, []);

  return (
    <div>
      <div ref={d3Chart1}></div>
      <div ref={d3Chart2}></div>
    </div>
  );
}

export default Sales;
