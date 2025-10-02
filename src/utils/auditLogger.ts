import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, FieldValue } from "firebase/firestore";

export interface AuditLogEntry {
  action: string;
  user: string;
  userId: string;
  details: string;
  timestamp?: FieldValue;
}

export const logAuditEvent = async (entry: Omit<AuditLogEntry, 'timestamp'>) => {
  try {
    await addDoc(collection(db, "auditLogs"), {
      ...entry,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error logging audit event:", error);
  }
};

export const logUserLogin = async (user: { uid: string; email: string | null; displayName: string | null }) => {
  await logAuditEvent({
    action: "Login",
    user: user.displayName || user.email || "Unknown User",
    userId: user.uid,
    details: `User logged in from ${window.location.hostname}`
  });
};

export const logUserLogout = async (user: { uid: string; email: string | null; displayName: string | null }) => {
  await logAuditEvent({
    action: "Logout",
    user: user.displayName || user.email || "Unknown User",
    userId: user.uid,
    details: `User logged out`
  });
};

export const logCourseAccess = async (user: { uid: string; email: string | null; displayName: string | null }, courseTitle: string) => {
  await logAuditEvent({
    action: "Course Access",
    user: user.displayName || user.email || "Unknown User",
    userId: user.uid,
    details: `Accessed course: ${courseTitle}`
  });
};

export const logProgressUpdate = async (user: { uid: string; email: string | null; displayName: string | null }, courseTitle: string, progress: number) => {
  await logAuditEvent({
    action: "Progress Update",
    user: user.displayName || user.email || "Unknown User",
    userId: user.uid,
    details: `Updated progress to ${progress}% in course: ${courseTitle}`
  });
};