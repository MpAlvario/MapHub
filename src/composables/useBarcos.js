//separar barcos (markers, fetch barcos, actualización markers)
import L from "leaflet"

export function useBarcos(map, popupBase, eventosPopup) {

  let markers = {}

  async function cargarBarcos() {

    const res = await fetch("http://192.168.71.54:8080/proyecto/api_barco.php?ts=" + Date.now())
    const json = await res.json()

    if (!json.ok) return

    json.data.forEach(barco => {

      const lat = parseFloat(barco.latitud)
      const lon = parseFloat(barco.longitud)

      if (markers[barco.codigo]) {

        markers[barco.codigo].setLatLng([lat, lon])

  //si el popup esta abierto no se borra
       if (!markers[barco.codigo].isPopupOpen()) {
        markers[barco.codigo]
        .setPopupContent(popupBase(barco))
}

      } else {

        const marker = L.marker([lat, lon])
          .addTo(map)
          .bindPopup(popupBase(barco))

        marker.on("popupopen", e => {
          eventosPopup(e, barco)
        })

        markers[barco.codigo] = marker
      }

    })
  }

  return { cargarBarcos, markers }
}
