import ForexStatsCards from "../components/ui/forex-stats-card";
import DashboardLayout from "../components/ui/dashboard-layout";
import MarketCapDominanceForex from "../components/ui/monthly-spending-chart-forex";
import ForexTradingChart from "../components/ui/forex-trading-chart";
import IncomeExpenseChartForex from "../components/ui/income-expense-chart-forex";
// import RecentTransactions from "../components/ui/recent-transactions";

export default function ForexDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-3 md:space-y-6">
        <ForexStatsCards />

        <div className="grid grid-cols-1 gap-3 md:gap-6 xl:grid-cols-2">
          <MarketCapDominanceForex />
          <IncomeExpenseChartForex />
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
          {/* <RecentTransactions /> */}
          <ForexTradingChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
