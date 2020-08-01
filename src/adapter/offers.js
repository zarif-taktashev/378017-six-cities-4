const offerAdapter = (offer) => {
  return {
    bedrooms: offer.bedrooms,
    city: {
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom
      },
      name: offer.city.name
    },
    description: offer.description,
    goods: offer.goods,
    host: {
      avatarUrl: offer.host.avatar_url,
      id: offer.host.id,
      isPro: offer.host.is_pro,
      name: offer.host.name
    },
    id: offer.id,
    images: offer.images,
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom
    },
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    type: offer.type,
  };
};

const postAdapter = (offer) => {
  return {
    "bedrooms": offer.bedrooms,
    "city": {
      "location": {
        "latitude": offer.city.location.latitude,
        "longitude": offer.city.location.longitude,
        "zoom": offer.city.location.zoom
      },
      "name": offer.city.name
    },
    "description": offer.description,
    "goods": offer.goods,
    "host": {
      "avatar_url": offer.host.avatarUrl,
      "id": offer.host.id,
      "is_pro": offer.host.isPro,
      "name": offer.host.name
    },
    "id": offer.id,
    "images": offer.images,
    "is_favorite": offer.isFavorite,
    "is_premium": offer.isPremium,
    "location": {
      "latitude": offer.location.latitude,
      "longitude": offer.location.longitude,
      "zoom": offer.location.zoom
    },
    "max_adults": offer.maxAdults,
    "preview_image": offer.previewImage,
    "price": offer.price,
    "rating": offer.rating,
    "title": offer.title,
    "type": offer.type,
  };
};

export {offerAdapter, postAdapter};
