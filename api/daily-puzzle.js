import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];

  const puzzlesPath = path.join(process.cwd(), 'data', 'puzzles.json');
  const regionsPath = path.join(process.cwd(), 'data', 'regions.json');
  const citiesPath = path.join(process.cwd(), 'data', 'cities.json');

  const puzzles = JSON.parse(readFileSync(puzzlesPath, 'utf8'));
  const regions = JSON.parse(readFileSync(regionsPath, 'utf8'));
  const cities = JSON.parse(readFileSync(citiesPath, 'utf8'));

  const regionIds = puzzles[today];
  if (!regionIds) {
    return res.status(404).json({ message: "No puzzle found for today" });
  }

  const result = regionIds.map(regionId => {
    const regionName = regions[regionId];
    const cityList = cities.filter(c => c.regionId === regionId);
    const selectedCity = cityList.length > 0 ? cityList[0].city : null;

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
