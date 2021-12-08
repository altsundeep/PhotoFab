import React from "react";
import { useLocation } from "react-router";
import styles from "./User.module.css";

export const User = () => {
  const { state } = useLocation();

  const { username, total_photos, bio, profile_image, total_likes, name } =
    state;
  console.log(state);

  return (
    <div className={styles.user}>
      <img
        className={styles.userpic}
        src={profile_image.medium}
        alt={username}
      />
      <div class={styles.u_data}>
        <h2>{name}</h2>
        <h2>{username}</h2>
        <div className={styles.d1a}>
          <span>
            <span className={styles.s1a}>Photos:</span>
            {total_photos}
          </span>

          <span>
            <span className={styles.s2a}>Likes: </span> {total_likes}
          </span>
        </div>

        <p>
          {" "}
          <span className={styles.about_heading}>About me: </span>
          {bio}
        </p>
      </div>
    </div>
  );
};
