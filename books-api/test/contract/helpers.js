var supertest = require("supertest");
var chai = require("chai");
var Joi = require("joi");
var joiAssert = require("joi-assert");
var app = require("../../app");

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.Joi = Joi;
global.joiAssert = joiAssert;
