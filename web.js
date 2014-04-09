/**
 * Created by grunz on 4/9/14.
 */
var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get('/widgets', function(req, res){
  res.json([
      {"name": "CPM", "value": "10.45"},
      {"name": "SPEND", "value": "18247.21"},
      {"name": "IMPRESSIONS", "value": "24000"},
      {"name": "VCR", "value": "81"}
  ])
});

app.listen(process.env.PORT || 5000);
/**
 * Created by grunz on 4/9/14.
 */
