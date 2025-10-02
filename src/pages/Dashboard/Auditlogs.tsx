import { useState, useEffect } from "react";
import { Clock, User, BookOpen, LogIn } from "lucide-react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/useAuth";

interface AuditLog {
  id: string;
  action: string;
  timestamp: Timestamp | null;
  user: string;
  details: string;
  userId?: string;
}

export default function Auditlogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAuditLogs = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const auditLogsRef = collection(db, "auditLogs");
        // This query is correct but requires a composite index in Firestore
        const q = query(
          auditLogsRef,
          where("userId", "==", currentUser.uid),
          orderBy("timestamp", "desc"),
          limit(20)
        );
        const querySnapshot = await getDocs(q);

        const auditLogs: AuditLog[] = [];
        querySnapshot.forEach((doc) => {
          auditLogs.push({
            id: doc.id,
            ...doc.data()
          } as AuditLog);
        });

        setLogs(auditLogs);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
        // This catch block handles the error gracefully if the index is missing
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, [currentUser]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Login":
      case "Logout":
        return <LogIn size={16} className="text-blue-500" />;
      case "Course Access":
      case "Course Enrollment":
        return <BookOpen size={16} className="text-green-500" />;
      case "Progress Update":
        return <User size={16} className="text-purple-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Timestamp | null) => {
    if (!timestamp) {
      return "Unknown time";
    }
    
    try {
      if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleString();
      } else if (timestamp instanceof Date) {
        return timestamp.toLocaleString();
      } else {
        return "Invalid date";
      }
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-lime-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
      </div>
      {!currentUser ? (
        <p className="text-gray-600">Please sign in to view your activity logs.</p>
      ) : loading ? (
        <p className="text-gray-600">Loading your activity...</p>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-600 mb-2">No recent activity found.</p>
                <p className="text-sm text-gray-500">Your login and course activities will appear here.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{log.action || "Unknown Action"}</span>
                      <span className="text-sm text-gray-500">{formatTimestamp(log.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{log.details || "No details available"}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}