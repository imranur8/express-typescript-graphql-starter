/*
 * copy .graphQL file to build in compile time
 */

const shell = require('shelljs')
const fs = require('fs');
const path = require('path');

shell.exec('mkdir -p build');
shell.exec('mkdir -p build/graphql');

const testFolder = 'src/graphql';
// joining path of directory 
var directoryPath = path.join(__dirname, testFolder);
const graphQLDirList = [];
// passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    // handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (dirName) {
        if(!dirName.includes(".")){
          graphQLDirList.push(dirName);
        }
    });
    /**
    *  create dir and copy graphql file
    */
    graphQLDirList.map((dir) => {
      // create each graphql dir and 
      shell.exec(`mkdir -p build/graphql/${dir}`)
      shell.cp("-R", `src/graphql/${dir}/schema.graphql`, `build/graphql/${dir}/schema.graphql`);
    })
});


