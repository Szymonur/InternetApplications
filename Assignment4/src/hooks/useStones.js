import { useState, useEffect, useMemo } from "react";

export function useStones() {
    const [stones, setStones] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    // "asc" or "desc"
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        fetch("./src/assets/stones.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setStones(myJson.stones);
            })
            .catch((error) => {
                console.error("Get json error: ", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    const updateField = (id, field, newValue) => {
        setStones((prev) =>
            prev.map((s) => (s.id === id ? { ...s, [field]: newValue } : s)),
        );
    };

    const processedStones = useMemo(() => {
        let result = stones;

        // Search
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            result = stones.filter(
                (stone) =>
                    stone.name.toLowerCase().includes(lowerCaseQuery) ||
                    stone.description.toLowerCase().includes(lowerCaseQuery),
            );
        }

        // Sort
        result = [...result].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.rating - b.rating;
            } else {
                return b.rating - a.rating;
            }
        });

        return result;
    }, [stones, searchQuery, sortOrder]);

    const toggleSort = () => {
        setSortOrder((current) => {
            if (current === "asc") return "desc";
            if (current === "desc") return "asc";
        });
    };

    return {
        stones: processedStones,
        isLoading,
        searchQuery,
        setSearchQuery,
        updateField,
        sortOrder,
        toggleSort,
    };
}
