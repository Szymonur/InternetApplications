let state = {
    allElixirs: [],
    filteredElixirs: [],
    filters: {
        difficultyLevels: [],
        searchTerm: "",
    },
};

export const Store = {
    setElixirs: (data) => {
        state.allElixirs = data;
        state.filteredElixirs = data;
    },

    filterElixirs: (searchTerm) => {
        state.filters.searchTerm = searchTerm;
        filterTogether();

        return state.filteredElixirs;
    },

    // Available values : Unknown, Advanced, Moderate, Beginner, OrdinaryWizardingLevel, OneOfAKind
    getDifficultyLevels: () => {
        const difficulties = state.allElixirs
            .map((elixir) => elixir.difficulty)
            .filter(Boolean);

        const uniqueLevels = [...new Set(difficulties)];

        state.filters.difficultyLevels = uniqueLevels;

        return uniqueLevels;
    },

    filterDifficultyLevels: (difficultyLevels) => {
        state.filters.difficultyLevels = difficultyLevels;
        filterTogether();

        return state.filteredElixirs;
    },

    getAll: () => state.allElixirs,
};

function filterTogether() {
    state.filteredElixirs = state.allElixirs.filter((elixir) => {
        const matchesSearch = elixir.name
            .toLowerCase()
            .includes(state.filters.searchTerm.toLowerCase());

        const matchesDifficulty = state.filters.difficultyLevels.includes(
            elixir.difficulty,
        );

        return matchesSearch && matchesDifficulty;
    });
}
