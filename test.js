let obj = {
    "1": 1,
    "2": 2,
    "3": 3
}

let c = 0;
for(let i in obj){
    if(obj.hasOwnProperty(i)){
        console.log(obj[i]);
        c++;
        if(c==Object.keys(obj).length) console.log('done');
    }

}