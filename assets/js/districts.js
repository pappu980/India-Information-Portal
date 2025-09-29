document.addEventListener("DOMContentLoaded", () => {
  const districtsGrid = document.getElementById("districtsGrid");
  const filterState = document.getElementById("filterState");
  const sortBy = document.getElementById("sortDistricts");

  let districtsData = [];

  // JSON से data लोड करना
  fetch("../../assets/data/districts.json")
    .then(response => response.json())
    .then(districts => {
      districtsData = districts;
      renderDistricts(districtsData);
    })
    .catch(error => {
      console.error("Error loading districts.json:", error);
      districtsGrid.innerHTML = `<p style="color:red;">Failed to load districts data.</p>`;
    });

  // Render districts
  function renderDistricts(districts) {
    districtsGrid.innerHTML = ""; // clear old

    if (districts.length === 0) {
      districtsGrid.innerHTML = `<p>No districts found.</p>`;
      return;
    }

    districts.forEach(d => {
      const card = document.createElement("div");
      card.classList.add("district-card");

      card.innerHTML = `
        <div class="district-img" style="background-image: url('${d.image}');"></div>
        <div class="district-info">
          <div class="district-name en">${d.name_en}</div>
          <div class="district-name hi hindi" style="display:none;">${d.name_hi}</div>
          
          <div class="district-details">
            <span class="en"><strong>State:</strong> ${d.state_en}</span>
            <span class="hi hindi" style="display:none;"><strong>राज्य:</strong> ${d.state_hi}</span>
          </div>

          <div class="district-details">
            <span class="en"><strong>Population:</strong> ${d.population}</span>
            <span class="hi hindi" style="display:none;"><strong>जनसंख्या:</strong> ${d.population}</span>
          </div>

          <div class="district-details">
            <span class="en"><strong>Area:</strong> ${d.area}</span>
            <span class="hi hindi" style="display:none;"><strong>क्षेत्रफल:</strong> ${d.area}</span>
          </div>

          <div class="district-details">
            <span class="en"><strong>HQ:</strong> ${d.headquarters_en}</span>
            <span class="hi hindi" style="display:none;"><strong>मुख्यालय:</strong> ${d.headquarters_hi}</span>
          </div>

          <button class="btn btn-primary en" onclick="window.location.href='${d.page}'">View Details</button>
          <button class="btn btn-primary hi hindi" style="display:none;" onclick="window.location.href='${d.page}'">विवरण देखें</button>
        </div>
      `;

      districtsGrid.appendChild(card);
    });
  }

  // Apply filters
  function applyFilters() {
    let filtered = [...districtsData];

    // State filter
    const stateValue = filterState.value;
    if (stateValue !== "all") {
      filtered = filtered.filter(d => d.state_en.toLowerCase() === stateValue.toLowerCase());
    }

    // Sorting
    const sortValue = sortBy.value;
    if (sortValue === "name") {
      filtered.sort((a, b) => a.name_en.localeCompare(b.name_en));
    } else if (sortValue === "population") {
      filtered.sort((a, b) => parseFloat(b.population) - parseFloat(a.population));
    } else if (sortValue === "area") {
      filtered.sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
    }

    renderDistricts(filtered);
  }

  // Event listeners
  filterState.addEventListener("change", applyFilters);
  sortBy.addEventListener("change", applyFilters);
});
