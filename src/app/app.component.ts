import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "XandO";
  boxes = [11, 12, 13, 21, 22, 23, 31, 32, 33];
  x = [];
  o = [];
  userMode = "X";
  winner;
  winnerData;
  isDraw = false;
  users = [
    { user: "O", moves: this.o },
    { user: "X", moves: this.x },
  ];

  onChangeUserMode(mode: string) {
    this.userMode = mode;
  }

  onClick(id: number) {
    if (this.userMode === "O") {
      this.o.push(id);
    } else {
      this.x.push(id);
    }
    this.winnerData = this.isLine();
    this.winner = this.winnerData["user"];
    if (this.o.length + this.x.length === 9 && !this.winner) {
      this.isDraw = true;
    }
  }

  isXClicked(id: number) {
    return this.x.find((i) => i === id);
  }

  isOClicked(id: number) {
    return this.o.find((i) => i === id);
  }

  isHLine() {
    for (let r = 0; r < this.users.length; r++) {
      for (let i = 0; i < this.users[r].moves.length; i++) {
        let firstMatch = this.users[r].moves.find(
          (item) => item === this.users[r].moves[i] + 1
        );
        let secondMatch = this.users[r].moves.find(
          (item) => item === this.users[r].moves[i] + 2
        );
        if (firstMatch && secondMatch) {
          return {
            user: this.users[r].user,
            line: [this.users[r].moves[i], firstMatch, secondMatch],
          };
        }
      }
    }
    return false;
  }

  isVLine() {
    for (let r = 0; r < this.users.length; r++) {
      for (let i = 0; i < this.users[r].moves.length; i++) {
        let firstMatch = this.users[r].moves.find(
          (item) => item === this.users[r].moves[i] + 10
        );
        let secondMatch = this.users[r].moves.find(
          (item) => item === this.users[r].moves[i] + 20
        );
        if (firstMatch && secondMatch) {
          return {
            user: this.users[r].user,
            line: [this.users[r].moves[i], firstMatch, secondMatch],
          };
        }
      }
    }
    return false;
  }

  isDLine() {
    // set the gap between boxes for each diagonal
    let diagonal = [
      {
        firstGap: 11,
        secondGap: 22,
      },
      {
        firstGap: 9,
        secondGap: 18,
      },
    ];
    // iterate both users
    for (let r = 0; r < this.users.length; r++) {
      // verify for each of two diagonals
      for (let set = 0; set < diagonal.length; set++) {
        // iterate through all moves made and stored in moves array
        for (let i = 0; i < this.users[r].moves.length; i++) {
          // verify if in moves array there is first Match(box) for diagonal line
          let firstMatch = this.users[r].moves.find(
            (item) => item === this.users[r].moves[i] + diagonal[set].firstGap
          );
          // verify if in moves array there is second Match(box) for diagonal line
          let secondMatch = this.users[r].moves.find(
            (item) => item === this.users[r].moves[i] + diagonal[set].secondGap
          );
          // if there are both matches return user that had line and the line(all three boxes)
          if (firstMatch && secondMatch) {
            return {
              user: this.users[r].user,
              line: [this.users[r].moves[i], firstMatch, secondMatch],
            };
          }
        }
      }
    }
    return false;
  }

  isLine() {
    return this.isVLine() || this.isHLine() || this.isDLine();
  }

  onReset() {
    this.o = [];
    this.x = [];
    this.users = [
      { user: "O", moves: this.o },
      { user: "X", moves: this.x },
    ];
    this.winnerData = null;
    this.isDraw = false;
    this.isLine();
  }
}
