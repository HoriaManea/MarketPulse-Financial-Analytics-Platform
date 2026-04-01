import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { TrendingUp } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import CryptoDashboardSkeleton from "./dashboard-skeleton";
import currentEurUsrService from "../../externalApi/forex/currentEurUsdService";
import ReactCountryFlag from "react-country-flag";

export type ForexRate = {
  "1. From_Currency Code": string;
  "2. From_Currency Name": string;
  "3. To_Currency Code": string;
  "4. To_Currency Name": string;
  "5. Exchange Rate": string;
  "6. Last Refreshed": string;
  "7. Time Zone": string;
  "8. Bid Price": string;
  "9. Ask Price": string;
};

export type ForexResponse = {
  "Realtime Currency Exchange Rate": ForexRate;
};

export default function ForexStatsCards() {
  const { data } = useQuery<ForexResponse[]>({
    queryKey: ["forex"],
    queryFn: currentEurUsrService,
    refetchInterval: 1200000,
  });

  console.log(data);
  //   const stats = data?.map((el) => {
  //     const symbol = el.symbol.replace("USDT", "");

  //     let icon;

  //     if (symbol === "BTC") {
  //       icon = () => <TokenBTC variant="branded" size={50} />;
  //     } else if (symbol === "ETH") {
  //       icon = () => <TokenETH variant="branded" size={50} />;
  //     } else if (symbol === "BNB") {
  //       icon = () => <TokenBNB variant="branded" size={50} />;
  //     } else if (symbol === "SOL") {
  //       icon = () => <TokenSOL variant="branded" size={50} />;
  //     } else {
  //       icon = () => <Target size={50} />;
  //     }

  //     return {
  //       title: symbol,
  //       value: Number(el.price).toFixed(3),
  //       change: "+5.7% From Last Week",
  //       trend: "up",
  //       icon,
  //       description: "",
  //       gradient: "from-blue-500 to-cyan-400",
  //     };
  //   });

  if (!data) {
    return <CryptoDashboardSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {data?.map((el) => {
        return (
          <Card
            key={el["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}
            className="from-secondary/30 gap-2 overflow-hidden rounded-lg bg-gradient-to-br shadow-none transition-all duration-500 hover:scale-105"
          >
            <CardHeader className="flex w-full flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {el["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}{" "}
                {el["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}
              </CardTitle>

              <div className={`rounded-sm bg-gradient-to-br p-1`}>
                <ReactCountryFlag
                  countryCode="EU"
                  svg
                  style={{ width: "2em", height: "2em", marginRight: "10px" }}
                />
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{ width: "2em", height: "2em" }}
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-3 text-2xl font-bold">
                <span className="text-green-500">$ </span>
                {el["Realtime Currency Exchange Rate"]["8. Bid Price"]}
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="rounded px-3 py-1.5 text-xs"
                >
                  <TrendingUp className="mr-1 size-3" />
                  {el["Realtime Currency Exchange Rate"]["8. Bid Price"]}
                </Badge>

                <span className="text-muted-foreground text-xs">
                  {el["Realtime Currency Exchange Rate"]["8. Bid Price"]}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
