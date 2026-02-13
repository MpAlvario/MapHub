//Leaflet base
import L from "leaflet"

export function useMap() {

  let map = null

  function crearMapa(id) {
    map = L.map(id).setView([19.5, -95.5], 8)

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 18 }
    ).addTo(map)

    return map
  }

  return {
    crearMapa,
    getMap: () => map
  }
}
