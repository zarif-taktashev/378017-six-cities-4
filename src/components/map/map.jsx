import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.sectiontRef = React.createRef();
  }

  componentDidMount() {
    if (this.sectiontRef.current) {
      const city = [52.38333, 4.9];

      const icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      });

      const zoom = 12;
      const map = leaflet.map(this.sectiontRef.current, {
        center: city,
        zoom,
        zoomControl: false,
        marker: true
      });

      leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

      map.setView(city, zoom);

      for (let i = 0; i < this.props.offers.length; i++) {
        leaflet
        .marker(this.props.offers[i].coordinates, {icon})
        .addTo(map);
      }
    }
  }

  render() {
    return (
      <section ref={this.sectiontRef} id="map" className="cities__map map"></section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    costs: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  })).isRequired
};

export default Map;
