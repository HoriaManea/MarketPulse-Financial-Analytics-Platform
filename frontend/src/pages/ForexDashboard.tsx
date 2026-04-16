import ForexStatsCards from "../components/ui/forex-stats-card";
import DashboardLayout from "../components/ui/dashboard-layout";
import IncomeExpenseChart from "../components/ui/income-expense-chart";
import MonthlySpendingChart from "../components/ui/monthly-spending-chart";
import ForexTradingChart from "../components/ui/forex-trading-chart";
// import RecentTransactions from "../components/ui/recent-transactions";

export default function ForexDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-3 md:space-y-6">
        <ForexStatsCards />

        <div className="grid grid-cols-1 gap-3 md:gap-6 xl:grid-cols-2">
          <MonthlySpendingChart />
          <IncomeExpenseChart />
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
          {/* <RecentTransactions /> */}
          <ForexTradingChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
