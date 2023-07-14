// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_STORAGE: "https://documents-grp-decem.azurewebsites.net",//http://localhost:8090
  URL_MICROSERVICE_VINCULACION: "http://localhost:8088",
  URL_MICROSERVICE_INVESTIGACION: "https://gpr-decem-espe.azurewebsites.net",//http://localhost:8080
  URL_MICROSERVICE_DOCENTE_INFORMACION: "http://localhost:8888"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
