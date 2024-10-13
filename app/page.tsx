import ScalingIndicesCalculator from './components/ScalingIndicesCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 bg-opacity-80 flex flex-col text-black">
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">ZEKINDO</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Scale Indices Calculator for Cooling Water System</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Overview</h2>
            <p className="mb-4 text-gray-800">
              This software helps utility engineers calculate various scaling indices to predict the scaling and corrosive tendencies in cooling water system.
              By inputting the water's chemical properties, this software can determine the tendency to form scale or cause corrosion, which allows to apply
              the appropriate chemical treatment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-800">
              <li>Input the Required Parameters based on measurements from cooling water system in the "INPUTS" Section.</li>
              <li>After entering all the required data, click the "Calculate Scale Indices" button and the system will automatically compute all of the Scale Indices.</li>
              <li>Prediction of water's scaling or corrosive tendencies will be displayed along with Calculated Scale Indices in the "RESULTS" section.</li>
              <li>To perform next calculation, click the "Reset" button and input the new data.</li>
            </ol>
          </section>

          <ScalingIndicesCalculator />
        </div>
      </main>
    </div>
  );
}
