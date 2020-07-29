import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
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
    const {offers} = this.props;
    this._markers = leaflet.layerGroup().addTo(this._map);

    offers.forEach((item) => {
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
      <section ref={this.sectiontRef} id="map" className="cities__map map"></section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired,
    maxAdults: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
};

export default Map;
