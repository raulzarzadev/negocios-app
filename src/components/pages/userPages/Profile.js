import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useFavorites } from "../../../context/favoritContext";
import { useUser } from "../../../context/userContext";
import UserView from "../../moleculas/UserView";

export default function NewUser(pops) {
  const { isLogged, user } = useUser();
  const { favoriteAds } = useFavorites();
  const [publishedAdverts, setPublishedAdverts] = useState([]);
  const [adverts] = useState(user.adverts || []);

  useEffect(() => {
    setPublishedAdverts(
      adverts.filter((advert) => advert.isPublished === true)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isLogged) return <Redirect to="/ingresa" />;
  return (
    <UserView
      user={user}
      favoriteAds={favoriteAds}
      publishedAdverts={publishedAdverts}
      advertsCreated={user?.adverts}
    />
  );
}
