module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(598);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 598:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(818);
const github = __webpack_require__(775);

async function run() {
  try {
    const token = core.getInput("repo-token");
    const maxLength = core.getInput("max-length");
    const { owner, repo } = github.context.repo;

    const prNumber = getPrNumber();

    if (!prNumber) {
      core.setFailed("Could not get pull request number from context");
    }

    const octokit = new github.GitHub(token);

    const response = await octokit.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: prNumber
    });

    if (maxLength) {
      core.setOutput("branch", response.data.head.ref.substring(0, Number(maxLength)));
    } else {
      core.setOutput("branch", response.data.head.ref);
    }
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;

  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

run();


/***/ }),

/***/ 775:
/***/ (function(module) {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 818:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ });