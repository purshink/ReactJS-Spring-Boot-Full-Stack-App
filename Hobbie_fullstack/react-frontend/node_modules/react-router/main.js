/**
 * React Router v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

/* eslint-env node */
module.exports =
  process.env.NODE_ENV === "production"
    ? require("./umd/react-router.production.min.js")
    : require("./umd/react-router.development.js");
