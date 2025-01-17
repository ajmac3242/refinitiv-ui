#!/usr/bin/env node
/**
 * Karma config is a function.
 * This helper function extract karma JSON config from the function
 * @param {Function} config Karma config function
 * @returns {Promise<{JSON}>} JSON object with Karma configuration
 */
const extractConfig = async (config) => {
  let baseConfig = {};

  void (await config({
    set: function (config) {
      baseConfig = config;
    }
  }));

  return baseConfig;
};

module.exports = {
  extractConfig
};
