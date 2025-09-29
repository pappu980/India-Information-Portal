document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".states-grid");

    fetch("../../assets/data/states.json")
        .then(res => res.json())
        .then(states => {
            renderStates(states);

            // Filters
            document.getElementById("region").addEventListener("change", () => applyFilters(states));
            document.getElementById("type").addEventListener("change", () => applyFilters(states));
            document.getElementById("sort").addEventListener("change", () => applyFilters(states));
        })
        .catch(err => console.error("Error loading states:", err));

    function renderStates(states) {
        grid.innerHTML = "";
        states.forEach(state => {
            const card = document.createElement("div");
            card.className = "state-card-large";
            card.setAttribute("data-region", state.region);
            card.setAttribute("data-type", state.type);

            card.innerHTML = `
                <div class="state-img" style="background-image:url('${state.image}')"></div>
                <div class="state-info">
                    <div class="state-name en">${state.name_en}</div>
                    <div class="state-name hi hindi" style="display:none;">${state.name_hi}</div>
                    <div class="state-capital en">Capital: ${state.capital_en}</div>
                    <div class="state-capital hi hindi" style="display:none;">राजधानी: ${state.capital_hi}</div>
                    <div class="state-details">
                        <span class="en">Districts: ${state.districts}</span>
                        <span class="hi hindi" style="display:none;">जिले: ${state.districts}</span>
                        <span class="en">Population: ${state.population}</span>
                        <span class="hi hindi" style="display:none;">जनसंख्या: ${state.population}</span>
                    </div>
                    <div class="state-actions">
                        <button class="btn btn-primary en" onclick="location.href='${state.page}'">View Details</button>
                        <button class="btn btn-primary hi hindi" style="display:none;" onclick="location.href='${state.page}'">विवरण देखें</button>
                        <button class="btn btn-outline en">Compare</button>
                        <button class="btn btn-outline hi hindi" style="display:none;">तुलना करें</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function applyFilters(states) {
        const region = document.getElementById("region").value;
        const type = document.getElementById("type").value;
        const sortBy = document.getElementById("sort").value;

        let filtered = states.filter(s => 
            (region === "all" || s.region === region) &&
            (type === "all" || s.type === type)
        );

        // Sorting
        if (sortBy === "name") {
            filtered.sort((a, b) => a.name_en.localeCompare(b.name_en));
        } else if (sortBy === "population") {
            filtered.sort((a, b) => parseFloat(b.population) - parseFloat(a.population));
        } else if (sortBy === "area" && a.area && b.area) {
            filtered.sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
        }

        renderStates(filtered);
    }
});
