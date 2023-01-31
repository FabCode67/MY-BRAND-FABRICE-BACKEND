

import chai from 'chai';
import app from '../test/index.test';


export const login =  async () => {
    let token;
    const response = await chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'test',
        password: 'password'
      });
    token = response.body.data;
  }