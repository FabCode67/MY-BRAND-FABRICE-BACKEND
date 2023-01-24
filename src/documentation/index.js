const basicInfo = require("./basicInfo");
const servers = require("./server");
const components = require("./components");
const tags = require("./tags");
const allAPI = require("./allApis");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...allAPI,
};
