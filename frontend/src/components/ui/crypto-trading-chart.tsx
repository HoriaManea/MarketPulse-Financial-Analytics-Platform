import { useEffect, useRef, useState } from "react";
import { createChart, AreaSeries, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import tradingViewCryptoService from "../../externalApi/crypto/tradingViewCryptoService.ts";
import "../../index.css";
import TableSkeleton from "./table-skeleton.tsx";

const CryptoTradingChart = () => {
  const [crypto, setCryto] = useState("BTC");
  const [period, setPeriod] = useState("Last Month");

  const { data } = useQuery({
    queryKey: ["cryptoLastYear", crypto, period],
    queryFn: () => tradingViewCryptoService({ crypto, period }),
    refetchInterval: 1200000,
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

    const timeScale = chart.timeScale();

    timeScale.setVisibleRange({
      from: formattedData[0].time,
      to: formattedData[formattedData.length - 1].time,
    });

    return () => chart.remove();
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
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option
            value={"Last Month"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
            Last Month
          </option>
          <option
            value={"Last Week"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
            Last Week
          </option>
          <option
            value={"Last Day"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
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
          onChange={(e) => setCryto(e.target.value)}
        >
          <option
            value={"BTC"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
            BTC
          </option>
          <option
            value={"ETH"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
            ETH
          </option>
          <option
            value={"SOL"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
            SOL
          </option>
          <option
            value={"BNB"}
            style={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
          >
            BNB
          </option>
        </select>
      </div>
    </div>
  );
};

export default CryptoTradingChart;
