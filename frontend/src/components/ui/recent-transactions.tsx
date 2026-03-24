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
          <div className="max-h-[25rem] overflow-y-auto p-3 space-y-3">
            {news?.map((el) => (
              <Link to={el.link} key={el.id} className="block">
                <div className="group relative flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-background to-muted/40 p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-[2px]">
                  {/* accent line */}
                  <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-primary opacity-0 transition group-hover:opacity-100" />

                  {/* LEFT */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Globe className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm md:text-[15px] font-medium leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                        {el.description}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(el.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="rounded-lg px-2 py-0.5 text-[10px] md:text-xs bg-primary/10 text-primary border-0"
                    >
                      {el.category}
                    </Badge>

                    <button className="opacity-40 transition group-hover:opacity-100">
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
