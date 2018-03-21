# cidr-address

CIDR Address matching for IPv4 and IPv6 internet addresses.
Other libraries for CIDR are on NPM, but none handled IPv6.

A CIDR Address is of the form "ipaddress/bits" where:

* ipaddress - is a full 0.0.0.0 IPv4 or 0:0:0:0:0:0:0:0 IPv6 address
  or partial addresses (will be zero-filled).
* bits - the number of hi-order bits that should be matched with standard
  ip addresses.

Only 64 bits are tracked in IPv6. If you need more (like the full 128),
pass in your precision bits as the second argument to the constructor.
(Nobody needs more than 64-bits.)

## Install

    npm install cidr-address

## Use


    var CidrAddress = require("cidr-address");

    var cidr = new CidrAddress("192.168.1.1/24");
    cidr.has("192.168.1.128");    //=> true
    cidr.has("192.168.11.00");    //=> false

Now let's handle IPv6!

    var cidr = new CidrAddress("fe80::d547/48", 64);
    cidr.has("fe80:0:d547:aaaa"); //=> true;
    cidr.has("::1");              //=> false;
