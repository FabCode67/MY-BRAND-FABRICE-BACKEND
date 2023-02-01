export default {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "MY-BRAND-FABRICE-BACKEND", // short title.
    description: "REST APIs TEST", //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "Fabrice MWANAFUNZI", // your name
      email: "mwanafunzifabrce@web.com", // your email
      url: "http://fabcode67.github.io/CAPSTONE/#", // your website
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "apiKey",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
    },
  },
};
