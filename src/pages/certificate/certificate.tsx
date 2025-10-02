import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { courses } from "../../data/courses";
import logo from "../../assets/HackGuardlogo.png";

export default function Certificate() {
  const { courseId } = useParams<{ courseId: string }>();
  const authContext = useContext(AuthContext);
  const userProfile = authContext?.userProfile;

  const course = courses.find(c => c.courseId === courseId);

  if (!course || !userProfile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const userName = userProfile.fullName || userProfile.email;
  const completionDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-8 border-double border-yellow-400 relative overflow-hidden">
          {/* Decorative border */}
          <div className="absolute inset-0 border-4 border-lime-500 rounded-3xl"></div>
          <div className="absolute inset-2 border-2 border-lime-400 rounded-2xl"></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center mb-6">
              <img src={logo} alt="HackGuard Logo" className="w-24 h-24 object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Certificate of Completion</h1>
            <p className="text-lg text-gray-600">HackGuard Cybersecurity Academy</p>
          </div>

          {/* Main Content */}
          <div className="text-center mb-8 relative z-10">
            <p className="text-xl text-gray-700 mb-6">This is to certify that</p>
            <h2 className="text-3xl font-bold text-lime-600 mb-6 border-b-2 border-lime-200 pb-2">{userName}</h2>
            <p className="text-lg text-gray-700 mb-4">has successfully completed the course</p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{course.title}</h3>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              {course.description}
            </p>
          </div>

          {/* Date and Signature */}
          <div className="flex justify-between items-end mb-8 relative z-10">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Date of Completion</p>
              <p className="text-lg font-semibold text-gray-800">{completionDate}</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-16 border-b-2 border-gray-400 mb-2"></div>
              <p className="text-sm text-gray-500">Authorized Signature</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-lime-50 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-lime-700">Verified Completion</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-lime-200 rounded-full opacity-20"></div>
          <div className="absolute top-8 right-8 w-6 h-6 bg-lime-300 rounded-full opacity-30"></div>
          <div className="absolute bottom-4 left-8 w-10 h-10 bg-lime-100 rounded-full opacity-25"></div>
          <div className="absolute bottom-8 right-4 w-8 h-8 bg-lime-200 rounded-full opacity-20"></div>
        </div>

        {/* Download/Print Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.print()}
            className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}