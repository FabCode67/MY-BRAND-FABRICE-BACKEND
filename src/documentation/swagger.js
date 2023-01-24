const swaggerJSDoc = require("swagger-jsdoc");

const loginOptions = {
  swaggerDefinition: {
    info: {
      title: "Login API",
      version: "1.0.0",
      description: `<h3>API documentation for the login and profile routes</h3>
           </h4> If user already signed up he or she must login in order to read and comment on blog. he/she can view his/ her profile once he loggend in</h4>`,
    },
    host: "localhost:8000",
    basePath: "/login",
    schemes: ["http"],
  },
  apis: ["./routes/login.js", "./controllers/login.js"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ Bearer: [] }],
};

const userOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: `<h3>A simple User API which post a user , get all users, delete user and counts all users</h3>
        <h4>If user doesn't have an acount , he/she must signup first in order to read and comment on blogs.
        user must fill the provided signup form with his or her usrname , email, gender[Male, Female] passward and confirm password.
        admin can count all users and delete any user</h4>`,
    },
    url: "http://localhost:8000/",
  },
  apis: ["./src/routes/user.js"],
};
const contactOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Contact API",
      version: "1.0.0",
      description: `<h3> A simple contact API which post a message , get all masages, delete message and counts all messages</h3> 
        <h4> after a user visit my brand he/she cann add an message/ querry/ or an opinion according to his/her willings
        user before send message must fill a provided form eith his name , email and message
        only admin allowed to manage all message by reading it and deleting it`,
    },
    servers: [{ url: "/api/" }],
  },
  apis: ["./src/routes/contact.js"],
};

const blogOption = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: `<h3> this is API for managing blog posts and comments </h3><br> <h4>From here an outhorized user can get a single and all blogs 
                       only admin is allowed to delete, add and delete blog and ther is no duplicate blog with in collection</h4> 
                       an outhorized user can read a single blog and hhi or she is allowe to add a coment on it`,
    },
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ JWT: [] }],
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/blog.js"],
};

export const loginSpec = swaggerJSDoc(loginOptions);
export const userSpec = swaggerJSDoc(userOption);
export const contactSpec = swaggerJSDoc(contactOption);
export const blogSpec = swaggerJSDoc(blogOption);
