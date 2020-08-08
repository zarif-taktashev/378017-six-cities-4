export const reviewModel = (data) => {
  return {
    id: data.id,
    user: {
      avatar: data.user.useravatar_url,
      id: data.user.commentuserid,
      super: data.user.useris_pro,
      name: data.user.username
    },
    rating: data.rating,
    date: data.date,
    comment: data.comment,
  };
};
