import puzzles from '../data/puzzles.json' assert { type: 'json' };
import regions from '../data/regions.json' assert { type: 'json' };
import cities from '../data/cities.json' assert { type: 'json' };

export default function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];
  const regionIds = puzzles[today];

  if (!regionIds) {
    return res.status(404).json({ message: "No puzzle found for today" });
  }

  const result = regionIds.map(regionId => {
    const regionName = regions[regionId];
    const regionCities = cities.filter(c => c.regionId === regionId);
    const selectedCity = regionCities.length > 0 ? regionCities[0].city : null;

    return {
      region: regionName,
      city: selectedCity
    };
  });

  res.status(200).json({
    date: today,
    regions: result
  });
}

