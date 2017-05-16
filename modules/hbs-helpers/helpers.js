exports.charAtIndex = function (str, index) {
    let s = str.trim();
    return s[index].toUpperCase();
}
exports.currentBoardData = function(object,property){
   var o = JSON.parse(object);
   return o[property];
}
exports.getUser = function(user){
    console.log(user);
}