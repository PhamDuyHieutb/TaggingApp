var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = 'app_prod_database'
  , TEST_DB = 'app_test_database'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function (mode, done) {
  state.pool = mysql.createPool({
    host: '192.168.23.191',
    port: '3306',
    user: 'phuoclh',
    password: 'gW7Gj1HJ2wcJ'
  })

  state.mode = mode

}

exports.get = function () {
  return state.pool
}

exports.getUrls = function (callback) {
  var pool = state.pool
  var query = 'select id_url, url,cat_tag from url_content.Url where status=1 and cat_tag is null limit 4;'
  pool.query(query, function (err, rows) {
    if (err) return console.log(err, " is err")

    callback(rows)
  })
}

  exports.getUrlsPlus = function (id, callback) {
  var pool = state.pool
  var query = 'select id_url, url,cat_tag from url_content.Url where status=1 and cat_tag is null and id_url >' + id + ' limit 4;'
  //console.log(query)
  pool.query(query, function (err, rows) {
    if (err) return console.log(err, " is err")
    callback(rows)
  })
}
  exports.setUrl = function (data) {
    var pool = state.pool
    var id = data.id
    var value = data.value;
    var query = "UPDATE url_content.Url SET cat_tag=\'" + value + "\' WHERE id_url = \'" + id + "\';"
    pool.query(query)
  }



