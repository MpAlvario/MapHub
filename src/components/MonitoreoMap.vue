<template>
  <div id="map"></div>
</template>

<script setup>

import { onMounted } from "vue"
import { useMap } from "../composables/useMap"
import { useBarcos } from "../composables/useBarcos"
import { useHistorial } from "../composables/useHistorial"

let map


function popupBase(barco){
  return `
    <div>

      <b>${barco.codigo}</b><br>
      <b>Timestamp:</b> ${barco.timestamp}<br>
      <b>Velocidad:</b> ${barco.velocidad ?? "N/A"}<br>
      <b>Rumbo:</b> ${barco.rumbo ?? "N/A"}<br>
      <b>Clima:</b> ${barco.clima ?? "N/A"}<br>
      <b>Riesgo:</b> ${barco.riesgo_colision ?? "N/A"}<br>

      <button class="btn-vermas">
        Ver más...
      </button>

     

      <div id="hist-${barco.codigo}"
           class="historial-box"
           style="display:none;">
        Cargando historial...
      </div>

    </div>
  `
}



onMounted(() => {

  const { crearMapa } = useMap()
  map = crearMapa("map")

  const historial = useHistorial(map)

  function eventosPopup(e, barco){

  const popupEl = e.popup.getElement()

  popupEl
    .querySelector(".btn-vermas")
    ?.addEventListener("click", () =>
      historial.verHistorial(barco.codigo)
    )

  
}


  const barcos = useBarcos(
    map,
    popupBase,
    eventosPopup
  )

  barcos.cargarBarcos()

  setInterval(() => {
  barcos.cargarBarcos()
  historial.actualizarHistorialSeleccionado()
}, 5000)

  setTimeout(() => {
    map.invalidateSize()
  }, 200)

})

</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
