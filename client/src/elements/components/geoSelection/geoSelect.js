import React, { useEffect } from 'react';
import './geoSelect.css';

function GeoSelect99() {
    useEffect(() => {
        function initMap() {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 40.749933, lng: -73.98633 },
                zoom: 13,
                mapTypeControl: false,
            });
            const card = document.getElementById("pac-card");
            const input = document.getElementById("pac-input");
            const biasInputElement = document.getElementById("use-location-bias");
            const strictBoundsInputElement = document.getElementById("use-strict-bounds");
            const options = {
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: false,
            };

            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(card);

            const autocomplete = new window.google.maps.places.Autocomplete(input, options);

            autocomplete.bindTo("bounds", map);

            const infowindow = new window.google.maps.InfoWindow();
            const infowindowContent = document.getElementById("infowindow-content");

            infowindow.setContent(infowindowContent);

            const marker = new window.google.maps.Marker({
                map,
                anchorPoint: new window.google.maps.Point(0, -29),
            });

            autocomplete.addListener("place_changed", () => {
                infowindow.close();
                marker.setVisible(false);

                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                infowindowContent.children["place-name"].textContent = place.name;
                infowindowContent.children["place-address"].textContent = place.formatted_address;
                infowindow.open(map, marker);
            });

            // ... (rest of the JavaScript logic)
        }

        // Load the Google Maps Places Autocomplete script
        const script = document.createElement('script');
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly&callback=initMap`;
        script.defer = true;
        document.head.appendChild(script);

    }, []);

    return (
        <div className="GoogSearch">
            <div className="pac-card" id="pac-card">
                <div>
                    <div id="title">Autocomplete search</div>
                    <div id="type-selector" className="pac-controls">
                        {/* ... (radio inputs and labels) */}
                    </div>
                    <br />
                    <div id="strict-bounds-selector" className="pac-controls">
                        {/* ... (checkbox inputs and labels) */}
                    </div>
                </div>
                <div id="pac-container">
                    <input id="pac-input" type="text" placeholder="Enter a location" />
                </div>
            </div>
            <div id="map"></div>
            <div id="infowindow-content">
                <span id="place-name" className="title"></span><br />
                <span id="place-address"></span>
            </div>
        </div>
    );
}

export default GeoSelect99;
