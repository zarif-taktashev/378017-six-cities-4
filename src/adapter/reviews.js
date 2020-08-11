export const reviewModel = (data) => {
  return {
    id: data.id,
    user: {
      avatar: data.user.avatar_url,
      id: data.user.id,
      super: data.user.is_pro,
      name: data.user.name
    },
    rating: data.rating,
    date: data.date,
    comment: data.comment,
  };
};
