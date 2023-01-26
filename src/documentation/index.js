const basicInfo = require("./basicInfo");
const servers = require("./server");
const components = require("./components");
const tags = require("./tags");
const allAPI = require("./allApis");

export default {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...allAPI,
};
