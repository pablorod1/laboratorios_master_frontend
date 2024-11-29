console.log("************** CONSOLE TRACES *********************");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const showMessage = async ([time, message]) => {
  await delay(time);
  console.log(message);
};

const triggers = [
  async () => await showMessage([200, "third"]),
  async () => await showMessage([100, "second"]),
];

const run = async (triggers) => {
  const messages = ["third", "second"];

  triggers.forEach(async (t, index) => {
    const newParams = [index, messages[index]];
    await showMessage([newParams[0], newParams[1]]);
  });
  setTimeout(() => {
    console.log("first");
  }, 100);
};

run(triggers);
