import React from "react";
import { Link, useParams } from "react-router-dom";
import { Character } from "./model";

export const RickCharacterPage: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = React.useState<Character>();

  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((json) => setCharacter(json));
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <section className="rick-character-section">
      <Link to="/rick-list">Back to List</Link>
      <h2>
        {character?.name} - {character?.status}
      </h2>
      <div className="rick-character">
        <img src={character?.image} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{character.gender}</span>
          <span>{character?.species}</span>
          <span>{character.origin.name}</span>
        </div>
      </div>
    </section>
  );
};
