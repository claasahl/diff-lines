var test = require('tape');
var diff = require('./');

test('diff-lines', function(t){
  var a = '';
  a += 'one\n';
  a += 'two\n';
  a += 'three\n';

  var b = '';
  b += 'one\n';
  b += 'three\n';

  var expected = '';
  expected += ' one\n';
  expected += '-two\n';
  expected += ' three';

  t.equals(diff(a, b), expected);

  t.end();
});
