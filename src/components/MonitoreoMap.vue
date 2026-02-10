<template>
  <div ref="map" class="monitoreo-map"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: "MonitoreoMap",

  data(){
    return{
      map:null,
      marcadores:[],
      intervalo:null
    }
  },

  methods:{
    cargarDatos(){
      
      fetch("http://192.168.71.62:8080/datos.php")
.then(r=>r.text())
.then(t=>console.log("RESPUESTA RAW:",t))


      fetch("http://192.168.71.62:8080/datos.php")
      .then(r=>r.json())
      .then(data=>{

        // limpiar marcadores anteriores
        this.marcadores.forEach(m=>this.map.removeLayer(m))
        this.marcadores=[]

        data.forEach(d=>{

          let objeto=(d.objeto||"").trim().toLowerCase()

          let icono=L.icon({
            iconUrl: objeto==="barco" ? "/barco.png" : "/boya.png",

            iconSize:[40,40],
            iconAnchor:[20,40],
            popupAnchor:[0,-40]
          })

          let marcador=L.marker(
            [parseFloat(d.latitud),parseFloat(d.longitud)],
            {icon:icono}
          )
          .addTo(this.map)
          .bindPopup(`
            <b>Cámara:</b> ${d.camera_code}
            <br><b>Objeto:</b> ${d.objeto}
            <br><b>Velocidad:</b> ${d.velocidad} nudos
            <br><b>Rumbo:</b> ${d.rumbo}°
            <br><b>Clima:</b> ${d.clima}
            <br><b>Riesgo:</b> ${d.riesgo_colision}
          `)

          this.marcadores.push(marcador)
        })

      })
    }
  },

  mounted(){

    this.map=L.map(this.$refs.map)
    .setView([19.4,-95.6],9)

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.map)

    this.cargarDatos()

    this.intervalo=setInterval(()=>{
      this.cargarDatos()
    },10000)
  },

  beforeUnmount(){
    if(this.intervalo){
      clearInterval(this.intervalo)
    }
  }
}
</script>

<style>
.monitoreo-map{
  height:100vh;
  width:100%;
}
</style>
