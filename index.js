var JsDiff = require('diff');

module.exports = function(a, b, opts){
  opts = opts || {};
  var n_surrounding = opts.n_surrounding >= 0 ? opts.n_surrounding : -1;

  var diffs = JsDiff.diffLines(a, b, {ignoreWhitespace: false});

  var out = [];

  var lines_with_change = [];

  diffs.forEach(function(d){
    var mod = d.removed && d.added ? '!' : (d.removed ? '-' : (d.added ? '+' : ' '));
    var lines = d.value.split('\n');
    if(lines.length > 0 && lines[lines.length - 1] === ''){
      lines = lines.slice(0, lines.length - 1);
    }
    lines.forEach(function(line){
      if(mod !== ' ' && n_surrounding >= 0){
        lines_with_change.push(out.length);
      }
      out.push(mod + line);
    });
  });

  if(n_surrounding >= 0){
    var short_out = {};
    lines_with_change.forEach(function(line_i){
      var i;
      for(i = -n_surrounding; i < n_surrounding + 1; i++){
        short_out[line_i + i] = out[line_i + i];
      }
    });
    out = [];
    var key;
    for(key in short_out){
      if(short_out.hasOwnProperty(key)){
        out.push(short_out[key]);
      }
    }
  }

  return out.join('\n');
};
