

import chaiHttp from 'chai-http';
import chai from 'chai';
import contact from '../src/models/contact';
import app from '../src/index';



describe('GET all blogs', () => {
    it('should GET all blogs', (done) => {
      chai
        .request(app)
        .get('/api/blog')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status")
          res.body.should.have.property("data")
          done();
        });
    });
  });
  