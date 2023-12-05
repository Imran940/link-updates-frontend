import React, { useEffect } from "react";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getToken } from "firebase/messaging";
import { app, messaging } from "../../firebase.js";
import { saveTokenForNotiification } from "../../functions/user.js";

export default function About() {
  const {
    email,
    token,
    notify_links: { link, facebook_link, instagram_link, twitter_link } = {},
  } = useSelector((state) => state.auth);

  console.log({ token });
  useEffect(() => {
    if (navigator.serviceWorker && !token) {
      navigator.serviceWorker
        .register("firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Registered Successfully");
          Notification.requestPermission().then((permission) => {
            if (permission == "granted" && !token) {
              console.log("granted");
              getToken(messaging, {
                vapidKey:
                  "BJtBH7Bh6VmG0GVMkYBmNB67TdxW3vmLTbW6vxubL3hmHOXRBbqMVjVGhLF8JHjkl1FXudwCRFHCdvOlDSI_OLk",
              })
                .then(async (token) => {
                  //here we got the client token, we need to save this token on db so that we can use it on the server when
                  // sending messages
                  await saveTokenForNotiification({ token, email });
                  alert("Notification set successfully");
                  console.log(token);
                })
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((err) => console.log("Registeration Error", err));
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="border-2 rounded-md p-2 text-center md: w-1/2">
        {link ? (
          <a target="_blank" href={link} className="text-red-600 animate-pulse">
            Click here to visit new update
          </a>
        ) : (
          "No update from the admin"
        )}
      </div>
      <div className=" border-2  w-[400px] p-5 mx-auto rounded-lg">
        <div className="social-section flex flex-row content-center justify-start  gap-2  items-center mb-5">
          <div className="social-icon ">
            <FaFacebook className="text-xl text-[#3b5998]" />
          </div>

          <div className="social-text">
            {facebook_link ? (
              <a
                href={facebook_link}
                target="_blank"
                className="text-lg capitalize  text-[#3b5998] "
              >
                Click here to visit the link on facebook
              </a>
            ) : (
              "No link for the facebook"
            )}
          </div>
        </div>

        <div className="social-section flex flex-row content-center justify-start  gap-2  items-center  mb-5">
          <div className="social-icon">
            <FaTwitter className="text-xl text-[#00acee]" />
          </div>

          <div className="social-text">
            {twitter_link ? (
              <a
                href={twitter_link}
                target="_blank"
                className="text-lg capitalize text-[#00acee] "
              >
                Click here to visit the link on twitter
              </a>
            ) : (
              "No link for the twitter"
            )}
          </div>
        </div>

        <div className="social-section flex flex-row content-center justify-start   gap-2  items-center mb-5">
          <div className="social-icon">
            <FaInstagramSquare className="text-xl text-[#e95950]" />
          </div>

          <div className="social-text">
            {instagram_link ? (
              <a
                href={instagram_link}
                target="_blank"
                className="text-lg capitalize text-[#e95950]"
              >
                Click here to visit the link on instagram
              </a>
            ) : (
              "No link for the instagram"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
