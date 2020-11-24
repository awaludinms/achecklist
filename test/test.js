var assert = require("assert");
var request = require('supertest');
var express = require('express');

request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200, expected)
    .end(function(err, res) {
    if (err) throw err;
        done();
    });
});
