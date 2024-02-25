// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  API : "https://www.moniji.online",
  firebase: {
    projectId: 'moniji',
    appId: '1:562323217909:web:d7d6266459d8e9520514bc',
    databaseURL: 'https://moniji-default-rtdb.firebaseio.com',
    storageBucket: 'moniji.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDbXWz8jLXjD2WIXfpkRPXrRMbKh3lTEnI',
    authDomain: 'moniji.firebaseapp.com',
    messagingSenderId: '562323217909',
    measurementId: 'G-Z2DCH5Y5MR',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
