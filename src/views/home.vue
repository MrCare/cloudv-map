<template lang="">
    <div>
        <div>Cloudv-Map</div>
        <div class="center">
            <cloudv-map
                :server="server"
                :raster="raster"
                :fullScreen="fullScreen"
                :markers="markers"
                :polygons="polygons"
            ></cloudv-map>
        </div>
    </div>
</template>
<script>
import markers from '@/mocks/markers.js';
import polygons from '@/mocks/polygon.js';

export default {
    data() {
        return {
            server: 'http://139.196.122.31:82/geoserver',
            raster: 'robot:sanfang_Image',
            fullScreen: true,
            markers,
            polygons,
        };
    },
};
</script>
<style lang="css">
    .center{
        display: flex;
        justify-content: center;
    }
</style>
