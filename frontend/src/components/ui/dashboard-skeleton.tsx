import DashboardLayout from "../..//components/ui/dashboard-layout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { TrendingUp } from "lucide-react";

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-gray-500/40 ${className}`} />
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {[1, 2, 3, 4].map((_, i) => (
        <Card
          key={i}
          className="from-secondary/30 gap-2 overflow-hidden rounded-lg bg-gradient-to-br shadow-none"
        >
          <CardHeader className="flex w-full flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              <div className="h-[20px] w-[40px] animate-pulse rounded bg-gray-500/40" />
            </CardTitle>

            <div className="rounded-sm bg-gradient-to-br from-blue-500 to-cyan-400 p-1">
              <div className="h-[50px] w-[50px] animate-pulse rounded bg-white/30" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-3 text-2xl font-bold">
              <span className="text-green-500">$ </span>
              <span className="inline-block h-[24px] w-[80px] animate-pulse rounded bg-gray-500/40 align-middle" />
            </div>

            <div className="flex items-center justify-between">
              <div className="h-[28px] w-[140px] animate-pulse rounded bg-gray-500/40" />
              <div className="h-[12px] w-[50px] animate-pulse rounded bg-gray-500/40" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function CryptoDashboardSkeleton() {
  return <StatsCardsSkeleton />;
}
