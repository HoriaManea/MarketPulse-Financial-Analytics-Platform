import { useEffect, useRef } from "react";
import { createChart, AreaSeries, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import lastTwelveMonthsService from "../../externalApi/lastTwelveMonthsService.ts";

const TradingChart = () => {
  const { data } = useQuery({
    queryKey: ["cryptoLastYeare"],
    queryFn: lastTwelveMonthsService,
    refetchInterval: 122000,
  });

  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;
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

    const formattedData = data.map((el) => ({
      time: Math.floor(el[0] / 1000),
      open: parseFloat(el[1]),
      high: parseFloat(el[2]),
      low: parseFloat(el[3]),
      close: parseFloat(el[4]),
    }));

    candleSeries.setData(formattedData);

    return () => chart.remove();
  }, [data]);

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
