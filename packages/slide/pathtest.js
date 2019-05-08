const path = require('path')

const path_resolve = path.resolve(__dirname,'src/example/index.html')

const path_join = path.join(__dirname,'../src','../index.html')

console.log(path_resolve,'path_resolve')
console.log(path_join,'path_join')

