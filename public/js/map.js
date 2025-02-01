	mapboxgl.accessToken = mapToken;
    coordinates = JSON.parse(coordinates);
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
    console.log("coodinates updated without json.stringify ", coordinates);

    // Set marker options.
    const marker = new mapboxgl.Marker({
        color: "#E82561",
    }).setLngLat(coordinates)
     .setPopup( new mapboxgl.Popup({offset: 20}).setHTML("<p>You can zoom it for convenience</p>"))
    .addTo(map);

