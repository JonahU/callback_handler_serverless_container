const { expect } = require('chai');
const helper = require('../../callback_handler_serverless/helper');

describe('helper.js', () => {
  describe('createError', () => {
    it('should return a lambda proxy integration error object', (done) => {
      const template = {
        statusCode: 401,
        body: JSON.stringify({
          error: 'some message',
        }),
      };
      const after = helper.createError('some message');
      expect(after).to.eql(template);
      done();
    });

    it('should overwrite the statusCode', (done) => {
      const expected = {
        statusCode: 418,
        body: JSON.stringify({
          error: "I'm a teapot",
        }),
      };
      const after = helper.createError("I'm a teapot", 418);
      expect(after.statusCode).to.equal(418);
      expect(after).to.eql(expected);
      done();
    });
  });

  describe('first', () => {
    it('should return the first element in an array', (done) => {
      const before = ['four', 'five', 'six', 'seven'];
      const after = helper.first(before);
      expect(after).to.equal('four');
      done();
    });

    it('should return null if the array is empty', (done) => {
      const before = [];
      const after = helper.first(before);
      expect(after).to.be.null;
      done();
    });

    it('should return null if called with something which is not an array', (done) => {
      const before1 = 14507.0123;
      const before2 = {};
      const before3 = () => 'Hello world!';
      const after1 = helper.first(before1);
      const after2 = helper.first(before2);
      const after3 = helper.first(before3);

      expect(after1).to.be.null;
      expect(after2).to.be.null;
      expect(after3).to.be.null;
      done();
    });
  });

  describe('redirectTo', () => {
    it('should return a lambda proxy integration redirect object', (done) => {
      const template = {
        statusCode: 302,
        headers: {
          Location: 'https://www.google.com/maps',
          jwt: 'id token goes here'
        },
      };
      const after = helper.redirectTo(
        'https://www.google.com/maps',
        'id token goes here',
      );
      expect(after).to.eql(template);
      done();
    });

    it('should overwrite the token field name', (done) => {
      const expected = {
        statusCode: 302,
        headers: {
          Location: 'https://www.google.com/maps',
          idToken: 'id token goes here'
        },
      };
      const after = helper.redirectTo(
        'https://www.google.com/maps',
        'id token goes here',
        'idToken'
      );

      expect(after.headers).to.have.keys(['idToken', 'Location']);
      expect(after.headers).not.to.have.key('jwt');
      expect(after).to.eql(expected);
      done();
    });
  });
});