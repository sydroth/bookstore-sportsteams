SELECT t.*, d.name as division_name, d.id as division_id, l.id as league_id, l.abbreviation FROM teams t
JOIN divisions d ON d.id=t.division_id JOIN leagues l ON l.id=d.league_id