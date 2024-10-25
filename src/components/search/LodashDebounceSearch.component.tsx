import cities from 'cities-list';
import debounce from 'lodash.debounce';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import './Search.component.css';

const citiesArray = Object.keys(cities);

export function LodashDebounceSearch() {
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const debouncedCitiesFilter = useCallback(
    debounce((searchQuery: string) => {
      setFilteredCities(
        citiesArray.filter((city) =>
          city.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }, 500),
    [],
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;

    setCity(searchQuery);

    if (isSearchFieldEmpty(searchQuery)) {
      setFilteredCities([]);
      return;
    }

    debouncedCitiesFilter(searchQuery);
  }
  function handleClick(e: MouseEvent<HTMLDataListElement>) {
    if (e.target instanceof HTMLOptionElement) {
      setCity(e.target.value);
      setFilteredCities([]);
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
