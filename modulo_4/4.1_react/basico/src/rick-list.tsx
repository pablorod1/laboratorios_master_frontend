import React from "react";
import { Link } from "react-router-dom";
import { Character } from "./model";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const RickListPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [filterValue, setFilterValue] = React.useState<string>("");

  const debouncedFilter = useDebounce(filterValue, 500);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((response) => response.json())
      .then((json) => setCharacters(json.results));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(debouncedFilter.toLowerCase())
  );

  return (
    <>
      <div style={{ display: "flex", alignContent: "center", gap: "1rem" }}>
        <h2 className="rick-title">Rick & Morty</h2>
        <Link className="list-redirect" to="/list">
          Go to List
        </Link>
      </div>
      <input
        className="rick-search-input"
        type="text"
        placeholder="Search..."
        value={filterValue}
        onChange={handleFilterChange}
      />
      <div className="rick-list-grid">
        {filteredCharacters.map((character: Character) => (
          <div className="rick-list-item" key={character.id}>
            <img src={character.image} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{character.id}</span>
              <Link to={`/rick-list/${character.id}`}>{character.name}</Link>
            </div>
            <span>
              {character.status} - {character.gender}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
