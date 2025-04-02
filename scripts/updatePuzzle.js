const fs = require("fs");
const path = require("path");

const citiesPath = path.join(__dirname, "../data/cities.json");
const puzzlesPath = path.join(__dirname, "../data/puzzles.json");

const citiesByRegion = JSON.parse(fs.readFileSync(citiesPath, "utf8"));
const puzzles = JSON.parse(fs.readFileSync(puzzlesPath, "utf8"));

// Get today's date in UTC
const today = new Date().toISOString().split("T")[0];

// Get 2 unique random region IDs
const allRegionIds = Object.keys(citiesByRegion);
let selectedRegionIds = [];
while (selectedRegionIds.length < 2) {
  const randomId = allRegionIds[Math.floor(Math.random() * allRegionIds.length)];
  if (!selectedRegionIds.includes(randomId)) {
    selectedRegionIds.push(randomId);
  }
}

// Pick a random city from each region
const selectedCities = selectedRegionIds.map(regionId => {
  const cityList = citiesByRegion[regionId];
  const city = cityList[Math.floor(Math.random() * cityList.length)];
  return { regionId: parseInt(regionId), city };
});

// Add today's puzzle
puzzles[today] = selectedCities;

// Write back to puzzles.json
fs.writeFileSync(puzzlesPath, JSON.stringify(puzzles, null, 2));

console.log(`✅ Puzzle for ${today}:`, selectedCities);

