import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAds } from "../../../context/adsContext";
import { useFavorites } from "../../../context/favoritContext";
import { useUser } from "../../../context/userContext";
import UserView from "../../moleculas/UserView";

function Profile(pops) {
  const { isLogged, user } = useUser();
  const { userAdverts } = useAds();
  const { favoriteAds } = useFavorites();
  const [publishedAdverts, setPublishedAdverts] = useState([]);
  console.log(userAdverts)

  useEffect(() => {
    setPublishedAdverts(
      userAdverts.filter((advert) => advert.isPublished === true)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAdverts]);

  if (!isLogged) return <Redirect to="/ingresa" />;
  return (
    <UserView
      user={user}
      favoriteAds={favoriteAds}
      publishedAdverts={publishedAdverts}
      userAdverts={userAdverts}
    />
  );
}

export default Profile;
