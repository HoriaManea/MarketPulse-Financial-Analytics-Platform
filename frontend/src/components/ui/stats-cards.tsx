import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Wallet,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import fetchCrypto from "../../externalApi/cryptoService";
import { useQuery } from "@tanstack/react-query";

type Crypto = {
  symbol: string;
  price: string;
};

export default function StatsCards() {
  const { data } = useQuery<Crypto[]>({
    queryKey: ["crypto"],
    queryFn: fetchCrypto,
    refetchInterval: 1000,
  });

  const stats = data?.map((el) => ({
    title: el.symbol,
    value: el.price,
    change: "+5.7%",
    trend: "up",
    icon: Target,
    description: "Of total income",
    gradient: "from-purple-500 to-pink-500",
  }));

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {stats?.map((stat) => (
        <Card
          key={stat.title}
          className="from-secondary/30 gap-2 overflow-hidden rounded-lg bg-gradient-to-br shadow-none transition-all duration-500 hover:scale-105"
        >
          <CardHeader className="flex w-full flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
            <div
              className={`rounded-sm bg-gradient-to-br p-2 ${stat.gradient}`}
            >
              <stat.icon className="size-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="rounded px-3 py-1.5 text-xs"
              >
                <TrendingUp className="mr-1 size-3" />
                {stat.change}
              </Badge>
              <span className="text-muted-foreground text-xs">
                {stat.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
