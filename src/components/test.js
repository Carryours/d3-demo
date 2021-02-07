const fs = require("fs");
const sourceData = require("./test.json");

function parse(data) {
  let temp = {
    children: [],
    name: data.name,
    value: data.value,
  };
  for (let i = 0; i < 10; i++) {
    temp.children.push({
      name: data.children[i].name,
      value: data.children[i].value,
    });
    if (data.children[i][0])
      temp.children.push({
        name: data.children[i][0].name,
        value: data.children[i][0].value,
      });
    if (data.children[i][1]) {
      temp.children.push({
        name: data.children[i][1].name,
        value: data.children[i][1].value,
      });
    }
  }
  return temp;
}

let testData = JSON.stringify(parse(sourceData));
fs.writeFile("data.json", testData, () => {
  console.log("finished");
});
