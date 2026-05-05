import { useMemo, useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import StoneTable from "./components/StoneTable.jsx";
import { useStones } from "./hooks/useStones.js";
import "./App.css";

function App() {
    const {
        stones,
        isLoading,
        searchQuery,
        setSearchQuery,
        updateField,
        sortOrder,
        toggleSort,
        addStone,
        deleteStone,
    } = useStones();

    return (
        <div className="container">
            <SearchBar search={searchQuery} onSearch={setSearchQuery} />
            {isLoading ? (
                <h2> Loading data...</h2>
            ) : (
                <StoneTable
                    stones={stones}
                    updateField={updateField}
                    sortOrder={sortOrder}
                    toggleSort={toggleSort}
                    addStone={addStone}
                    deleteStone={deleteStone}
                />
            )}
        </div>
    );
}

export default App;
