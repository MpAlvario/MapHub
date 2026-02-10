<template>
  <nav class="Navbar">

    <!-- IZQUIERDA : SELECT MAPA -->
    <div class="left">
      <select v-model="localMap" @change="emitMapChange">
        <option value="mexico">Mapa de México</option>
        <option value="monitoreo">Mapa Monitoreo Marino</option>
      </select>
    </div>

    <!-- CENTRO : TITULO DINAMICO -->
    <div class="center">
      <h2>
        {{ localMap === 'mexico'
          ? 'Mapa de México'
          : 'Mapa de Monitoreo Marino' }}
      </h2>
    </div>

    <!-- DERECHA : VARIABLES SOLO MEXICO -->
    <div class="right">
      <select
        v-if="localMap === 'mexico'"
        v-model="localLayer"
        @change="emitChange"
      >
        <option value="poblacion">Población</option>
        <option value="recursoFinanciero">Recursos financieros</option>
        <option value="recursoHumano">Recursos humanos</option>
        <option value="personalActivo">Personal activo</option>
      </select>
    </div>

  </nav>
</template>

<script>
export default {

  name: 'Navbar',

  props: {
    modelValue: {
      type: String,
      required: true
    },
    mapaSeleccionado: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue', 'update:mapaSeleccionado'],

  data() {
    return {
      localLayer: this.modelValue,
      localMap: this.mapaSeleccionado
    }
  },

  methods: {

    emitChange() {
      this.$emit('update:modelValue', this.localLayer)
    },

    emitMapChange() {
      this.$emit('update:mapaSeleccionado', this.localMap)
    }

  }
}
</script>

<style scoped>

.Navbar {
  height: 60px;
  background: linear-gradient(90deg, #1b5e20, #2e7d32);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}

/* ZONAS */
.left {
  width: 30%;
}

.center {
  width: 40%;
  text-align: center;
}

.right {
  width: 30%;
  display: flex;
  justify-content: flex-end;
}

/* TITULO */
.center h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

/* SELECTS */
.Navbar select {
  padding: 8px 36px 8px 14px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  background-color: white;
  color: #1b5e20;
  font-weight: 600;
  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231b5e20'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  transition: all 0.2s ease;
}

.Navbar select:hover {
  background-color: #f1f8f4;
}

.Navbar select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 94, 32, 0.3);
}

</style>
