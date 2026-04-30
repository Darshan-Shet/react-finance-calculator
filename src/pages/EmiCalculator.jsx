import { useState } from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"
import { IndianRupee, Percent, Calendar, Lightbulb, TrendingUp, Calculator, CheckCircle } from "lucide-react"
import { calculateEMI, generateEmiBreakdown } from "../utils/formulas"
import InputField from "../components/InputField"

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)

  const emi = calculateEMI(principal, rate, years)
  const interest = emi * years * 12 - principal
  const totalPayment = principal + interest
  const data = generateEmiBreakdown(principal, rate, years)
  const interestPercentage = ((interest / totalPayment) * 100).toFixed(1)

  return (
    <div className="grid grid-cols-2 gap-8 h-full">
      {/* Left Column - Form */}
      <div className="flex flex-col justify-start">
        <h2 className="text-2xl font-bold mb-2">EMI Calculator</h2>
        <p className="text-gray-600 mb-6">
          Calculate your loan EMI and see the complete breakdown
        </p>

        {/* Principal Amount */}
        <div className="mb-6">
          <InputField
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            suffix="₹"
            icon={IndianRupee}
          />
        </div>

        {/* Interest Rate */}
        <div className="mb-6">
          <InputField
            label="Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            suffix="%"
            icon={Percent}
          />
        </div>

        {/* Loan Tenure */}
        <div className="mb-8">
          <InputField
            label="Loan Tenure (years)"
            value={years}
            onChange={setYears}
            suffix="Years"
            icon={Calendar}
          />
        </div>

        {/* Calculate Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <TrendingUp size={20} />
          Calculate EMI
        </button>

        {/* Did you know */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex gap-3">
            <Lightbulb className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold text-blue-900 mb-1">Did you know?</p>
              <p className="text-sm text-blue-800">
                Lower interest rates or a shorter tenure can save you a significant amount on interest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Summary */}
      <div className="flex flex-col justify-start overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Loan Summary</h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="text-red-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Total Interest</p>
            </div>
            
            <p className="text-xl font-bold text-red-600 mt-2">
              ₹{Math.round(interest).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="text-blue-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Total Payment</p>
            </div>
            
            <p className="text-xl font-bold text-blue-600 mt-2">
              ₹{Math.round(totalPayment).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-green-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Monthly EMI</p>
            </div>
            
            <p className="text-xl font-bold text-green-600 mt-2">
              ₹{Math.round(emi).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Chart Title */}
        <h4 className="font-bold text-gray-900 mt-4 mb-2">Principal vs Interest Breakdown</h4>

        {/* Pie Chart */}
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-2 flex-1">
          <div className="w-full h-full flex justify-center items-center">
            <PieChart width={300} height={250}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? "#82ca9d" : "#ff7f7f"} />
                ))}
              </Pie>
              <Legend 
                layout="vertical"
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => `${entry.payload.name} (${((entry.payload.value / totalPayment) * 100).toFixed(1)}%)`}
              />
            </PieChart>
          </div>
        </div>

        {/* Feedback */}
        { interestPercentage > 50 && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-6">
            <div className="flex gap-3">
              <Lightbulb className="text-red-600" size={20} />
              <div>
                <p className="font-semibold text-red-900">Caution!</p>
                <p className="text-sm text-red-800">
                  You are paying {interestPercentage}% of your payment as interest. Consider negotiating for a lower rate or shorter tenure.
                </p>
              </div>
            </div>
          </div>
        )}

        { interestPercentage <= 50 && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
            <div className="flex gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-green-900">Great!</p>
                <p className="text-sm text-green-800">
                  Your interest is {interestPercentage}% of your total payment, which is reasonable for a loan.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}