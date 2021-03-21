export class Geolocation {
  getCurrentPosition () {
    var data = {
      coords: {},
      timestamp: new Date(),
      supported: navigator.geolocation,
      error: undefined,
    };

    return new Promise((resolve, reject) => {
      if (data.supported) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            data.timestamp = position.timestamp;
            data.coords.latitude = position.coords.latitude;
            data.coords.longitude = position.coords.longitude;
            data.coords.accuracy = position.coords.accuracy;
            data.coords.altitude = position.coords.altitude;
            data.coords.altitudeAccuracy = position.coords.altitudeAccuracy;
            data.coords.heading = position.coords.heading;
            data.coords.speed = position.coords.speed;

            resolve(data);
          },
          (error) => {
            data.error = error;
            reject(data);
          }
        );
      } else {
        reject(data);
      }
    });
  };
}
