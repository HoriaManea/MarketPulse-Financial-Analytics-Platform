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
import fetchForex from "../../externalApi/forex/fetchForex";
import ReactCountryFlag from "react-country-flag";

export default function ForexStatsCards() {
  const { data } = useQuery({
    queryKey: ["forex"],
    queryFn: fetchForex,
    refetchInterval: 1200,
  });

  if (!data) {
    return <CryptoDashboardSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {data[0]?.map((el) => {
        return (
          <Card
            key={el.id}
            className="from-secondary/30 gap-2 overflow-hidden rounded-lg bg-gradient-to-br shadow-none transition-all duration-500 hover:scale-105"
          >
            <CardHeader className="flex w-full flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">{el.title}</CardTitle>

              <div className={`rounded-sm bg-gradient-to-br p-1`}>
                <ReactCountryFlag
                  countryCode={el.flags?.[0]}
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                    marginRight: "10px",
                  }}
                />
                <ReactCountryFlag
                  countryCode={el.flags?.[1]}
                  svg
                  style={{ width: "2em", height: "2em" }}
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-3 text-2xl font-bold">
                <span className="text-green-500">{el.symbol}</span> {el.price}
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="rounded px-3 py-1.5 text-xs"
                >
                  <TrendingUp className="mr-1 size-3" />
                  {el.base}
                </Badge>

                <span className="text-muted-foreground text-xs">
                  {el.base}{" "}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
