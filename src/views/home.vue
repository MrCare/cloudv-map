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
                :lines="lines"
            ></cloudv-map>
        </div>
    </div>
</template>
<script>
import markers from '@/mocks/markers.js';
import polygons from '@/mocks/polygons.js';
import lines from '@/mocks/lines.js';

export default {
    data() {
        return {
            server: 'http://139.196.122.31:82/geoserver',
            raster: 'robot:sanfang_Image',
            fullScreen: true,
            markers,
            polygons,
            lines,
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
