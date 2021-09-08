<template lang="">
    <div>
        <div id="map" style="min-width:50vw; min-height:50vh; border-radius:20px;"></div>
    </div>
</template>
<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './css/index.css';

export default {
    name: 'cloudv-map',
    props: {
        server: {
            type: String,
            require: true,
            default: '',
        },
        raster: {
            type: String,
            require: true,
            default: '',
        },
        markers: {
            type: Array,
            require: false,
            default: null,
        },
        layers: {
            type: Array,
            require: false,
            default: null,
        },
        polygons: {
            type: Object,
            require: false,
            default: null,
        },
        fullScreen: {
            type: Boolean,
            require: false,
            default: false,
        },
    },
    computed: {
        attributes() {
            return {
                server: this.server,
                raster: this.raster,
                markers: this.markers,
                polygons: this.polygons,
                layers: this.layers,
                fullScreen: this.fullScreen,
            };
        },
    },
    watch: {
        attributes: {
            immediate: true,
            deep: true,
            async handler(val) {
                const {
                    server, raster, markers, polygons, layers, fullScreen,
                } = val;
                // 初始化栅格图层
                this.map = await this.initMapWithMeta({ server, raster, map: this.map });
                // 添加全屏控件
                this.addFullScreenControls({ fullScreen, map: this.map });
                // 添加点
                this.addMarkers({ markers, map: this.map });
                // 添加面
                this.addPologons({ polygons, map: this.map });
                // 添加矢量图层
                this.addVectorLayers({ layers, map: this.map });
            },
        },
    },
    mounted() {
    },
    methods: {
        /**
         * 获取元数据
         */
        async getLayerMeta(url) {
            // 获取图层元数据
            return axios.get(url)
                .then((response) => {
                    // 处理成功情况
                    console.log(response);
                    // 获取边界坐标
                    const meta4326 = response.data.GeoServerLayer.gridSubsets.find((item) => item.gridSetName === 'EPSG:4326');
                    const meta3857 = response.data.GeoServerLayer.gridSubsets.find((item) => item.gridSetName === 'EPSG:3857');
                    const { maxCachedLevel, minCachedLevel } = meta3857;
                    const { coords } = meta4326.extent;
                    const lat = (Number(coords[0]) + Number(coords[2])) / 2;
                    const lng = (Number(coords[1]) + Number(coords[3])) / 2;
                    const center = [lat, lng];
                    return {
                        coords, center, maxCachedLevel, minCachedLevel,
                    };
                })
                .catch((error) => {
                    // 处理错误情况
                    console.log(error);
                });
        },
        /**
         * 初始化地图
         */
        initMap(layerUrl, center) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VnZWppeGlhbmciLCJhIjoiY2s1M3B1eTQwMGI3MTNlbnRyOHJ3NGd5biJ9.3Gaar6R0HU4QQ1z1QUREVA';
            const map = new mapboxgl.Map({
                container: 'map',
                style: {
                    version: 8,
                    sources: {
                        'raster-tiles': {
                            type: 'raster',
                            tiles: [layerUrl],
                            tileSize: 256,
                        },
                    },
                    layers: [
                        {
                            id: 'simple-tiles',
                            type: 'raster',
                            source: 'raster-tiles',
                            minzoom: 17,
                            maxzoom: 20,
                        },
                    ],
                },
                center, // [104.1817300545029, 30.46695493949965]
                zoom: 17,
            });
            return map;
        },
        /**
         * 通过元数据初始化图层
         */
        async initMapWithMeta({ server, raster, map }) {
            if (map || !server || !raster) {
                return undefined;
            }
            const [getLayerUrl, layerUrl] = [`${server}/gwc/rest/layers/${raster}`, `${server}/gwc/service/wmts?REQUEST=GetTile&VERSION=1.0.0&LAYER=${raster}&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=image/png&TILECOL={x}&TILEROW={y}`];
            const {
                coords, center, maxCachedLevel, minCachedLevel,
            } = await this.getLayerMeta(getLayerUrl);
            console.info(coords, center, maxCachedLevel, minCachedLevel);
            return this.initMap(layerUrl, center);
        },
        /**
         * 添加全屏标签
         */
        addFullScreenControls({ fullScreen, map }) {
            if (!map || !fullScreen) {
                return;
            }
            this.map.addControl(new mapboxgl.FullscreenControl());
        },
        /**
         * 添加坐标点
         */
        addMarkers({ markers, map }) {
            if (!map || !markers.length) {
                return;
            }
            markers.forEach((marker) => {
                const el = document.createElement('div');
                el.className = 'cloudv-map-marker';
                el.innerText = marker.properties.text;
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(this.map);
            });
            console.info(markers);
        },
        /**
         * 添加面
         */
        addPologons({ polygons, map }) {
            if (!map || !polygons) {
                return;
            }
            map.on('load', () => {
                map.addSource('polygons', {
                    type: 'geojson',
                    data: polygons,
                });
                map.addLayer({
                    id: 'polygons-fill',
                    // References the GeoJSON source defined above
                    // and does not require a `source-layer`
                    source: 'polygons',
                    type: 'fill', // reference the data source
                    layout: {},
                    paint: {
                        'fill-color': '#0080ff', // blue color fill
                        'fill-opacity': 0.7,
                    },
                });
                map.addLayer({
                    id: 'polygons-outline',
                    source: 'polygons',
                    type: 'line',
                    layout: {},
                    paint: {
                        'line-color': '#fff',
                        'line-width': 2,
                    },
                });
            });
        },
        /**
         * TODO:添加矢量图层
         */
        addVectorLayers({ layers, map }) {
            if (!map) {
                return;
            }

            console.info(layers);
        },
    },
};
</script>
<style lang="css">
.mapboxgl-ctrl-bottom-left div{
  display:none !important;
}
</style>
