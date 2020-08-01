export const userData = (data) => {
  return {
    avatar: data.avatar_url,
    mail: data.email,
    id: data.id,
    isPro: data.is_pro,
    name: data.name
  };
};
