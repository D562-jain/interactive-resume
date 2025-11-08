import React, { useState } from "react";

const ProjectsSection = ({
  projects,
  expanded,
  onToggle,
  selectedSkills,
  onSkillClick,
}) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  if (!expanded) return null;

  return (
    <section className="projects-section">
      <div className="section-content">
        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects match your current filters.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div
                  className="project-header"
                  onClick={() => toggleProject(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === "Enter" && toggleProject(project.id)
                  }
                  aria-expanded={expandedProject === project.id}
                >
                  <h3>{project.name}</h3>
                  <span className="expand-icon" aria-hidden="true">
                    {expandedProject === project.id ? "−" : "+"}
                  </span>
                </div>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`skill-tag ${
                        selectedSkills.includes(tech) ? "highlighted" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSkillClick(tech);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter") onSkillClick(tech);
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="project-description">{project.description}</p>

                {expandedProject === project.id && (
                  <div className="project-details">
                    {project.features && (
                      <div className="project-features">
                        <h4>Key Features:</h4>
                        <ul>
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="project-links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                        >
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
