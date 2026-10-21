export const getApiUrl = () => import.meta.env.VITE_API_URL || "https://back.jonathanvenancio.site";

export const resolveProfileImage = (profileImage: string | null | undefined, fallback: string) => {
  if (!profileImage) return fallback;
  if (profileImage.startsWith("http://") || profileImage.startsWith("https://")) {
    try {
      const imageHost = new URL(profileImage).hostname;
      const pageHost = window.location.hostname;
      const imageIsLocal = imageHost === "localhost" || imageHost === "127.0.0.1";
      const pageIsLocal = pageHost === "localhost" || pageHost === "127.0.0.1";
      if (imageIsLocal && !pageIsLocal) return fallback;
    } catch {
      return fallback;
    }
    return profileImage;
  }
  return `${getApiUrl()}${profileImage}`;
};
