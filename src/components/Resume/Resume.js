import React, { useState, useMemo } from "react";
import { useAuth } from "../ProtectedRoute/AuthContext";
import { useNavigate } from "react-router-dom";
import resumeData from "../../data/resume.json";
import ProjectsSection from "./ProjectsSection";
import "../Resume/Resume.css";

const Resume = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // State for interactive features
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  // Toggle skill filter
  const toggleSkillFilter = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Get all unique skills from experience and projects
  const allSkills = useMemo(() => {
    const skills = new Set();
    resumeData.experience.forEach((exp) => {
      exp.skills.forEach((skill) => skills.add(skill));
    });
    resumeData.skills.forEach((category) => {
      category.items.forEach((skill) => skills.add(skill));
    });
    // Add project technologies
    resumeData.projects?.forEach((project) => {
      project.technologies.forEach((tech) => skills.add(tech));
    });
    return Array.from(skills).sort();
  }, []);

  // Filter experience based on selected skills and search term
  const filteredExperience = useMemo(() => {
    return resumeData.experience.filter((exp) => {
      // Filter by selected skills
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => exp.skills.includes(skill));

      // Filter by search term
      const matchesSearch =
        !searchTerm ||
        exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesSkills && matchesSearch;
    });
  }, [selectedSkills, searchTerm]);

  // Filter projects based on selected skills
  const filteredProjects = useMemo(() => {
    if (!resumeData.projects) return [];

    return resumeData.projects.filter((project) => {
      return (
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => project.technologies.includes(skill))
      );
    });
  }, [selectedSkills]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedSkills([]);
    setSearchTerm("");
  };

  return (
    <div className="resume-container">
      <header className="resume-header">
        <div className="container">
          <div className="header-content">
            <h1>Interactive Resume</h1>
            <div className="header-actions">
              <button onClick={handleDownloadPDF} className="btn btn-primary">
                Download PDF
              </button>
              <button onClick={handleLogout} className="btn btn-danger">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Controls */}
      <section className="controls-section">
        <div className="container">
          <div className="controls-grid">
            {/* Search Bar */}
            <div className="search-control">
              <input
                type="text"
                placeholder="Search roles, companies, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search resume content"
              />
            </div>

            {/* View Toggle */}
            <div className="view-control">
              <button
                className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
                aria-pressed={viewMode === "cards"}
              >
                Cards
              </button>
              <button
                className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                aria-pressed={viewMode === "table"}
              >
                Table
              </button>
            </div>

            {/* Clear Filters */}
            {(selectedSkills.length > 0 || searchTerm) && (
              <button onClick={clearFilters} className="btn btn-secondary">
                Clear Filters
              </button>
            )}
          </div>

          {/* Skill Filters */}
          <div className="skills-filter">
            <h3>Filter by Skills:</h3>
            <div className="skill-chips">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  className={`skill-chip ${
                    selectedSkills.includes(skill) ? "active" : ""
                  }`}
                  onClick={() => toggleSkillFilter(skill)}
                  aria-pressed={selectedSkills.includes(skill)}
                >
                  {skill}
                  {selectedSkills.includes(skill) && " ✓"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="resume-main">
        <div className="container">
          <div className="resume-content">
            {/* Personal Info Section */}
            <section className="personal-info-section">
              <div
                className="section-header clickable"
                onClick={() => toggleSection("personal")}
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && toggleSection("personal")
                }
                aria-expanded={expandedSections.personal !== false}
              >
                <h2>Personal Information</h2>
                <span className="expand-icon" aria-hidden="true">
                  {expandedSections.personal ? "−" : "+"}
                </span>
              </div>
              {expandedSections.personal !== false && (
                <div className="section-content">
                  <div className="personal-info-grid">
                    <div className="info-item">
                      <strong>Name:</strong>
                      <span>{resumeData.personalInfo.name}</span>
                    </div>
                    <div className="info-item">
                      <strong>Title:</strong>
                      <span>{resumeData.personalInfo.title}</span>
                    </div>
                    <div className="info-item">
                      <strong>Email:</strong>
                      <span>{resumeData.personalInfo.email}</span>
                    </div>
                    <div className="info-item">
                      <strong>Phone:</strong>
                      <span>{resumeData.personalInfo.phone}</span>
                    </div>
                    <div className="info-item">
                      <strong>Location:</strong>
                      <span>{resumeData.personalInfo.location}</span>
                    </div>
                  </div>
                  <div className="summary">
                    <p>{resumeData.personalInfo.summary}</p>
                  </div>
                </div>
              )}
            </section>

            {/* Experience Section */}
            <section className="experience-section">
              <div
                className="section-header clickable"
                onClick={() => toggleSection("experience")}
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && toggleSection("experience")
                }
                aria-expanded={expandedSections.experience !== false}
              >
                <h2>
                  Work Experience
                  {filteredExperience.length !== resumeData.experience.length &&
                    ` (${filteredExperience.length}/${resumeData.experience.length})`}
                </h2>
                <span className="expand-icon" aria-hidden="true">
                  {expandedSections.experience ? "−" : "+"}
                </span>
              </div>

              {expandedSections.experience !== false && (
                <div className="section-content">
                  {filteredExperience.length === 0 ? (
                    <div className="empty-state">
                      <p>No experience matches your current filters.</p>
                      <button
                        onClick={clearFilters}
                        className="btn btn-primary"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : viewMode === "cards" ? (
                    <div className="timeline">
                      {filteredExperience.map((exp) => (
                        <div key={exp.id} className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3>{exp.role}</h3>
                            <h4>{exp.company}</h4>
                            <p className="timeline-period">{exp.period}</p>
                            <p className="timeline-description">
                              {exp.description}
                            </p>
                            <div className="skill-tags">
                              {exp.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className={`skill-tag ${
                                    selectedSkills.includes(skill)
                                      ? "highlighted"
                                      : ""
                                  }`}
                                  onClick={() => toggleSkillFilter(skill)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyPress={(e) =>
                                    e.key === "Enter" &&
                                    toggleSkillFilter(skill)
                                  }
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="table-view">
                      <table className="experience-table">
                        <thead>
                          <tr>
                            <th>Role</th>
                            <th>Company</th>
                            <th>Period</th>
                            <th>Skills</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredExperience.map((exp) => (
                            <tr key={exp.id}>
                              <td>
                                <strong>{exp.role}</strong>
                                <p className="table-description">
                                  {exp.description}
                                </p>
                              </td>
                              <td>{exp.company}</td>
                              <td>{exp.period}</td>
                              <td>
                                <div className="skill-tags">
                                  {exp.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className={`skill-tag ${
                                        selectedSkills.includes(skill)
                                          ? "highlighted"
                                          : ""
                                      }`}
                                      onClick={() => toggleSkillFilter(skill)}
                                      role="button"
                                      tabIndex={0}
                                      onKeyPress={(e) =>
                                        e.key === "Enter" &&
                                        toggleSkillFilter(skill)
                                      }
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Education Section */}
            <section className="education-section">
              <div
                className="section-header clickable"
                onClick={() => toggleSection("education")}
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && toggleSection("education")
                }
                aria-expanded={expandedSections.education !== false}
              >
                <h2>Education</h2>
                <span className="expand-icon" aria-hidden="true">
                  {expandedSections.education ? "−" : "+"}
                </span>
              </div>
              {expandedSections.education !== false && (
                <div className="section-content">
                  <div className="education-grid">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="education-card">
                        <h3>{edu.institution}</h3>
                        <p className="education-degree">{edu.degree}</p>
                        <p className="education-period">{edu.period}</p>
                        {edu.gpa && (
                          <p className="education-gpa">
                            <strong>GPA:</strong> {edu.gpa}
                          </p>
                        )}
                        {edu.achievements && (
                          <ul className="achievements-list">
                            {edu.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Skills Section */}
            <section className="skills-section">
              <div
                className="section-header clickable"
                onClick={() => toggleSection("skills")}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && toggleSection("skills")}
                aria-expanded={expandedSections.skills !== false}
              >
                <h2>Skills</h2>
                <span className="expand-icon" aria-hidden="true">
                  {expandedSections.skills ? "−" : "+"}
                </span>
              </div>
              {expandedSections.skills !== false && (
                <div className="section-content">
                  <div className="skills-grid">
                    {resumeData.skills.map((skillCategory, index) => (
                      <div key={index} className="skill-category">
                        <h3>{skillCategory.category}</h3>
                        <div className="skill-tags">
                          {skillCategory.items.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`skill-tag ${
                                selectedSkills.includes(skill)
                                  ? "highlighted"
                                  : ""
                              }`}
                              onClick={() => toggleSkillFilter(skill)}
                              role="button"
                              tabIndex={0}
                              onKeyPress={(e) =>
                                e.key === "Enter" && toggleSkillFilter(skill)
                              }
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Projects Section */}
            <section className="projects-main-section">
              <div
                className="section-header clickable"
                onClick={() => toggleSection("projects")}
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && toggleSection("projects")
                }
                aria-expanded={expandedSections.projects !== false}
              >
                <h2>
                  Projects
                  {filteredProjects.length !== resumeData.projects?.length &&
                    ` (${filteredProjects.length}/${resumeData.projects?.length})`}
                </h2>
                <span className="expand-icon" aria-hidden="true">
                  {expandedSections.projects ? "−" : "+"}
                </span>
              </div>
              <ProjectsSection
                projects={filteredProjects}
                expanded={expandedSections.projects !== false}
                selectedSkills={selectedSkills}
                onSkillClick={toggleSkillFilter}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
