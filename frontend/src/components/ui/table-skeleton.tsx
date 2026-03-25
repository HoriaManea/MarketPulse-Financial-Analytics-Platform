import currentEurUsrService from "../../externalApi/forex/currentEurUsdService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-gray-500/40 ${className}`} />
  );
}

const data = await currentEurUsrService();

console.log(data);

export default function TableSkeleton() {
  return (
    <Card className="from-secondary/30 rounded-lg bg-gradient-to-t shadow-none">
      <CardHeader className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <CardTitle>
          <SkeletonBox className="h-[20px] w-[180px]" />
        </CardTitle>

        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <SkeletonBox className="size-3 rounded-full" />
              <SkeletonBox className="h-[12px] w-[50px]" />
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="h-[15rem] w-full animate-pulse rounded bg-gray-500/40 md:h-[20rem]" />
      </CardContent>
    </Card>
  );
}
