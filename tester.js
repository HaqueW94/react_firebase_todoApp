var person = {fname:{name:"john",lname:"mk",age:35}, lname:"Doe", age:25};

var text = "";
var x;
for (x in person) {
  text += person[x];
  console.log({x,...person[x]});
}