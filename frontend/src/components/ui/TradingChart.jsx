import React, { useEffect, useRef } from "react";
import { createChart, AreaSeries, CandlestickSeries } from "lightweight-charts";

const TradingChart = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,

      layout: {
        background: { color: "#0f172a" },
        textColor: "#d1d4dc",
      },

      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },

      rightPriceScale: {
        borderColor: "#374151",
      },

      timeScale: {
        borderColor: "#374151",
      },
    });

    const areaSeries = chart.addSeries(AreaSeries);
    const candleSeries = chart.addSeries(CandlestickSeries);

    areaSeries.setData([
      { time: "2018-12-29", value: 20 },
      { time: "2018-12-30", value: 21 },
      { time: "2018-12-31", value: 22.67 },
    ]);

    candleSeries.setData([
      { time: "2018-12-29", open: 100, high: 110, low: 90, close: 105 },
      { time: "2018-12-30", open: 105, high: 112, low: 101, close: 109 },
      {
        time: "2018-12-31",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    />
  );
};

export default TradingChart;
