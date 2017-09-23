exports.charAtIndex = function (str, index) {
    let s = str.trim();
    return s[index].toUpperCase();
}
exports.currentBoardData = function(object,property){
	console.log(object);
	var o = JSON.parse(JSON.stringify(object));
	return o[property];
}
exports.getUser = function(user){
    console.log(user);
}