const express = require("express");

const router = express.Router();

router.post("/play", async (req, res) => {
  console.log("play ...", req.body);
  try {
    const { arrayData, ballPosition } = req.body;

    let arrayNew = deepCopy(arrayData);

    for (let i = 0; i < arrayData.length; i++) {
      for (let j = 0; j < arrayData[i].length; j++) {
        // On ne traite pas les joueurs bleus
        if (!arrayData[i][j].includes("R")) continue;

        // On ne traite pas les cases vides
        if (arrayData[i][j] === "") continue;

        // On ne traite pas le gardien
        if (arrayData[i][j] === "R1") continue;

        // Un joueur rouge
        console.log(
          "Un joueur rouge est placé ici : ",
          arrayData[i][j],
          " - ",
          i,
          " - ",
          j
        );

        // Déterminer le joueur rouge en tenant compte d'un partage de zone avec un bleu
        let playerRed = "";
        let playerBlue = "";

        if (arrayData[i][j].includes("B")) {
          tabPlayers = arrayData[i][j].split("-");
          if (tabPlayers[0].includes("R")) {
            playerRed = tabPlayers[0];
          } else {
            playerRed = tabPlayers[1];
          }
        } else {
          playerRed = arrayData[i][j];
        }
        // On avance le joueur
        arrayNew[i][j] = arrayNew[i][j].replace(playerRed, "");
        arrayNew[i + 1][j] =
          arrayData[i + 1][j].length > 0
            ? arrayData[i + 1][j].concat("-" + playerRed)
            : playerRed;
      }
    }
    // On renvoie l'objet user

    console.log("arrayNew -> ", arrayNew);
    res.json(arrayNew);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Copie profonde de tableau
function deepCopy(obj) {
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    var len = obj.length,
      out = new Array(len),
      i = 0;
    for (; i < len; i++) {
      out[i] = arguments.callee(obj[i]);
    }
    return out;
  }
  return obj;
}

module.exports = router;
