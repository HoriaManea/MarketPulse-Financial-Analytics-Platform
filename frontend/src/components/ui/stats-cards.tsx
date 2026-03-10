import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Target, TrendingUp } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import fetchCrypto from "../../externalApi/cryptoService";
import { useQuery } from "@tanstack/react-query";
import type { Crypto } from "../../types/crypto";
import { TokenETH, TokenBNB, TokenBTC, TokenSOL } from "@web3icons/react";

export default function StatsCards() {
  const { data } = useQuery<Crypto[]>({
    queryKey: ["crypto"],
    queryFn: fetchCrypto,
    refetchInterval: 1000,
  });

  const stats = data?.map((el) => {
    const symbol = el.symbol.replace("USDT", "");

    let icon;

    if (symbol === "BTC") {
      icon = () => <TokenBTC variant="branded" size={50} />;
    } else if (symbol === "ETH") {
      icon = () => <TokenETH variant="branded" size={50} />;
    } else if (symbol === "BNB") {
      icon = () => <TokenBNB variant="branded" size={50} />;
    } else if (symbol === "SOL") {
      icon = () => <TokenSOL variant="branded" size={50} />;
    } else {
      icon = () => <Target size={50} />;
    }

    return {
      title: symbol,
      value: Number(el.price).toFixed(3),
      change: "+5.7% From Last Week",
      trend: "up",
      icon,
      description: "",
      gradient: "from-blue-500 to-cyan-400",
    };
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {stats?.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="from-secondary/30 gap-2 overflow-hidden rounded-lg bg-gradient-to-br shadow-none transition-all duration-500 hover:scale-105"
          >
            <CardHeader className="flex w-full flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {stat.title}
              </CardTitle>

              <div
                className={`rounded-sm bg-gradient-to-br p-1 ${stat.gradient}`}
              >
                <Icon />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-3 text-2xl font-bold">
                <span className="text-green-500">$ </span>
                {stat.value}
              </div>

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
        );
      })}
    </div>
  );
}
