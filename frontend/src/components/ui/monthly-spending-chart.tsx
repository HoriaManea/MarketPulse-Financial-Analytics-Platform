import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import TableSkeleton from "./table-skeleton";
import { useQuery } from "@tanstack/react-query";
import fetchForexDominance from "../../externalApi/forex/fetchForexDominance";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-background rounded-md border border-green-500/70 p-3 shadow-xl">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm" style={{ color: data.color }}>
          Amount : <span className="font-bold">${data.value}</span>
        </p>
        <p className="text-sm">
          Percentage : {((data.value / 1440) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function MarketCapDominance() {
  const { data } = useQuery({
    queryKey: ["forexDominance"],
    queryFn: fetchForexDominance,
    refetchInterval: 1200000,
  });

  if (!data) {
    return <TableSkeleton />;
  }
  return (
    <Card className="from-secondary/30 rounded-lg bg-gradient-to-t shadow-none">
      <CardHeader>
        <CardTitle>Market Cap Dominance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 md:h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="ml-10"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">$7.5T</p>
            <p className="text-muted-foreground text-sm">Daily Forex Volume</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">24h</p>
            <p className="text-muted-foreground text-sm">Market Availability</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
