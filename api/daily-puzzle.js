import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];

  const puzzlesPath = path.join(process.cwd(), 'data', 'puzzles.json');
  const regionsPath = path.join(process.cwd(), 'data', 'regions.json');

  const puzzles = JSON.parse(readFileSync(puzzlesPath, 'utf8'));
  const regions = JSON.parse(readFileSync(regionsPath, 'utf8'));

  const todayPuzzle = puzzles[today];

  if (!todayPuzzle || todayPuzzle.length === 0) {
    return res.status(404).json({ message: "No puzzle found for today" });
  }

  // Enrich with region names
  const responseData = todayPuzzle.map(p => ({
    regionId: p.regionId,
    region: regions[p.regionId.toString()],
    city: p.city
  }));

  res.status(200).json({
    date: today,
    regions: responseData
  });
}
