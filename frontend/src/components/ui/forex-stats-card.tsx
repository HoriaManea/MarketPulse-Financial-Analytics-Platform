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
import { useEffect, useState } from "react";

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
  const [data, setData] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const req = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=API_KEY`,
      );

      const res = await req.json();

      setData(res);
    }

    fetchData();
  }, []);

  if (!data) {
    return <CryptoDashboardSkeleton />;
  }

  console.log(data);
  return (
    // <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
    //   {data?.map((el) => {
    //     return (
    //       <Card
    //         key={el["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}
    //         className="from-secondary/30 gap-2 overflow-hidden rounded-lg bg-gradient-to-br shadow-none transition-all duration-500 hover:scale-105"
    //       >
    //         <CardHeader className="flex w-full flex-row items-center justify-between">
    //           <CardTitle className="text-lg font-medium">
    //             {el["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}{" "}
    //             {el["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}
    //           </CardTitle>

    //           <div className={`rounded-sm bg-gradient-to-br p-1`}>
    //             <ReactCountryFlag
    //               countryCode="EU"
    //               svg
    //               style={{
    //                 width: "2em",
    //                 height: "2em",
    //                 marginRight: "10px",
    //               }}
    //             />
    //             <ReactCountryFlag
    //               countryCode="US"
    //               svg
    //               style={{ width: "2em", height: "2em" }}
    //             />
    //           </div>
    //         </CardHeader>

    //         <CardContent>
    //           <div className="mb-3 text-2xl font-bold">
    //             <span className="text-green-500">$ </span>
    //             {el["Realtime Currency Exchange Rate"]["8. Bid Price"]}
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <Badge
    //               variant="secondary"
    //               className="rounded px-3 py-1.5 text-xs"
    //             >
    //               <TrendingUp className="mr-1 size-3" />
    //               {el["Realtime Currency Exchange Rate"]["8. Bid Price"]}
    //             </Badge>

    //             <span className="text-muted-foreground text-xs">
    //               {el["Realtime Currency Exchange Rate"]["8. Bid Price"]}
    //             </span>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     );
    //   })}
    // </div>
    <></>
  );
}
