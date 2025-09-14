export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome to your Dashboard 🎉
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <p className="text-gray-600 mt-2">See your enrolled courses.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">Progress</h2>
          <p className="text-gray-600 mt-2">Track your learning progress.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-gray-600 mt-2">Manage your profile & security.</p>
        </div>
      </div>
    </div>
  );
}
