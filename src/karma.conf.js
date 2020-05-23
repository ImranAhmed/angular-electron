// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-electron'),
      require("karma-htmlfile-reporter"),
      require("karma-mocha-reporter"),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter')
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'cobertura'],
      fixWebpackSourcePaths: true
    },
    htmlReporter: {
      outputFile: "../test-results/units.html",
      pageTitle: "Angular Electron",
      subPageTitle: "Unit Test Suite",
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },
    junitReporter: {
      outputDir: "../test-results/",
      useBrowserName: false,
      outputFile: 'test-report.xml'
    },
    reporters: ["html", "mocha", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['AngularElectron'],
    customLaunchers: {
      AngularElectron: {
        base: 'Electron',
        flags: [
          '--remote-debugging-port=9222'
        ],
        browserWindowOptions: {
          webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            allowRunningInsecureContent: true
          }
        }
      }
    }
  });
};