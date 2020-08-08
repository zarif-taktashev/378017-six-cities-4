import React, {PureComponent} from "react";
import leaflet from "leaflet";
import {offerProp} from "../../const.js";

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 30]
});

const activeMarker = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [20, 30]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.sectiontRef = React.createRef();
    this._map = null;
    this._markers = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offers[0].city.name !== this.props.offers[0].city.name) {
      this.viewCenterCity();
      this.renderPins();
    }

    if (prevProps.offer && prevProps.offer.id !== this.props.offer.id) {
      this._markers.clearLayers();
      this.renderPins();
    }

    if (prevProps.offer && this.props.offers.every((item) => item.id !== prevProps.offer.id)) {
      this._markers.clearLayers();
      this.renderPins();
    }
  }

  viewCenterCity() {
    const {offers} = this.props;
    const firstOffer = offers[0];
    const city = [firstOffer.city.location.latitude, firstOffer.city.location.longitude];

    const zoom = firstOffer.city.location.zoom;
    this._map.setView(city, zoom);
  }

  componentDidMount() {
    this.renderMap();
  }

  componentWillUnmount() {
    this._map = null;
  }

  renderPins() {
    const {offers, offer} = this.props;
    this._markers = leaflet.layerGroup().addTo(this._map);
    if (offer) {
      const coordinates = [offer.location.latitude, offer.location.longitude];
      leaflet.marker(coordinates, {activeMarker}).addTo(this._markers);
    }

    offers.forEach((item) => {
      if (offer && offer.id === item.id) {
        const coordinates = [item.location.latitude, item.location.longitude];
        leaflet.marker(coordinates, {activeMarker}).addTo(this._markers);
        return;
      }

      const coordinates = [item.location.latitude, item.location.longitude];
      leaflet.marker(coordinates, {icon}).addTo(this._markers);
    });

    leaflet.layerGroup(this._markers);
  }

  renderMap() {
    const firstOffer = this.props.offers[0];
    const city = [firstOffer.city.location.latitude, firstOffer.city.location.longitude];

    const zoom = firstOffer.city.location.zoom;
    this._map = leaflet.map(this.sectiontRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true,
      scrollWheelZoom: false
    });

    this._map.setView(city, zoom);
    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);

    this.renderPins();
  }

  render() {
    return (
      <section ref={this.sectiontRef} id="map" className="property__map map"></section>
    );
  }
}

Map.propTypes = {
  offer: offerProp.HoverOffer,
  offers: offerProp.offers
};

export default Map;
