
export default function titleToHash(string) {
    // string: rute || rute-two
    let id = 0, word = "", result = "";
    string = string.split("-").join("")
    string = string.split(".").join("")
    string = string.split(",").join("")
    string = string.split("/").join("")
    string = string.split("'").join("")
    let splitString = string.split(" ");

    splitString.forEach(e => {
        // age > 18 ? location.assign("continue.html") : stop = true;

        if(!(e === "" || e === '–') ){
            let eachWord = e.toLowerCase()
            id > 0 ? word = "-" + eachWord : word = eachWord;
            result += word;
            id += 1;
        }
    });

    // console.log(result)

    return result;

}