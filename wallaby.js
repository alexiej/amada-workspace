module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js'
    ],

    tests: [
      'tests/**/*Spec.js'
    ],

    delays: {
      run: 500
    }
  };
};