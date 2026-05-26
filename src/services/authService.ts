import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { requireFirebase } from "../lib/firebase";
import { UserProfile, UserRole } from "../types";

export async function signUpAttendee(username: string, email: string, password: string) {
  const { auth, db } = requireFirebase();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const profile: UserProfile = {
    uid: credential.user.uid,
    username,
    email,
    role: "attendee",
  };

  await setDoc(doc(db, "users", credential.user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  return profile;
}

export async function loginUser(email: string, password: string) {
  const { auth, db } = requireFirebase();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, "users", credential.user.uid);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    const data = userSnapshot.data() as Partial<UserProfile>;
    return {
      uid: credential.user.uid,
      email: credential.user.email ?? email,
      role: data.role === "organizer" ? "organizer" : "attendee",
      username: data.username,
    };
  }

  const attendeeSnapshot = await getDoc(doc(db, "attendees", credential.user.uid));
  if (attendeeSnapshot.exists()) {
    const data = attendeeSnapshot.data() as Partial<UserProfile>;
    return profileFromRole(credential.user.uid, credential.user.email ?? email, "attendee", data.username);
  }

  const organizerSnapshot = await getDoc(doc(db, "organizers", credential.user.uid));
  if (organizerSnapshot.exists()) {
    const data = organizerSnapshot.data() as Partial<UserProfile>;
    return profileFromRole(credential.user.uid, credential.user.email ?? email, "organizer", data.username);
  }

  return profileFromRole(credential.user.uid, credential.user.email ?? email, "attendee");
}

function profileFromRole(uid: string, email: string, role: UserRole, username?: string): UserProfile {
  return { uid, email, role, username };
}
