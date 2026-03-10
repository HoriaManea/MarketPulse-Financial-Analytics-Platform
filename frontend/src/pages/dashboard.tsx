import BudgetProgress from "../components/ui/budget-progress";
import DashboardLayout from "../components/ui/dashboard-layout";
import IncomeExpenseChart from "../components/ui/income-expense-chart";
import MonthlySpendingChart from "../components/ui/monthly-spending-chart";
import RecentTransactions from "../components/ui/recent-transactions";
import SavingsGoals from "../components/ui/savings-goals";
import StatsCards from "../components/ui/stats-cards";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-3 md:space-y-6">
        <StatsCards />

        <div className="grid grid-cols-1 gap-3 md:gap-6 xl:grid-cols-2">
          <IncomeExpenseChart />
          <MonthlySpendingChart />
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
          <BudgetProgress />
          <SavingsGoals />
        </div>
        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
}
