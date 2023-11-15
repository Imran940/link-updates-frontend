import React from "react";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function About() {
  const {
    notify_links: { link, facebook_link, instagram_link, twitter_link } = {},
  } = useSelector((state) => state.auth);
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
