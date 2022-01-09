const pet = {
  name: "Kallu",
};

pet.toJSON = function () {
  this.age = 13;
  return this;
};

console.log(JSON.stringify(pet));
