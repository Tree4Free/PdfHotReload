const express = require('express')
const hash_file = require('hash_file')
const fs = require('fs')
const app = express()

let currentHash

hash_file('./pdf/file.pdf', 'sha1', function(err, hash) {
  currentHash = hash
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/pdf', function(req, res) {
  res.sendFile(__dirname + '/pdf/file.pdf')
})

app.get('/reload', function(req, res) {
  hash_file('./pdf/file.pdf', 'sha1', function(err, hash) {
    res.send(currentHash != hash)
    currentHash = hash
  })
})

app.get('/hash', function(req, res) {
  res.send(currentHash)
})

app.listen(8081, function() {
  console.log('Example app listening on port 8081!')
})
