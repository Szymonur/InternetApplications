let state = {
    allElixirs: [],
    filteredElixirs: [],
};

export const Store = {
    setElixirs: (data) => {
        state.allElixirs = data;
        state.filteredElixirs = data;
    },
    filterElixirs: (searchTerm) => {
        state.filteredElixirs = state.allElixirs.filter((elixir) =>
            elixir.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return state.filteredElixirs;
    },
    getAll: () => state.allElixirs,
};
