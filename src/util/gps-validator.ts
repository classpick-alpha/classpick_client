const lat = 37.611142;
const lng = 126.996427;

const toRad = (value: number) => (value * Math.PI) / 180;

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const checkLocation = async (): Promise<boolean> => {
  if (!navigator.geolocation) return true;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistance(latitude, longitude, lat, lng);

        resolve(distance <= 300);
      },
      () => resolve(true),
    );
  });
};
