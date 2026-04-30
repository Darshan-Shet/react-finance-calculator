import { useState } from "react"
import { IndianRupee, Percent, Calendar, Lightbulb, TrendingUp, CheckCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, Label} from "recharts"

import { calculateSIP, generateSipData } from "../utils/formulas"
import InputField from "../components/InputField"

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = calculateSIP(monthly, rate, years)
  const invested = monthly * years * 12
  const returns = result - invested
  const data = generateSipData(monthly, rate, years)

  return (
    <div className="grid grid-cols-2 gap-8 h-full">
      {/* Left Column - Form */}
      <div className="flex flex-col justify-start">
        <h2 className="text-2xl font-bold mb-2">SIP Calculator</h2>
        <p className="text-gray-600 mb-6">
          Calculate your SIP and see the complete breakdown
        </p>

        <div className="mb-6">
          <InputField
            label="Monthly Investment"
            type="number"
            value={monthly}
            onChange={e => setMonthly(Number(e.target.value))}
            icon={IndianRupee}
            suffix="₹"
          />
        </div>

        <div className="mb-6">
          <InputField
            label="Annual Interest Rate"
            type="number"
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            icon={Percent}
            suffix="%"
          />
        </div>
        <div className="mb-6">
          <InputField
            label="Investment Period (years)"
            type="number"
            value={years}
            onChange={e => setYears(Number(e.target.value))}
            icon={Calendar}
            suffix="Years"
          />
        </div>

        {/* Calculate Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <TrendingUp size={20} />
          Calculate SIP
        </button>

        {/* Did you know */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex gap-3">
            <Lightbulb className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold text-blue-900 mb-1">Did you know?</p>
              <p className="text-sm text-blue-800">
                SIPs help you benefit from rupee cost averaging and compounding, making it easier to achieve your financial goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your SIP Summary</h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="text-blue-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Invested</p>
            </div>
            
            <p className="text-xl font-bold text-blue-600 mt-2">
              ₹{invested.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Total Returns</p>
            </div>
            
            <p className="text-xl font-bold text-green-600 mt-2">
              ₹{Math.round(returns).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-purple-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Total Value</p>
            </div>
            
            <p className="text-xl font-bold text-purple-600 mt-2">
              ₹{Math.round(result).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Chart Title */}
        <h4 className="font-bold text-gray-900 mt-4 mb-2">Investment Growth</h4>
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-2 flex-1">
          <div className="w-full h-full flex justify-center items-center">
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="month">
                <Label value="Month" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={false} />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}