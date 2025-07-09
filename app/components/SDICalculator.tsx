"use client";

import React, { useState, useEffect } from 'react';

const SDICalculator = () => {
  const [testInfo, setTestInfo] = useState({
    sampleSource: '',
    operator: '',
    testDate: new Date().toISOString().split('T')[0],
    pressure: '30',
    temperature: '25'
  });

  const [timingData, setTimingData] = useState({
    ti: '',
    tf: '',
    totalDuration: '15'
  });

  const [stopwatch, setStopwatch] = useState({
    time: 0,
    isRunning: false,
    startTime: 0
  });

  const [results, setResults] = useState<{
    sdi: number;
    interpretation: string;
    recommendation: string;
    color: string;
  } | null>(null);

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopwatch.isRunning) {
      interval = setInterval(() => {
        setStopwatch(prev => ({
          ...prev,
          time: Date.now() - prev.startTime
        }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [stopwatch.isRunning, stopwatch.startTime]);

  const handleTestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestInfo({ ...testInfo, [e.target.name]: e.target.value });
  };

  const handleTimingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimingData({ ...timingData, [e.target.name]: e.target.value });
  };

  const startStopwatch = () => {
    setStopwatch({
      time: 0,
      isRunning: true,
      startTime: Date.now()
    });
  };

  const stopStopwatch = () => {
    setStopwatch(prev => ({
      ...prev,
      isRunning: false
    }));
  };

  const resetStopwatch = () => {
    setStopwatch({
      time: 0,
      isRunning: false,
      startTime: 0
    });
  };

  const recordTi = () => {
    const timeInSeconds = (stopwatch.time / 1000).toFixed(1);
    setTimingData(prev => ({ ...prev, ti: timeInSeconds }));
  };

  const recordTf = () => {
    const timeInSeconds = (stopwatch.time / 1000).toFixed(1);
    setTimingData(prev => ({ ...prev, tf: timeInSeconds }));
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(1);
    return `${minutes}:${seconds.padStart(4, '0')}`;
  };

  const calculateSDI = () => {
    const ti = parseFloat(timingData.ti);
    const tf = parseFloat(timingData.tf);
    const totalDuration = parseFloat(timingData.totalDuration);

    // Validation
    if (!ti || !tf || !totalDuration) {
      alert('Please enter all timing values (Ti, Tf, and Total Duration)');
      return;
    }

    if (tf <= ti) {
      alert('Final time (Tf) must be greater than initial time (Ti)');
      return;
    }

    if (ti <= 0 || tf <= 0 || totalDuration <= 0) {
      alert('All timing values must be positive numbers');
      return;
    }

    // Calculate SDI
    const sdi = ((1 - ti / tf) * 100) / totalDuration;
    
    let interpretation = '';
    let recommendation = '';
    let color = '';

    if (sdi < 3) {
      interpretation = 'Low fouling potential';
      recommendation = 'Water is suitable for RO or NF systems without additional pre-treatment.';
      color = 'text-green-600';
    } else if (sdi >= 3 && sdi <= 5) {
      interpretation = 'Moderate fouling potential';
      recommendation = 'Pre-treatment such as media filters or ultrafiltration may be required.';
      color = 'text-yellow-600';
    } else {
      interpretation = 'High fouling potential';
      recommendation = 'Significant pre-treatment is necessary, such as coagulation, sedimentation, or advanced filtration.';
      color = 'text-red-600';
    }

    setResults({
      sdi: parseFloat(sdi.toFixed(2)),
      interpretation,
      recommendation,
      color
    });

    console.log('SDI Calculated:', sdi); // Debug log
  };

  const resetCalculator = () => {
    setTestInfo({
      sampleSource: '',
      operator: '',
      testDate: new Date().toISOString().split('T')[0],
      pressure: '30',
      temperature: '25'
    });
    setTimingData({
      ti: '',
      tf: '',
      totalDuration: '15'
    });
    setResults(null);
    resetStopwatch();
  };

  return (
    <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
      {/* Test Information Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">TEST INFORMATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample Source</label>
            <input
              type="text"
              name="sampleSource"
              value={testInfo.sampleSource}
              onChange={handleTestInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Well Water, River Water"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
            <input
              type="text"
              name="operator"
              value={testInfo.operator}
              onChange={handleTestInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Operator name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
            <input
              type="date"
              name="testDate"
              value={testInfo.testDate}
              onChange={handleTestInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pressure (psi)</label>
            <input
              type="number"
              name="pressure"
              value={testInfo.pressure}
              onChange={handleTestInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={testInfo.temperature}
              onChange={handleTestInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Digital Stopwatch Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">DIGITAL STOPWATCH</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-4xl font-mono font-bold text-blue-800 mb-2">
              {formatTime(stopwatch.time)}
            </div>
            <div className="text-sm text-gray-600">mm:ss.s</div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={startStopwatch}
              disabled={stopwatch.isRunning}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Start
            </button>
            <button
              onClick={stopStopwatch}
              disabled={!stopwatch.isRunning}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Stop
            </button>
            <button
              onClick={resetStopwatch}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={recordTi}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Record Ti (Initial 500ml)
            </button>
            <button
              onClick={recordTf}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Record Tf (Final 500ml)
            </button>
          </div>
        </div>
      </div>

      {/* Timing Data Input Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">TIMING DATA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ti - Initial 500ml time (seconds)</label>
            <input
              type="number"
              name="ti"
              value={timingData.ti}
              onChange={handleTimingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 30.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tf - Final 500ml time (seconds)</label>
            <input
              type="number"
              name="tf"
              value={timingData.tf}
              onChange={handleTimingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 45.2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Duration (minutes)</label>
            <input
              type="number"
              name="totalDuration"
              value={timingData.totalDuration}
              onChange={handleTimingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-start space-x-4 mb-8">
        <button
          onClick={calculateSDI}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold"
        >
          Calculate SDI
        </button>
        <button
          onClick={resetCalculator}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-semibold"
        >
          Reset All
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">RESULTS</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-800 mb-2">
                SDI = {results.sdi}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Interpretation</h3>
              <p className={`text-lg font-semibold ${results.color}`}>
                {results.interpretation}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
              <p className="text-gray-800">
                {results.recommendation}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Test Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Sample Source:</strong> {testInfo.sampleSource || 'Not specified'}</p>
                  <p><strong>Operator:</strong> {testInfo.operator || 'Not specified'}</p>
                  <p><strong>Test Date:</strong> {testInfo.testDate}</p>
                </div>
                <div>
                  <p><strong>Ti:</strong> {timingData.ti} seconds</p>
                  <p><strong>Tf:</strong> {timingData.tf} seconds</p>
                  <p><strong>Test Duration:</strong> {timingData.totalDuration} minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SDICalculator;
