import React from "react";
import { Icon } from "@iconify/react";
import angularIcon from "@iconify/icons-logos/angular-icon";
import reactIcon from "@iconify/icons-logos/react";
import vueIcon from "@iconify/icons-logos/vue";
import myProfilePic from "../assets/images/myProfile.jpg";


const About = (props) => {
  const { sharedBasicInfo, resumeBasicInfo } = props;

  let profilepic, sectionName, hello, about;

  if (sharedBasicInfo) {
    profilepic = "images/" + sharedBasicInfo.image;
  }
  if (resumeBasicInfo) {
    sectionName = resumeBasicInfo.section_name.about;
    hello = resumeBasicInfo.description_header;
    about = resumeBasicInfo.description;
  }

  return (
    <section id="about">
      <div className="col-md-12">
        <h1 style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="polaroid">
              <span style={{ cursor: "auto" }}>
                <img src={"./images/myProfile.jpg"} alt="Avatar placeholder 2" />
                <Icon
                  icon={angularIcon}
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon={reactIcon}
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon={vueIcon}
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
              </span>
            </div>
          </div>

          <div className="col-md-8 center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br />
                  <span className="wave">{hello} :) </span>
                  <br />
                  <br />
                  {about}
                  <br />
                  <br />
                  <div className="resume-button-container">
                    <p>Feel free to grab a copy of my resume here!</p>
                    <a href={resumeBasicInfo?.resume_url} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-primary">Download Resume</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
