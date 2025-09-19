// Load Featured Businesses on Home
if (document.getElementById("featured-list")) {
  fetch("data/businesses.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("featured-list");
      data.slice(0, 2).forEach(b => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <h4>${b.name}</h4>
          <p>${b.description}</p>
          <a href="business.html?id=${b.id}">View Details</a>
        `;
        container.appendChild(div);
      });
    });
}

// Load All Businesses
if (document.getElementById("business-list")) {
  fetch("data/businesses.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("business-list");
      const search = document.getElementById("search");

      function render(list) {
        container.innerHTML = "";
        list.forEach(b => {
          const div = document.createElement("div");
          div.classList.add("card");
          div.innerHTML = `
            <h3>${b.name}</h3>
            <p>${b.description}</p>
            <a href="business.html?id=${b.id}">View More</a>
          `;
          container.appendChild(div);
        });
      }

      render(data);

      search.addEventListener("input", e => {
        const filtered = data.filter(b => 
          b.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        render(filtered);
      });
    });
}

// Load Single Business
if (document.getElementById("business-details")) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch("data/businesses.json")
    .then(res => res.json())
    .then(data => {
      const business = data.find(b => b.id == id);
      if (business) {
        const container = document.getElementById("business-details");
        container.innerHTML = `
          <h2>${business.name}</h2>
          <p>${business.description}</p>
          <p><strong>Category:</strong> ${business.category}</p>
          <p><strong>Location:</strong> ${business.location}</p>
          <p><a href="${business.website}" target="_blank">Visit Website</a></p>
          <h3>Products/Services:</h3>
          <ul>
            ${business.products.map(p => `<li>${p.name} - ${p.price}</li>`).join("")}
          </ul>
        `;
      }
    });
}