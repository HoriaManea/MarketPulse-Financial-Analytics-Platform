import BudgetProgress from "../components/ui/budget-progress";
import DashboardLayout from "../components/ui/dashboard-layout";
import IncomeExpenseChart from "../components/ui/income-expense-chart";
import MonthlySpendingChart from "../components/ui/monthly-spending-chart";
import RecentTransactions from "../components/ui/recent-transactions";
import SavingsGoals from "../components/ui/savings-goals";
import StatsCards from "../components/ui/stats-cards";

export default function PersonalFinanceDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-3 md:space-y-6">
        {/* Stats Overview */}
        <StatsCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-3 md:gap-6 xl:grid-cols-2">
          <IncomeExpenseChart />
          <MonthlySpendingChart />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
          <BudgetProgress />
          <SavingsGoals />
        </div>
        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
}
