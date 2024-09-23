import "./styles.css";
import { CardItemList } from "./components/CardItemList";

/**
 * This is a memory game.
 *
 * The objective of the game is
 * to match all pairs of cards.
 *
 * * To play the game:
 * * 1. Player clicks on two cards.
 * * 2. If the cards match, they will remain open.
 * * 3. If the cards do not match, they will close after 500ms.
 * * 4. End goal is to open all pairs of cards.
 *
 * If a card is already open, nothing will happen when clicked.
 */

function App() {
  return (
    <div className="App">
      <CardItemList></CardItemList>
    </div>
  );
}

export default App;
