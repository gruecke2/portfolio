import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ProjectDetailsModal from "./ProjectDetailsModal";

const Projects = ({ resumeProjects, resumeBasicInfo }) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showingProjects, setShowingProjects] = useState(3);

  console.log('resumeProjects', resumeProjects)
  console.log('resumeBasicInfo', resumeBasicInfo)

  // Derived values
  const totalProjects = resumeProjects?.length || 0;
  const sectionName = resumeBasicInfo?.section_name?.projects || "Projects";

  function importAll(r) {
    return r.keys().map(r);
  }
  const projectImages = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
  console.log('projectImages', projectImages)

  const handleLoadMoreClick = () => {
    setShowingProjects(prev => 
      prev >= totalProjects ? prev : prev + 3
    );
  };


  const handleCollapseProjectPane = () => {
    setShowingProjects(3);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setDetailsModalShow(true);
  };

  const handleModalClose = () => {
    setDetailsModalShow(false);
    setSelectedProject(null);
  };

  // Early return if no projects
  if (!resumeProjects || resumeProjects.length === 0) {
    return null;
  }

  // Render projects
  const projectCards = resumeProjects
    .slice(0, showingProjects)
    .map((project) => (
      <div
        className="col-sm-12 col-md-6 col-lg-4"
        key={project.title}
        style={{ cursor: "pointer" }}
      >
        <span className="portfolio-item d-block">
          <div
            className="foto"
            onClick={() => handleProjectClick(project)}
          >
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/${project.images[0]}`}
                alt="projectImages"
                height="230"
                style={{
                  marginBottom: 0,
                  paddingBottom: 0,
                  position: "relative",
                }}
              />
              <span className="project-date">{project.startDate}</span>
              <br />
              <p className="project-title-settings mt-3">
                {project.title}
              </p>
            </div>
          </div>
        </span>
      </div>
    ));

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto projects-pane">
          <div className="row mx-auto">{projectCards}</div>
        </div>
        
        {selectedProject && (
          <ProjectDetailsModal
            show={detailsModalShow}
            onHide={handleModalClose}
            data={selectedProject}
          />
        )}
      </div>
      
      <div className="col-md-12 text-center">
        {totalProjects > 3 && (
          <Button 
            className="btn btn-info" 
            onClick={handleLoadMoreClick}
          >
            Show More
          </Button>
        )}
        
        {showingProjects > 3 && (
          <Button
            className="ml-3 btn btn-danger btn-sm"
            onClick={handleCollapseProjectPane}
          >
            X
          </Button>
        )}
      </div>
    </section>
  );
};

export default Projects;
