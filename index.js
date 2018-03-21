/*******************************************************************************
/* cidr-address - Performs simple CIDR matches using binary strings of IP Addresses
 * Usage        - See the README document
 * Author       - Allen Fair https://www.npmjs.com/~allenfair
/******************************************************************************/

class CidrAddress {
  constructor(cidr, trackBits) {
    if (!cidr) throw "Missing CIDR Address";
    let addrBits = cidr.split("/");
    this.bits = parseInt(addrBits[1]);
    if (addrBits[0].indexOf(":")>=0) {
      this.family  = 6;
      this.size    = trackBits || 64;
      this.address = this.ipv6ToBinary(addrBits[0]);
    } else {
      this.family  = 4;
      this.size    = 32;
      this.address = this.ipv4ToBinary(addrBits[0]);
    }
    this.min = this.address.substr(0,this.bits).padEnd(this.size,'0');
    this.max = this.address.substr(0,this.bits).padEnd(this.size,'1');
  }

  has(ip) {
    if (this.family === 4) {
      if (ip.indexOf(".")===-1) return false;
      let bin = this.ipv4ToBinary(ip);
      return bin >= this.min && bin <= this.max;
    } else {
      if (ip.indexOf(":")===-1) return false;
      let bin = this.ipv6ToBinary(ip);
      return bin >= this.min && bin <= this.max;
    }
  }

  ipv4ToBinary(ip) {
    let bin = "";
    for (let i of ip.split(".")) {
      if (!i.match(/^\d{1,3}$/) || parseInt(i)>255) return "0".repeat(this.size)
      bin = bin + parseInt(i).toString(2).padStart(8,'0');
    }
    return bin.padEnd(this.size, '0');
  }

  ipv6ToBinary(ip) {
    let bin = "";
    for (let i of ip.split(":")) {
      if (i === '') i = '0';
      if (!i.match(/^[\da-f]{0,4}$/)) return "0".repeat(this.size)
      bin = bin + parseInt(i,16).toString(2).padStart(16,'0');
    }
    return bin.padEnd(this.size, '0');
  }
}


module.exports = CidrAddress;
