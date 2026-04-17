import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import "../../index.css";
import TableSkeleton from "./table-skeleton.tsx";
import fetchTradingViewForexService from "../../externalApi/forex/fetchTradingViewForexService.ts";

const ForexTradingChart = () => {
  const [pair, setPair] = useState("EURUSD");
  const [period, setPeriod] = useState("Last Week");

  const { data } = useQuery({
    queryKey: ["forexChart", pair, period],
    queryFn: () => fetchTradingViewForexService({ pair, period }),
    refetchInterval: 1200000,
  });

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 600,
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

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries);

    const formattedData = data.map((el) => ({
      time: new Date(el[0]).toISOString().slice(0, 10),
      open: parseFloat(el[1]),
      high: parseFloat(el[2]),
      low: parseFloat(el[3]),
      close: parseFloat(el[4]),
    }));

    candleSeries.setData(formattedData);

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data]);

  if (!data) {
    return <TableSkeleton />;
  }

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        borderRadius: "10px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <select
          style={{
            appearance: "none",
            color: "#e2e8f0",
            border: "1px solid #334155",
            borderRadius: "10px",
            padding: "10px 36px 10px 14px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
          onMouseEnter={(e) => (e.target.style.border = "1px solid #6366f1")}
          onMouseLeave={(e) => (e.target.style.border = "1px solid #334155")}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #6366f1")}
          onBlur={(e) =>
            (e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)")
          }
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value={"Last Month"} style={{ background: "#0f172a" }}>
            Last Month
          </option>
          <option value={"Last Week"} style={{ background: "#0f172a" }}>
            Last Week
          </option>
          <option value={"Last Day"} style={{ background: "#0f172a" }}>
            Last Day
          </option>
        </select>

        <select
          style={{
            appearance: "none",
            background: "linear-gradient(145deg, #0061fc, #0f172a)",
            color: "#e2e8f0",
            border: "1px solid #334155",
            borderRadius: "10px",
            padding: "10px 36px 10px 14px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg fill='%23cbd5f5' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M5 7l5 5 5-5z'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
          onMouseEnter={(e) => (e.target.style.border = "1px solid #6366f1")}
          onMouseLeave={(e) => (e.target.style.border = "1px solid #334155")}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #6366f1")}
          onBlur={(e) =>
            (e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)")
          }
          onChange={(e) => setPair(e.target.value)}
        >
          <option value={"EURUSD"} style={{ background: "#0f172a" }}>
            EURUSD
          </option>
          <option value={"GBPUSD"} style={{ background: "#0f172a" }}>
            GBPUSD
          </option>
          <option value={"USDJPY"} style={{ background: "#0f172a" }}>
            USDJPY
          </option>
          <option value={"USDCHF"} style={{ background: "#0f172a" }}>
            USDCHF
          </option>
        </select>
      </div>
    </div>
  );
};

export default ForexTradingChart;
