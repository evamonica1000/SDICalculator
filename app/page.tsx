import ScalingIndicesCalculator from './components/ScalingIndicesCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 text-black">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-white">Scale Indices Calculator for Cooling Water System</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p>
              This software helps utility engineers calculate various scaling indices to predict the scaling and corrosive tendencies in cooling water system.
              By inputting the water's chemical properties, this software can determine the tendency to form scale or cause corrosion, which allows to apply
              the appropriate chemical treatment.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>Input the Required Parameters based on measurements from cooling water system in the "INPUTS" Section.</li>
              <li>After entering all the required data, click the "Calculate Scale Indices" button and the system will automatically compute all of the Scale Indices.</li>
              <li>Prediction of water's scaling or corrosive tendencies will be displayed along with Calculated Scale Indices in the "RESULTS" section.</li>
              <li>To perform next calculation, click the "Reset" button and input the new data.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Built-in Help</h2>
            <div className="space-y-2">
              <p><strong>LSI (Langelier Saturation Index):</strong> Predicts the tendency of water to form scale or be corrosive. Positive LSI indicates scaling (CaCO₃ precipitates), while negative LSI indicates corrosion (CaCO₃ dissolves).</p>
              <p><strong>RSI (Ryznar Stability Index):</strong> Helps assess scaling severity and corrosion potential. Lower RSI values indicate a stronger tendency for scaling, while higher values suggest corrosion.</p>
              <p><strong>PSI (Puckorius Scaling Index):</strong> Used for systems with high water cycling, like cooling towers. It accounts for the buffering capacity of the water. Higher PSI values indicate scaling risks, while lower values suggest corrosion potential.</p>
            </div>
          </section>
        </div>

        <ScalingIndicesCalculator />
      </main>
    </div>
  );
}
