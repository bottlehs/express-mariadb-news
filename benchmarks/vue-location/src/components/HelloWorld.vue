<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ isGeoLocation ? '위치정보 허용' : '위치정보 허용 하지않음' }}</div>
    <div v-if="!isGeoLocation && geoLocationErrorMsg">{{ geoLocationErrorMsg }}</div>
    <div v-if="isGeoLocation">
      <h5>latitude</h5>
      <p>{{ geoLocation.latitude }}</p>      
      <h5>longitude</h5>      
      <p>{{ geoLocation.longitude }}</p>            
    </div>
    <button type="button" @click.prevent.stop="getLocation">Get Geolocation</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {  
      isGeoLocation: false,
      geoLocationErrorMsg: null,
      geoLocation: {
        latitude:null,
        longitude:null
      }
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      } else {
        this.isGeoLocation = false;
      }
    },
    showPosition(position) {
        this.isGeoLocation = true;
        this.geoLocation.latitude = position.coords.latitude;
        this.geoLocation.longitude = position.coords.longitude;
    },
    showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          this.geoLocationErrorMsg = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.geoLocationErrorMsg = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.geoLocationErrorMsg = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.geoLocationErrorMsg = "An unknown error occurred.";
          break;
      }      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
