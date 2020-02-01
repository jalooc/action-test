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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 		return __webpack_require__(731);
/******/ 	};
/******/ 	// initialize runtime
/******/ 	runtime(__webpack_require__);
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 129:
/***/ (function(module) {

module.exports = require("child_process");

/***/ }),

/***/ 690:
/***/ (function() {

eval("require")("@actions/github");


/***/ }),

/***/ 731:
/***/ (function(__unusedmodule, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(990);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(690);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_actions_github__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shell_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(937);
/* harmony import */ var shell_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shell_exec__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const getLastCommitForBranch = (branch) => __awaiter(undefined, void 0, void 0, function* () { return (yield shell_exec__WEBPACK_IMPORTED_MODULE_2___default()(`git show-ref --heads -s ${branch}`, { silent: true })).stdout.trim(); });
const getLastCommonCommitForBranches = (branch1, branch2) => __awaiter(undefined, void 0, void 0, function* () { return (yield shell_exec__WEBPACK_IMPORTED_MODULE_2___default()(`git merge-base ${branch1} ${branch2}`, { silent: true })).stdout.trim(); });
const targetBranch = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.pull_request.base.ref;
const sourceBranch = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.pull_request.head.ref;
console.log('Detected target branch:', targetBranch);
console.log('Detected source branch:', sourceBranch);
Promise.all([
    getLastCommitForBranch(targetBranch),
    getLastCommitForBranch(sourceBranch),
]).then(([targetBranchLastCommit, sourceBranchLastCommit]) => getLastCommonCommitForBranches(targetBranch, sourceBranch).then(lastCommonCommit => {
    console.log('Detected last commit on target branch:', targetBranchLastCommit);
    console.log('Detected last commit on source branch:', sourceBranchLastCommit);
    const isBranchRebased = targetBranchLastCommit === lastCommonCommit;
    console.log('Last common commit is:', lastCommonCommit, ', so', isBranchRebased ? 'branch is already rebased' : 'rebase is required.');
    if (!isBranchRebased)
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(`Branch $${sourceBranch} has to be rebased on ${targetBranch}`);
})).catch(e => _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(e.message));


/***/ }),

/***/ 937:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


const childProcess = __webpack_require__(129)

function shellExec (cmd = '', opts = {}) {
  if (Array.isArray(cmd)) {
    cmd = cmd.join(';')
  }

  opts = Object.assign({ stdio: 'pipe', cwd: process.cwd() }, opts)

  let child
  const shell = process.platform === 'win32' ? { cmd: 'cmd', arg: '/C' } : { cmd: 'sh', arg: '-c' }

  try {
    child = childProcess.spawn(shell.cmd, [shell.arg, cmd], opts)
  } catch (error) {
    return Promise.reject(error)
  }

  return new Promise(resolve => {
    let stdout = ''
    let stderr = ''

    if (child.stdout) {
      child.stdout.on('data', data => {
        stdout += data
      })
    }

    if (child.stderr) {
      child.stderr.on('data', data => {
        stderr += data
      })
    }

    child.on('error', error => {
      resolve({ error, stdout, stderr, cmd })
    })

    child.on('close', code => {
      resolve({ stdout, stderr, cmd, code })
    })
  })
}

module.exports = shellExec


/***/ }),

/***/ 990:
/***/ (function() {

eval("require")("@actions/core");


/***/ })

/******/ },
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function getDefault() { return module['default']; } :
/******/ 				function getModuleExports() { return module; };
/******/ 			__webpack_require__.d(getter, 'a', getter);
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getter */
/******/ 	!function() {
/******/ 		// define getter function for harmony exports
/******/ 		var hasOwnProperty = Object.prototype.hasOwnProperty;
/******/ 		__webpack_require__.d = function(exports, name, getter) {
/******/ 			if(!hasOwnProperty.call(exports, name)) {
/******/ 				Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ }
);