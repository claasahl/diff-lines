var _ = require('lodash');
var test = require('tape');
var diff = require('./');

test('basics', function(t){
  var a = '';
  a += 'one\n';
  a += 'two\n';
  a += 'three\n';

  var b = '';
  b += 'one\n';
  b += 'three\n';
  b += 'four\n';

  var expected = '';
  expected += ' one\n';
  expected += '-two\n';
  expected += ' three\n';
  expected += '+four';

  t.equals(diff(a, b), expected);

  t.end();
});

test('n_surrounding', function(t){
  var lines = _.map(_.range(0, 101), function(i){
    return 'line ' + i;
  });

  var a = lines.join('\n');
  var b = _.map(lines, function(line, i){
    if(i % 25 === 0){
      return 'change ' + i;
    }
    return line;
  }).join('\n');

  var expected = _.flattenDeep(_.map(lines, function(line, i){
    if(i % 25 === 0){
      return [
        '-line ' + i,
        '+change ' + i
      ];
    }
    return ' ' + line;
  })).join('\n');

  t.equals(diff(a, b), expected);

  expected = '';
  expected += '-line 0\n';
  expected += '+change 0\n';
  expected += '@@\n';
  expected += '-line 25\n';
  expected += '+change 25\n';
  expected += '@@\n';
  expected += '-line 50\n';
  expected += '+change 50\n';
  expected += '@@\n';
  expected += '-line 75\n';
  expected += '+change 75\n';
  expected += '@@\n';
  expected += '-line 100\n';
  expected += '+change 100';
  t.equals(diff(a, b, {
    n_surrounding: 0
  }), expected);

  expected = '';
  expected += '-line 0\n';
  expected += '+change 0\n';
  expected += ' line 1\n';
  expected += ' line 2\n';
  expected += ' line 3\n';
  expected += '@@\n';
  expected += ' line 22\n';
  expected += ' line 23\n';
  expected += ' line 24\n';
  expected += '-line 25\n';
  expected += '+change 25\n';
  expected += ' line 26\n';
  expected += ' line 27\n';
  expected += ' line 28\n';
  expected += '@@\n';
  expected += ' line 47\n';
  expected += ' line 48\n';
  expected += ' line 49\n';
  expected += '-line 50\n';
  expected += '+change 50\n';
  expected += ' line 51\n';
  expected += ' line 52\n';
  expected += ' line 53\n';
  expected += '@@\n';
  expected += ' line 72\n';
  expected += ' line 73\n';
  expected += ' line 74\n';
  expected += '-line 75\n';
  expected += '+change 75\n';
  expected += ' line 76\n';
  expected += ' line 77\n';
  expected += ' line 78\n';
  expected += '@@\n';
  expected += ' line 97\n';
  expected += ' line 98\n';
  expected += ' line 99\n';
  expected += '-line 100\n';
  expected += '+change 100';
  t.equals(diff(a, b, {
    n_surrounding: 3
  }), expected);

  t.end();
});
