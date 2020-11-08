import React from 'react';
import logo from './logo.svg';
import './App.css';

import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {Libraries} from "@react-google-maps/api/dist/utils/make-load-script-url";
import Mapstyles from "./MapStyles"

const libraries: Libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

const mapCenter = {
    lat: 6.927079,
    lng: 79.861244
}

const options = {
    styles: Mapstyles,
    disableDefaultUI: true,
    zoomControl: true

}

interface Imarker {
    lat: number,
    lng: number,
    time: any
}


export default function App(): JSX.Element {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyAE0DYz-oyNFJnEZM0mU7K1ZBpOQ2MygCo",
        libraries
    });

    const [marker, setMarker] = React.useState<Imarker[]>([]);

    if (loadError) return <div>erro</div>;
    if (!isLoaded) return <div>loading ffff</div>;


    return <div className="App">
        <h1>Wine Shop Locator </h1>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={mapCenter} options={options}
                   onClick={(e) => {
                       setMarker(current => [...current, {
                           lat: e.latLng.lat(),
                           lng: e.latLng.lng(),
                           time: new Date()
                       }
                       ])
                   }}>

            {marker.map(marker =>
                <Marker key={marker.time} position={{lat: marker.lat, lng: marker.lng}}  icon={{url:"/gal.png", }}/>
            )}
        </GoogleMap>

    </div>;
}


