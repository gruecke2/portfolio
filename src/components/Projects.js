import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      showingProjects: 3,
      totalProjects: 3
    };
    this.loadMoreClick = this.loadMoreClick.bind(this);
    this.collapseProjectPaneClick = this.collapseProjectPaneClick.bind(this);
  }

  loadMoreClick() {
    this.setState({
      showingProjects:
        this.state.showingProjects >= this.props.resumeProjects.length
          ? this.state.showingProjects
          : this.state.showingProjects + 3,
    });
  }

  collapseProjectPaneClick() {
    this.setState({
      showingProjects: 3,
    });
  }

  moreThanThreeProjects() {
    return this.state.showingProjects > 3;
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      var projects = this.props.resumeProjects
        .slice(0, this.state.showingProjects)
        .map(function (projects) {
          return (
            <div
              //TODO: load more projects, collapse expanded section button
              className="col-sm-12 col-md-6 col-lg-4"
              key={projects.title}
              style={{ cursor: "pointer" }}
            >
              <span className="portfolio-item d-block">
                <div
                  className="foto"
                  onClick={() => detailsModalShow(projects)}
                >
                  <div>
                    <img
                      src={projects.images[0]}
                      alt="projectImages"
                      height="230"
                      style={{
                        marginBottom: 0,
                        paddingBottom: 0,
                        position: "relative",
                      }}
                    />
                    <span className="project-date">{projects.startDate}</span>
                    <br />
                    <p className="project-title-settings mt-3">
                      {projects.title}
                    </p>
                  </div>
                </div>
              </span>
            </div>
          );
        });
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto projects-pane">
            <div className="row mx-auto">{projects}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
        <div className="col-md-12 text-center">
          {this.state.totalProjects > 3 && (
          <Button className="btn btn-info" onClick={this.loadMoreClick}>
            Show More
          </Button>
          )}
          {this.moreThanThreeProjects() && (
            <Button
              className="ml-3 btn btn-danger btn-sm"
              onClick={this.collapseProjectPaneClick}
            >
              X
            </Button>
          )}
        </div>
      </section>
    );
  }
}

export default Projects;
