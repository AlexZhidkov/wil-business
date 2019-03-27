export interface UserProfile {
    uid?: string;
    displayName: string;
    fcmToken?: string;
    email: string;
    photoURL: string;
    isStudent?: boolean;
    isBusiness?: boolean;
    isUniversity?: boolean;
    isAdmin?: boolean;
}
