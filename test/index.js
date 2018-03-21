var should = require('chai').should(),
    CidrAddress = require('../index');

describe("IPv4 CIDR", () => {
  it("makes binary address", () => {
    let cidr = new CidrAddress("192.168.1.1/24");
    cidr.address.should.equal("11000000101010000000000100000001");
    cidr.has("192.168.1.64").should.equal(true);
    cidr.has("192.168.11.1").should.equal(false);
  });
});

describe("IPv6 CIDR", () => {
  it("makes binary address", () => {
    let cidr = new CidrAddress("fe80::d547/48");
    cidr.address.should.equal("1111111010000000000000000000000011010101010001110000000000000000");
    cidr.has("fe80:0:d547:aaaa").should.equal(true);
    cidr.has("::1").should.equal(false);
  });
});
