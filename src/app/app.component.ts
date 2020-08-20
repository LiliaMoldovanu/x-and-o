import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "XandO";
  x = [];
  o = [];
  oMode = false;
  xMode = true;
  winner;
  winnerData;
  users = [
    { user: "O", moves: this.o },
    { user: "X", moves: this.x },
  ];

  onChangeToOMode() {
    this.oMode = true;
    this.xMode = false;
  }

  onChangeToXMode() {
    this.oMode = false;
    this.xMode = true;
  }

  onClick(id: number) {
    if (this.oMode) {
      this.o.push(id);
    } else {
      this.x.push(id);
    }
    this.winnerData = this.isLine();
    this.winner = this.winnerData["user"];
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
    let diagonal = [
      {
        first: 11,
        second: 22,
      },
      {
        first: 9,
        second: 18,
      },
    ];
    for (let r = 0; r < this.users.length; r++) {
      for (let set = 0; set < diagonal.length; set++) {
        for (let i = 0; i < this.users[r].moves.length; i++) {
          let firstMatch = this.users[r].moves.find(
            (item) => item === this.users[r].moves[i] + diagonal[set].first
          );
          let secondMatch = this.users[r].moves.find(
            (item) => item === this.users[r].moves[i] + diagonal[set].second
          );
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
    this.isLine();
  }
}
