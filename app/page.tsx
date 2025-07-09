import SDICalculator from './components/SDICalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 bg-opacity-80 flex flex-col text-black">
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">ZEKINDO</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">SDI (Silt Density Index) Testing Software</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Overview</h2>
            <p className="mb-4 text-gray-800">
              This software helps water treatment engineers perform SDI (Silt Density Index) testing to assess the fouling potential of feed water 
              for reverse osmosis (RO) and nanofiltration (NF) membrane systems. The SDI test measures the rate of plugging of a standard 0.45 μm 
              membrane filter under specified conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Test Procedure</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-800">
              <li>Set up the SDI test apparatus with 0.45 μm membrane filter at 30 psi (2.07 bar) pressure.</li>
              <li>Start the test and use the digital stopwatch to measure the time for the first 500 mL filtration (Ti).</li>
              <li>Continue the test for the specified duration (typically 15 minutes).</li>
              <li>Measure the time for the final 500 mL filtration (Tf) at the end of the test period.</li>
              <li>Input the timing data and the software will automatically calculate the SDI value.</li>
              <li>Review the interpretation and recommended actions based on the SDI result.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">SDI Calculation Formula</h2>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <p className="text-center font-mono text-lg">SDI = ((1 - Ti/Tf) × 100) / T</p>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Ti:</strong> Initial time for 500 mL filtration (in seconds)</p>
              <p><strong>Tf:</strong> Final time for 500 mL filtration after test duration (in seconds)</p>
              <p><strong>T:</strong> Total test duration (usually 15 minutes)</p>
            </div>
          </section>

          <SDICalculator />
        </div>
      </main>
    </div>
  );
}
