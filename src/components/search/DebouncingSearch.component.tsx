import cities from 'cities-list';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import './Search.component.css';

const citiesArray = Object.keys(cities);

export function DebouncingSearch() {
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const timeoutIdRef = useRef<number>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;

    clearTimeout(timeoutIdRef.current);
    setCity(searchQuery);

    if (isSearchFieldEmpty(searchQuery)) {
      setFilteredCities([]);
      return;
    }

    timeoutIdRef.current = setTimeout(() => {
      setFilteredCities(
        citiesArray.filter((city) =>
          city.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }, 500);
  }
  function handleClick(e: MouseEvent<HTMLDataListElement>) {
    if (e.target instanceof HTMLOptionElement) {
      setCity(e.target.value);
      setFilteredCities([]);
      clearTimeout(timeoutIdRef.current);
    }
  }

  return (
    <section className="search">
      <h1 className="search__header">Find your city</h1>
      <form>
        <span className="ltr-linear-border">
          <input
            id="search"
            type="search"
            name="search"
            className="field"
            list=""
            value={city}
            placeholder="City name..."
            onChange={handleChange}
            autoFocus
            autoComplete="off"
          />
        </span>
        <datalist
          className="filtered-cities"
          id="filteredCities"
          onClick={handleClick}
        >
          {filteredCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </datalist>
      </form>
    </section>
  );
}

function isSearchFieldEmpty(searchQuery?: string): boolean {
  return !searchQuery || searchQuery?.trim()?.length === 0;
}
