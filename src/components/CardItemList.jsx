import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [selectedCards, setSelectedCards] = useState([]);

  //On Click handler
  const onClickHandler = (currentId) => {
    const card = cardList.find((item) => item.id === currentId);

    if (card.isOpen || selectedCards.length === 2) return;
    setCardList((prevCards) =>
      prevCards.map((item) =>
        item.id === currentId ? { ...item, isOpen: true } : item
      )
    );
    // Here we are collecting the data
    setSelectedCards((prev) => [...prev, card]);
    if (selectedCards.length === 1) {
      // Checking if the two selected cards match
      if (selectedCards[0].name === card.name) {
        setSelectedCards([]);
      } else {
        // If they do not match, close them after a delay
        setTimeout(() => {
          setCardList((prevCards) =>
            prevCards.map((item) =>
              item.id === currentId || item.id === selectedCards[0].id
                ? { ...item, isOpen: false }
                : item
            )
          );
          setSelectedCards([]); // Reset the selected cards
        }, 500);
      }
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
