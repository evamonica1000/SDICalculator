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
    sdsi: number;
  } | null>(null);

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
    const sdsi = lsi;

    setResults({ rsi, lsi, psi, sdsi });
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">INPUTS</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
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
      <div className="flex justify-start space-x-4">
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

      {results && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">RESULTS</h2>
          <div className="space-y-2">
            <p><strong>Ryznar Stability Index (RSI):</strong> {results.rsi.toFixed(2)}</p>
            <p><strong>Langelier Saturation Index (LSI):</strong> {results.lsi.toFixed(2)}</p>
            <p><strong>Stiff & Davis Stability Index (SDSI):</strong> {results.sdsi.toFixed(2)}</p>
            <p><strong>Puckorius Scaling Index (PSI):</strong> {results.psi.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScalingIndicesCalculator;
