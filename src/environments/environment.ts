// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDF7I5_SUcXUlMIJ8vfYbz44ANI5JQZUhg',
    authDomain: 'wil-business.firebaseapp.com',
    databaseURL: 'https://wil-business.firebaseio.com',
    projectId: 'wil-business',
    storageBucket: 'wil-business.appspot.com',
    messagingSenderId: '219284721685'
  },
  hubspot: {
    formSubmissionsUrl: 'https://api.hsforms.com/submissions/v3/integration/submit/',
    portalId: '',
    eoiBusinessFormFormGuid: '',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
