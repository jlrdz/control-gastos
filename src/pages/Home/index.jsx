import { useState } from "react";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState("March 2024");

  return (
    <section className="space-y-2">
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button className="neomorph-card px-6 py-3 rounded-xl flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <span>{selectedMonth}</span>
            </button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="neomorph-card p-6 rounded-2xl">
              <div className="text-sm text-muted-foreground mb-2">
                Monthly Spend
              </div>
              <div className="text-3xl font-semibold text-foreground">
                $1,200
              </div>
            </div>

            <div className="neomorph-card p-6 rounded-2xl">
              <div className="text-sm text-muted-foreground mb-2">
                Budget Left
              </div>
              <div className="text-3xl font-semibold text-foreground">$800</div>
            </div>

            <div className="neomorph-card p-6 rounded-2xl">
              <div className="text-sm text-muted-foreground mb-2">
                Total Saved
              </div>
              <div className="text-3xl font-semibold text-foreground">
                $3,500
              </div>
            </div>
          </div>

          {/* Chart and Transactions */}
          <div className="grid grid-cols-2 gap-6">
            {/* Donut Chart */}
            <div className="neomorph-card p-8 rounded-2xl flex items-center justify-center">
              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                className="transform -rotate-90"
              >
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="var(--color-chart-1)"
                  strokeWidth="28"
                  strokeDasharray="175 440"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="var(--color-chart-2)"
                  strokeWidth="28"
                  strokeDasharray="110 440"
                  strokeDashoffset="-175"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="var(--color-chart-3)"
                  strokeWidth="28"
                  strokeDasharray="88 440"
                  strokeDashoffset="-285"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="var(--color-chart-4)"
                  strokeWidth="28"
                  strokeDasharray="67 440"
                  strokeDashoffset="-373"
                />
              </svg>
            </div>

            {/* Recent Transactions */}
            <div className="neomorph-card p-8 rounded-2xl">
              <h2 className="text-lg text-muted-foreground mb-6">
                Recent Transactions
              </h2>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transaction 1</span>
                  <span className="text-foreground font-medium">$250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transaction 2</span>
                  <span className="text-foreground font-medium">$120</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transaction 3</span>
                  <span className="text-foreground font-medium">$80</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
