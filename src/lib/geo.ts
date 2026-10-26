/**
 * GPS and Geofencing Utilities for WEVO Attendance Engine
 * Computes distances on earth surface using the Haversine formula
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeofenceValidationResult {
  isWithinGeofence: boolean;
  distanceMeters: number;
  allowedRadiusMeters: number;
  accuracyMeters?: number;
}

/**
 * Calculates distance in meters between two GPS coordinates using the Haversine formula
 */
export function calculateHaversineDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const EARTH_RADIUS_METERS = 6371000; // Earth's mean radius in meters

  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);

  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS_METERS * c);
}

/**
 * Validates if employee coordinates fall inside the branch geofence radius
 * Takes GPS accuracy into account to avoid false rejections on mobile devices
 */
export function validateGeofence(
  employeeLocation: Coordinates,
  branchLocation: Coordinates,
  allowedRadiusMeters: number = 150,
  gpsAccuracyMeters: number = 20
): GeofenceValidationResult {
  const distanceMeters = calculateHaversineDistance(employeeLocation, branchLocation);

  // Allow a small buffer proportional to the device's GPS accuracy margin (max 25m)
  const accuracyBuffer = Math.min(gpsAccuracyMeters, 25);
  const effectiveRadius = allowedRadiusMeters + accuracyBuffer;

  const isWithinGeofence = distanceMeters <= effectiveRadius;

  return {
    isWithinGeofence,
    distanceMeters,
    allowedRadiusMeters,
    accuracyMeters: gpsAccuracyMeters,
  };
}
