import { useState } from "react"
import { IndianRupee, Percent, Calendar, Lightbulb } from "lucide-react"

import { calculateLumpSum } from "../utils/formulas"
import InputField from "../components/InputField"

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(5)

  const result = calculateLumpSum(amount, rate, years)

  return (
    <div className="h-full flex flex-col overflow-y-auto space-y-4">
      <h2 className="text-2xl font-bold mb-2">Lumpsum Calculator</h2>
      <p className="text-gray-600 mb-6">
        Calculate the future value of your lumpsum investment
      </p>
      <div className="mb-6">
        <InputField
          label="Principal Amount"
          value={amount}
          onChange={setAmount}
          suffix="₹"
          icon={IndianRupee}
        />
      </div>
      <div className="mb-6">
        <InputField
          label="Expected Annual Return"
          value={rate}
          onChange={setRate}
          suffix="%"
          icon={Percent}
        />
      </div>
      <div className="mb-6">
        <InputField
          label="Investment Tenure (years)"
          value={years}
          onChange={setYears}
          suffix="Years"
          icon={Calendar}
        />
      </div>

      {/* Did you know */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex gap-3">
          <Lightbulb className="text-blue-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Did you know?</p>
            <p className="text-sm text-blue-800">
              A higher interest rate or a longer tenure can significantly increase your returns due to compounding.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg text-center border border-green-200">
        <p className="text-sm text-gray-600">Future Value</p>
        <h2 className="text-2xl font-bold text-green-700">
          ₹{Number(result).toLocaleString("en-IN")}
        </h2>
      </div>
    </div>
  )
}