Assert  = require('assert');
Asserts = require('asserts');

var Dundee = require('../../');


module.exports = function () {
  Dundee.Function.include(['delay', 'repeat']);

  function Barf () {
    this.message = null;
    this.name = 'joe';
    this.count = 0;
  }
  Barf.prototype.go = function (arg) {
    this.message = "GO " + arg + "!!! -" + this.name;
  };
  Barf.prototype.inc = function () {
    this.count += 1;
  };

  var count;
  function inc () {
    count = count + 1;
  }

  return {
    delay : {
      "should properly delay bare function": function (done) {
        count = 0;

        inc();
        Assert.equal(count, 1);

        inc._delay({time : 100})
        Assert.equal(count, 1);

        setTimeout(function () {
          Assert.equal(count, 2);
          done();
        }, 200);
      },

      "should properly delay object function": function (done) {
        var b = new Barf();

        b.go('teammmm');
        Assert.equal(b.message, "GO teammmm!!! -joe");

        b.message = null;
        b.go._delay({time : 100, self: b, args: ['away']});
        Assert.equal(b.message, null);

        setTimeout(function () {
          Assert.equal(b.message, "GO away!!! -joe");
          done();
        }, 200);
      }
    },

    repeat : {
      "should properly repeat bare function": function (done) {
        count = 0;
        var count_interval_id = inc._repeat({time : 100});
        Assert.equal(count, 0)

        // after 450ms count should be at 4
        setTimeout(function () {
          clearInterval(count_interval_id);
          Assert.equal(count, 4);
          done();
        }, 450);
      },

      "should properly repeat object function": function (done) {
        var b = new Barf();
        var count_interval_id = b.inc._repeat({time : 100, self: b});

        Assert.equal(b.count, 0)

        // after 450ms count should be at 4
        setTimeout(function () {
          clearInterval(count_interval_id);
          Assert.equal(b.count, 4);
          done();
        }, 450);

        done();
      }
    }
  };
}