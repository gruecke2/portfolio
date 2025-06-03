import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import ProjectDetailsModal from "./ProjectDetailsModal";

const Projects = ({ resumeProjects, resumeBasicInfo }) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showingProjects, setShowingProjects] = useState(3);
  // prevShowingProjects stores the count *before* an expand/collapse action
  const [prevShowingProjects, setPrevShowingProjects] = useState(3);

  const projectsPaneRef = useRef(null);
  const projectsContentRef = useRef(null);

  console.log('resumeProjects', resumeProjects)
  console.log('resumeBasicInfo', resumeBasicInfo)

  const totalProjects = resumeProjects?.length || 0;
  const sectionName = resumeBasicInfo?.section_name?.projects || "Projects";

  // Effect for animating pane height
  useEffect(() => {
    if (projectsPaneRef.current && projectsContentRef.current) {
      const contentHeight = projectsContentRef.current.scrollHeight; // Current height of rendered items

      if (showingProjects > prevShowingProjects) { // Expanding
        const currentMaxHeightBeforeExpand = projectsPaneRef.current.style.maxHeight;
        // Temporarily remove max-height to measure the full potential height of the new content
        projectsPaneRef.current.style.maxHeight = 'none';
        const newScrollHeight = projectsContentRef.current.scrollHeight;
        // Restore previous max-height to start transition from (or '0px' if it was initial)
        projectsPaneRef.current.style.maxHeight = currentMaxHeightBeforeExpand || '0px';
        // Force browser to recognize the starting max-height
        // eslint-disable-next-line no-unused-expressions
        projectsPaneRef.current.offsetHeight;
        // Set new max-height to trigger CSS transition
        projectsPaneRef.current.style.maxHeight = `${newScrollHeight}px`;
      } else if (showingProjects < prevShowingProjects) { // Collapsing
        // On collapse, handleCollapseProjectPane has already set maxHeight to current scrollHeight.
        // The content has now shrunk due to setShowingProjects(3).
        // So, we just set maxHeight to the new (smaller) contentHeight.
        projectsPaneRef.current.style.maxHeight = `${contentHeight}px`;
      } else if (showingProjects === prevShowingProjects && (!projectsPaneRef.current.style.maxHeight || projectsPaneRef.current.style.maxHeight === '0px') && totalProjects > 0) {
        // Initial load: if max-height isn't set (or is 0px from a previous full collapse) and projects exist
        // Set max-height to content height of initially shown items.
        projectsPaneRef.current.style.maxHeight = `${contentHeight}px`;
      }
    }
  }, [showingProjects, prevShowingProjects, resumeProjects, totalProjects]); // Dependencies for the animation effect

  const handleLoadMoreClick = () => {
    setPrevShowingProjects(showingProjects); // Capture current count before changing
    setShowingProjects(prev =>
      prev >= totalProjects ? prev : prev + 3
    );
  };
  
  const handleCollapseProjectPane = () => {
    setPrevShowingProjects(showingProjects);
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

  if (!resumeProjects || resumeProjects.length === 0) {
    return null;
  }

  const projectCards = resumeProjects
    .slice(0, showingProjects)
    .map((project, index) => {
      const isNewCard = index >= prevShowingProjects && showingProjects > prevShowingProjects;
      const animationDelay = isNewCard ? `${(index - prevShowingProjects) * 0.2}s` : '0s';
      
      let cardClasses = "col-sm-12 col-md-6 col-lg-4";
      if (isNewCard) {
        cardClasses += " project-card-enter";
      }

      return (
        <div
          className={cardClasses}
          key={project.title}
          style={{
            cursor: "pointer",
            animationDelay: isNewCard ? animationDelay : undefined,
          }}
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
                  loading="eager"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '300px',
                    objectFit: 'contain',
                    position: 'relative',
                    marginBottom: 0,
                    paddingBottom: 0,
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
      );
    });

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto projects-pane" ref={projectsPaneRef}>
          <div className="row mx-auto justify-content-center" ref={projectsContentRef}>{projectCards}</div>
        </div>
        
        {selectedProject && (
          <ProjectDetailsModal
            show={detailsModalShow}
            onHide={handleModalClose}
            data={selectedProject}
          />
        )}
      </div>
      
      <div className="col-md-12 text-center projects-button-container">
        {totalProjects > 3 && showingProjects < totalProjects && (
          <Button
            className="btn btn-info btn-lg" // Preserving your btn-lg class
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
