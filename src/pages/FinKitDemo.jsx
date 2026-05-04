import { useMemo, useState } from "react"
import { BarChart3, IndianRupee, TrendingUp } from "lucide-react"
import {
  BudgetRing,
  CashFlowChart,
  ExpenseBar,
  NetWorthCard,
  SavingsGoal,
  calcNetWorth,
  calcSavingsProgress,
  daysToGoal,
  formatCurrency,
} from "react-finkit"

const cashFlowSeed = [
  { label: "Jan", income: 98000, spend: 54000 },
  { label: "Feb", income: 102000, spend: 61000 },
  { label: "Mar", income: 106000, spend: 58000 },
  { label: "Apr", income: 109000, spend: 64000 },
  { label: "May", income: 112000, spend: 69000 },
  { label: "Jun", income: 118000, spend: 71000 },
]

function MetricCard({ label, value, tone = "blue" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  }

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default function FinKitDemo() {
  const [spent, setSpent] = useState(63500)
  const [budget, setBudget] = useState(90000)
  const [currentSavings, setCurrentSavings] = useState(240000)
  const [targetSavings, setTargetSavings] = useState(600000)
  const [monthlySavings, setMonthlySavings] = useState(30000)
  const [assets, setAssets] = useState(1825000)
  const [liabilities, setLiabilities] = useState(460000)

  const cashFlowData = useMemo(
    () =>
      cashFlowSeed.map((entry, index) => ({
        ...entry,
        income: entry.income + index * 1000,
        spend: entry.spend + Math.round(spent * 0.04) - index * 300,
      })),
    [spent]
  )

  const netWorth = calcNetWorth(assets, liabilities)
  const savingsProgress = calcSavingsProgress(currentSavings, targetSavings)
  const goalDays = daysToGoal(currentSavings, targetSavings, monthlySavings)

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-6 py-8 text-white shadow-lg">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
              <BarChart3 size={14} />
              React FinKit Demo
            </div>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-bold leading-tight lg:text-4xl">
                A live sandbox for every `react-finkit` component
              </h2>
              <p className="max-w-2xl text-sm text-slate-200 lg:text-base">
                This page uses all five exported UI components and the utility
                helpers from the library so you can validate the package in one
                place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Formatted Budget"
                value={formatCurrency(budget, { currency: "INR", locale: "en-IN" })}
              />
              <MetricCard
                label="Net Worth"
                value={formatCurrency(netWorth, { currency: "INR", locale: "en-IN" })}
                tone="emerald"
              />
              <MetricCard
                label="Goal ETA"
                value={goalDays === Infinity ? "N/A" : `${Math.ceil(goalDays / 30)} mo`}
                tone="amber"
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-100">
              <TrendingUp size={18} />
              Scenario controls
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm text-slate-200">Monthly budget</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-slate-200">Spent so far</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={spent}
                  onChange={e => setSpent(Number(e.target.value))}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-slate-200">Current savings</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={currentSavings}
                  onChange={e => setCurrentSavings(Number(e.target.value))}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-slate-200">Monthly contribution</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={monthlySavings}
                  onChange={e => setMonthlySavings(Number(e.target.value))}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-slate-200">Assets</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={assets}
                  onChange={e => setAssets(Number(e.target.value))}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-slate-200">Liabilities</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={liabilities}
                  onChange={e => setLiabilities(Number(e.target.value))}
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm text-slate-200">Savings target</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none ring-0"
                  type="number"
                  value={targetSavings}
                  onChange={e => setTargetSavings(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <IndianRupee className="text-blue-600" size={18} />
              <h3 className="text-lg font-bold text-slate-900">ExpenseBar</h3>
            </div>
            <ExpenseBar
              spent={spent}
              budget={budget}
              currency="INR"
              locale="en-IN"
              className="max-w-2xl"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              SavingsGoal
            </h3>
            <SavingsGoal
              current={currentSavings}
              target={targetSavings}
              monthly={monthlySavings}
              currency="INR"
              locale="en-IN"
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Utility progress
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {Math.round(savingsProgress)}%
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Utility days
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {goalDays === Infinity ? "N/A" : goalDays}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              CashFlowChart
            </h3>
            <CashFlowChart
              data={cashFlowData}
              currency="INR"
              locale="en-IN"
              title="Income vs spending"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              BudgetRing
            </h3>
            <div className="flex justify-center">
              <BudgetRing
                spent={spent}
                budget={budget}
                title="Operating budget"
                currency="INR"
                locale="en-IN"
                size={188}
                strokeWidth={16}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              NetWorthCard
            </h3>
            <NetWorthCard
              assets={assets}
              liabilities={liabilities}
              currency="INR"
              locale="en-IN"
              className="rounded-3xl border-slate-200"
            />
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <h3 className="text-lg font-bold text-slate-900">
              Exported utilities in use
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                `formatCurrency` powers the hero metrics and mirrors the library
                formatting defaults for `INR` and `en-IN`.
              </p>
              <p>
                `calcNetWorth` computes the value shown in `NetWorthCard`.
              </p>
              <p>
                `calcSavingsProgress` and `daysToGoal` back the goal summary
                stats beside `SavingsGoal`.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
