import Layout from "../components/Layout";

function Dashboard() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold text-emerald-400 mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-gray-400">BMI</h2>
                    <p className="text-2xl font-bold text-emerald-400">22.4</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-gray-400">Calories Target</h2>
                    <p className="text-2xl font-bold text-emerald-400">2200 kcal</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-gray-400">Goal</h2>
                    <p className="text-2xl font-bold text-emerald-400">
                        Weight Loss
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
