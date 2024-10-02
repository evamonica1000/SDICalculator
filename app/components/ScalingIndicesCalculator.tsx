"use client";

import React, { useState } from 'react';

const ScalingIndicesCalculator = () => {
  const [inputs, setInputs] = useState({
    tds: '',
    temp: '',
    caH: '',
    mAlk: '',
    pH: '',
  });

  const [results, setResults] = useState<{
    rsi: number;
    lsi: number;
    psi: number;
  } | null>(null);

  const [showTooltip, setShowTooltip] = useState('');

  const [graphData, setGraphData] = useState([
    { date: '01/01', LSI: 0.2, RSI: 6.5, PSI: 6.8 },
    { date: '01/02', LSI: 0.3, RSI: 6.2, PSI: 7.0 },
    { date: '01/03', LSI: 0.1, RSI: 6.8, PSI: 6.5 },
    { date: '01/04', LSI: -0.1, RSI: 7.2, PSI: 6.2 },
    { date: '01/05', LSI: -0.2, RSI: 7.5, PSI: 5.9 },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateIndices = () => {
    const { pH, tds, temp, caH, mAlk } = inputs;
    
    const pHa = parseFloat(pH);
    const tdsNum = parseFloat(tds);
    const tempNum = parseFloat(temp);
    const caHNum = parseFloat(caH);
    const mAlkNum = parseFloat(mAlk);

    const A = (Math.log10(tdsNum) - 1) / 10;
    const B = -13.12 * Math.log10(tempNum + 273) + 34.55;
    const C = Math.log10(caHNum) - 0.4;
    const D = Math.log10(mAlkNum);
    const pHs = (9.3 + A + B) - (C + D);

    const rsi = 2 * pHs - pHa;
    const lsi = pHa - pHs;
    const pHeq = 1.465 * Math.log10(mAlkNum) + 4.54;
    const psi = 2 * pHs - pHeq;

    setResults({ rsi, lsi, psi });

    const newDataPoint = {
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }),
      LSI: lsi,
      RSI: rsi,
      PSI: psi,
    };
    setGraphData([...graphData.slice(-4), newDataPoint]);
  };

  const resetCalculator = () => {
    setInputs({
      tds: '',
      temp: '',
      caH: '',
      mAlk: '',
      pH: '',
    });
    setResults(null);
  };

  const getWaterCondition = (index: string, value: number) => {
    switch (index) {
      case 'LSI':
        return value > 0 ? 'Scaling potential (CaCO₃ precipitation)' : 'Corrosive water (CaCO₃ dissolves)';
      case 'RSI':
        if (value < 5.5) return 'Heavy scale formation';
        if (value < 6.2) return 'Moderate scale formation';
        if (value < 6.8) return 'Slight scale formation';
        if (value < 8.5) return 'Corrosive water';
        return 'Very corrosive water';
      case 'PSI':
        return value > 6 ? 'High scaling potential' : 'Low scaling or corrosion potential';
      default:
        return '';
    }
  };

  const tooltipExplanations = {
    LSI: "The LSI predicts the tendency of water to form scale or be corrosive. Positive LSI indicates scaling (CaCO₃ precipitates), while negative LSI indicates corrosion (CaCO₃ dissolves). Commonly used in water treatment plants and industrial cooling systems.",
    RSI: "RSI helps assess scaling severity and corrosion potential in water systems. Lower RSI values indicate a stronger tendency for scaling, while higher values suggest corrosion. Typically used for cooling water systems and boilers.",
    PSI: "PSI is used for systems with high water cycling, like cooling towers. It accounts for the buffering capacity of the water. Higher PSI values indicate scaling risks, while lower values suggest corrosion potential.",
  };

  const SimpleChart = ({ data }: { data: any[] }) => {
    const maxValue = Math.max(...data.flatMap(d => [d.LSI, d.RSI, d.PSI]));
    const minValue = Math.min(...data.flatMap(d => [d.LSI, d.RSI, d.PSI]));
    const range = maxValue - minValue;

    const normalizeValue = (value: number) => (value - minValue) / range * 100;

    return (
      <svg viewBox="0 0 400 200" className="w-full h-64">
        {data.map((point, index) => (
          <g key={point.date}>
            {index > 0 && (
              <>
                <line
                  x1={(index - 1) * 100}
                  y1={200 - normalizeValue(data[index - 1].LSI)}
                  x2={index * 100}
                  y2={200 - normalizeValue(point.LSI)}
                  stroke="blue"
                  strokeWidth="2"
                />
                <line
                  x1={(index - 1) * 100}
                  y1={200 - normalizeValue(data[index - 1].RSI)}
                  x2={index * 100}
                  y2={200 - normalizeValue(point.RSI)}
                  stroke="green"
                  strokeWidth="2"
                />
                <line
                  x1={(index - 1) * 100}
                  y1={200 - normalizeValue(data[index - 1].PSI)}
                  x2={index * 100}
                  y2={200 - normalizeValue(point.PSI)}
                  stroke="red"
                  strokeWidth="2"
                />
              </>
            )}
            <circle cx={index * 100} cy={200 - normalizeValue(point.LSI)} r="3" fill="blue" />
            <circle cx={index * 100} cy={200 - normalizeValue(point.RSI)} r="3" fill="green" />
            <circle cx={index * 100} cy={200 - normalizeValue(point.PSI)} r="3" fill="red" />
            <text x={index * 100} y="220" textAnchor="middle" fontSize="12">{point.date}</text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Scale Indices Calculator for Cooling Water System</h1>
      
      <div className="bg-gray-100 p-6 rounded-md shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">INPUTS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Dissolved Solids (TDS) in ppm</label>
            <input
              type="number"
              name="tds"
              value={inputs.tds}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">M-Alkalinity (M-Alk)</label>
            <input
              type="number"
              name="mAlk"
              value={inputs.mAlk}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
            <input
              type="number"
              name="temp"
              value={inputs.temp}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Actual pH (pHa)</label>
            <input
              type="number"
              name="pH"
              value={inputs.pH}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Calcium Hardness (CaH)</label>
            <input
              type="number"
              name="caH"
              value={inputs.caH}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={calculateIndices}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate Scale Indices
          </button>
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-gray-100 p-6 rounded-md shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">RESULTS</h2>
          <div className="space-y-4">
            {['LSI', 'RSI', 'PSI'].map((index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{index}: {results[index.toLowerCase() as keyof typeof results].toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{getWaterCondition(index, results[index.toLowerCase() as keyof typeof results])}</p>
                </div>
                <button
                  onClick={() => setShowTooltip(index)}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  ?
                </button>
              </div>
            ))}
          </div>
          {showTooltip && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">{tooltipExplanations[showTooltip as keyof typeof tooltipExplanations]}</p>
              <button
                onClick={() => setShowTooltip('')}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Historical Data</h2>
        <SimpleChart data={graphData} />
        <div className="mt-2 text-sm text-gray-600 flex justify-center space-x-4">
          <div><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>LSI</div>
          <div><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>RSI</div>
          <div><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>PSI</div>
        </div>
      </div>
    </div>
  );
};

export default ScalingIndicesCalculator;
