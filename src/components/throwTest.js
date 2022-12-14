function isCool(coolTest){
    var errorMsg = {
        msg: "not cool man",
        cool: coolTest
    }
    if (!coolTest){
        throw (error) => {
            return errorMsg
        }
    } else {
        return true;
    }
}

var cool = true;
try {
    var hey = isCool(!cool);
} catch (error){
    hey = error();
}

console.log(hey.cool);

