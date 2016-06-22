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

test('n_surrounding_lines', function(t){
  var lines = _.map(_.range(0, 100), function(i){
    return 'line ' + i;
  });

  var a = lines.join('\n');
  var b = _.map(lines, function(line, i){
    if(i === 50){
      return 'change ' + i;
    }
    return line;
  }).join('\n');

  var expected = _.flattenDeep(_.map(lines, function(line, i){
    if(i === 50){
      return [
        '-line ' + i,
        '+change ' + i
      ];
    }
    return ' ' + line;
  })).join('\n');

  t.equals(diff(a, b), expected);

  t.end();
});
