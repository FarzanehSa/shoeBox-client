import React from "react";

import { VictoryBar, VictoryTheme, VictoryAxis, VictoryLabel, VictoryChart, VictoryPie } from 'victory';

export const BarChartProduct = ({barData}) => {

  return (
    <div className="product-chart">
      <span className="bar-title">Best Selling Products</span>
      <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
        <VictoryLabel text="Quantity" x={0} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8}/>
        <VictoryLabel text="Product" x={170} y={320} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8}/>
        <VictoryAxis 
          style={{ 
            tickLabels: {angle :-90, fontSize: 10, padding: -70} 
          }}
        />
        <VictoryAxis 
          dependentAxis
          style={{ 
            tickLabels: {fontSize: 10, padding: 2} 
          }}
        />
        <VictoryBar
          style={{ data: { fill: "CornflowerBlue", fillOpacity: 1	 } }}
          alignment="end"
          barRatio={0.5}
          data={barData}
          // data accessor for x values
          x="x"
          // data accessor for y values
          y='y'
        />
      </VictoryChart>
    </div>
  )
};

export const BarChartSale = ({barData}) => {

  return (
    <div className="sale-chart">
      <span className="bar-title">Total Sale - Last 5 Days</span>
      <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
        <VictoryLabel text="Total" x={0} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8}/>
        <VictoryLabel text="Date" x={170} y={320} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8}/>
        <VictoryAxis 
          style={{ 
            tickLabels: {angle :25, fontSize: 10, padding: 5} 
          }}
        />
        <VictoryAxis 
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
          style={{ 
            tickLabels: {fontSize: 10, padding: 0} 
          }}
        />
        <VictoryBar
          style={{ data: { fill: "ForestGreen", fillOpacity: 1	 } }}
          alignment="end"
          barRatio={0.5}
          data={barData}
          // data accessor for x values
          x="x"
          // data accessor for y values
          y='y'
        />
      </VictoryChart>
    </div>
  )
};

export const BarChartColor = ({barData}) => {

  return (
    <div className="color-chart">
      <span className="bar-title">Most Popular Color</span>
      <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
        <VictoryLabel text="Quantity" x={0} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8} />
        <VictoryLabel text="Color" x={170} y={330} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8} />
        <VictoryAxis 
          style={{ 
            tickLabels: {angle :0, fontSize: 10, padding: 0} 
          }}
        />
        <VictoryAxis 
          dependentAxis
          style={{ 
            tickLabels: {fontSize: 10, padding: 2} 
          }}
        />
        <VictoryBar
          style={{ data: { fill: "Orchid", fillOpacity: 1	 } }}
          alignment="end"
          barRatio={0.5}
          data={barData}
          // data accessor for x values
          x="x"
          // data accessor for y values
          y='y'
        />
      </VictoryChart>
    </div>
  )
};

export const BarChartSize = ({barData}) => {

  return (
    <div className="size-chart">
      <span className="bar-title">Best Selling Sizes</span>
      <VictoryPie
        labelComponent={<VictoryLabel angle={15}/>}
        colorScale={["tomato", "gold","Lime", "cyan", "MediumOrchid" ]}
        data={barData}
        style={{
          labels: {
            fontSize: 15, fill: "#c43a31"
          }
        }}
      />
    </div>
  )
};