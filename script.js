function getPokemon() {
  const search = document.getElementById('search').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${search}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Pokémon no encontrado');
      return response.json();
    })
    .then(data => {
      const card = document.getElementById('pokemon-card');
      card.classList.remove('hidden');

      // Datos principales
      document.getElementById('name').textContent = capitalize(data.name);
      document.getElementById('type').textContent = `Tipo: ${data.types.map(t => t.type.name).join(', ')}`;
      document.getElementById('sprite').src = data.sprites.front_default;

      // Más características (10)
      const details = [
        `Altura: ${data.height / 10} m`,
        `Peso: ${data.weight / 10} kg`,
        `Experiencia base: ${data.base_experience}`,
        `Habilidad principal: ${data.abilities[0].ability.name}`,
        `Número en Pokédex: ${data.id}`,
        `Estadísticas:`,
        ...data.stats.map(stat => `${capitalize(stat.stat.name)}: ${stat.base_stat}`),
        `Movimientos: ${data.moves.slice(0, 3).map(m => m.move.name).join(', ')}`
      ];

      const ul = document.getElementById('details');
      ul.innerHTML = "";
      details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      alert(err.message);
      document.getElementById('pokemon-card').classList.add('hidden');
    });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getPokemon();
    }
});