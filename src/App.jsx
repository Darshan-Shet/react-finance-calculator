import { Routes, Route, NavLink } from "react-router-dom"
import SipCalculator from "./pages/SipCalculator"
import EmiCalculator from "./pages/EmiCalculator"
import LumpsumCalculator from "./pages/LumpsumCalculator"
import { BarChart3, Calculator, TrendingUp } from "lucide-react"

export default function App() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center gap-3">
              <div className="text-3xl">💰</div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Finance Calculator
                </h1>
                <p className="text-xs text-gray-500">
                  Plan better. Invest smarter.
                </p>
              </div>
            </div>

            {/* Center - Navigation */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100">
              <NavLink to="/" className={navClass}>
                <TrendingUp size={18} />
                SIP
              </NavLink>

              <NavLink to="/emi" className={navClass}>
                <Calculator size={18} />
                EMI
              </NavLink>

              <NavLink to="/lumpsum" className={navClass}>
                <BarChart3 size={18} />
                Lumpsum
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6">
        <div className="bg-white rounded-xl shadow-sm p-8 h-full flex flex-col">
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<SipCalculator />} />
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/lumpsum" element={<LumpsumCalculator />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}