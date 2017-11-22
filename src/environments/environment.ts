// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
   appUrl: 'https://services.dev-theimmigrationhub.com/immigrationPortal',
  //  appUrl: 'http://ec2-54-86-42-239.compute-1.amazonaws.com:8080/immigrationPortal',
  // appUrl: 'http://localhost:8080/immigrationPortal',
  buildNumber: '17.11.22'
};
