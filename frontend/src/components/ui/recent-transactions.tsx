import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { MoreVertical, Globe, Newspaper } from "lucide-react";
import { cryptoNewsService } from "../../externalApi/cryptoNewsService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { ArticlesResponse } from "@/types/crypto";

export default function RecentTransactions() {
  const { data } = useQuery<ArticlesResponse>({
    queryKey: ["cryptoNews"],
    queryFn: cryptoNewsService,
  });

  const news = data?.articles.map((el) => {
    return {
      id: el.description,
      description: el.description,
      date: el.pubDate,
      category: el.category,
      link: el.link,
    };
  });

  return (
    <>
      <Card className="bg-background gap-0 overflow-hidden rounded-lg p-0 shadow-none">
        <CardHeader className="bg-background flex flex-col items-center justify-between gap-2 border-b !p-3 md:flex-row">
          <div className="flex items-center gap-2">
            <Newspaper className="text-primary" />
            <div className="flex flex-col items-start gap-1">
              <CardTitle>
                <span>Latest Crypto News</span>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[25rem] space-y-3 overflow-auto p-3">
            {news?.map((el) => (
              <Link to={el.link}>
                <div
                  key={el.id}
                  className="group mb-4 from-secondary/30 hover:border-primary/50 flex items-center justify-between rounded-md border bg-gradient-to-r p-2"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium md:text-base">
                        {el.description}
                      </p>
                      <div className="flex flex-col gap-0.5 opacity-60 md:flex-row md:items-center md:gap-2">
                        <span className="hidden md:block">•</span>
                        <p className="text-[0.65rem] md:text-xs">
                          {new Date(el.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center justify-end gap-1 text-end">
                    <div className="flex flex-col items-center md:flex-row md:gap-4">
                      <Badge
                        variant="outline"
                        className="mt-1 ml-auto rounded px-1.5 py-0 text-[0.6rem] md:mt-0 md:px-3 md:py-1.5 md:text-xs"
                      >
                        {el.category}
                      </Badge>
                    </div>
                    <button>
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
