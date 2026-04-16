import { Card, CardContent, CardHeader, CardTitle } from "./card.tsx";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart.tsx";
import { useQuery } from "@tanstack/react-query";
import type { LastYearCrypto } from "@/types/crypto";
import TableSkeleton from "./table-skeleton.tsx";
import fetchForexFullYear from "../../externalApi/forex/fetchForexFullYear.ts";

export default function IncomeExpenseChartForex() {
  const { data } = useQuery<LastYearCrypto[]>({
    queryKey: ["cryptoLastYear"],
    queryFn: fetchForexFullYear,
    refetchInterval: 86400000,
  });

  console.log(data);

  const stats = data?.map((el) => {
    const month = new Date(el[0]).toLocaleString("en-US", { month: "short" });

    return {
      month,
      income: Number(el[2]),
      expenses: Number(el[3]),
      net: Number(el[2]) - Number(el[3]),
    };
  });

  if (!data) {
    return <TableSkeleton />;
  }
  return (
    <Card className="from-secondary/30 rounded-lg bg-gradient-to-t shadow-none">
      <CardHeader className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <CardTitle>See Last EUR/USD💶 Year Results</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-500"></div>
            <span>Diffence</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer
          config={{
            income: { label: "High", color: "#10b981" },
            expenses: { label: "Low", color: "#ef4444" },
            net: { label: "Difference", color: "#3b82f6" },
          }}
          className="h-[15rem] w-full md:h-[20rem]"
        >
          <BarChart data={stats}>
            <CartesianGrid vertical={true} />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="var(--color-expenses)"
              radius={[4, 4, 0, 0]}
            />
            <Bar dataKey="net" fill="var(--color-net)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
