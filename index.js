var JsDiff = require('diff');

module.exports = function(a, b){
  var diffs = JsDiff.diffLines(a, b, {ignoreWhitespace: false});

  var out = [];

  diffs.forEach(function(d){
    var mod = d.removed && d.added ? '!' : (d.removed ? '-' : (d.added ? '+' : ' '));
    var lines = d.value.split('\n');
    if(lines.length > 0 && lines[lines.length - 1] === ''){
      lines = lines.slice(0, lines.length - 1);
    }
    lines.forEach(function(line){
      out.push(mod + line);
    });
  });

  return out.join('\n');
};
