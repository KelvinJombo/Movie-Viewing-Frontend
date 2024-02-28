import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const PageTitle = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  font-weight: 800;
  color: green;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ParameterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const ParameterLabel = styled.span`
  margin-right: 5px;
`;

const ParameterInput = styled.input`
  padding: 5px;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const SearchResultContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const HistoryCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchResultPage = ({ apiResult }) => {
  return (
    <SearchResultContainer>
      <h3>Search Result</h3>
      {apiResult ? (
        <pre>{JSON.stringify(apiResult, null, 2)}</pre>
      ) : (
        <p>No results to display</p>
      )}
    </SearchResultContainer>
  );
};

const MovieCard = () => {
  const [searchQueries, setSearchQueries] = useState([]);
  const [title, setTitle] = useState("");
  const [apiResult, setApiResult] = useState(null);

  const handleSearch = async () => {
    const backendApiUrl = `https://localhost:7007/api/movies/search?title=${encodeURIComponent(
      title
    )}`;

    try {
      const response = await fetch(backendApiUrl);
      console.log(response.data);
      const data = await response.json();

      setSearchQueries((prevSearchQueries) => [
        `Title: ${title}`,
        ...prevSearchQueries.slice(0, 4),
      ]);
      setApiResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setTitle("");
    setApiResult(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle>
                <Title>My Sample Movie Application</Title>
              </PageTitle>
              <CardContainer>
                <ParameterContainer>
                  <ParameterLabel>Title:</ParameterLabel>
                  <ParameterInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </ParameterContainer>
                <Link to="/search-result">
                  <SearchButton onClick={handleSearch}>Search</SearchButton>
                </Link>
                <ResetButton onClick={handleReset}>Reset</ResetButton>
              </CardContainer>
              <HistoryCard>
                <h3>Search History</h3>
                <ul>
                  {searchQueries.map((query, index) => (
                    <li key={index}>{query}</li>
                  ))}
                </ul>
              </HistoryCard>
            </>
          }
        />
        <Route
          path="/search-result"
          element={<SearchResultPage apiResult={apiResult} />}
        />
      </Routes>
    </Router>
  );
};

export default MovieCard;
