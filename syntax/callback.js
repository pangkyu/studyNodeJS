/*
function a(){
    console.log('a');
}*/
const a = function (){
    console.log('a');
}

function slowfunc(callback){
    callback();
}
showfunc(a);