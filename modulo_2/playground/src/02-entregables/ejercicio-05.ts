console.log("************** DELIVERABLE 05 *********************");
class slotMachine {
  private coins: number;
  constructor() {
    this.coins = 0;
  }

  play() {
    this.coins++;
    const reels = [];
    for (let i = 0; i < 3; i++) {
      reels.push(Math.random() < 0.5);
    }

    console.log("Ruletas: ", reels[0], reels[1], reels[2]);

    if (reels.every((reel) => reel)) {
      console.log(`Congratulations!!!. You won ${this.coins} coins!!`);
      this.coins = 0;
    } else {
      console.log("Good luck next time!!");
    }
  }
}

const machine1 = new slotMachine();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
