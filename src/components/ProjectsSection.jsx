import React, { useState } from 'react';
import { CheckCircle2, Circle, Clipboard, Folder, Layers, Terminal } from 'lucide-react';
import { projectsBlueprints } from '../utils/studyData';

export default function ProjectsSection({ completions, toggleCompletion }) {
  const [selectedProject, setSelectedProject] = useState(projectsBlueprints[0]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = selectedProject.codeFiles && selectedProject.codeFiles[selectedFileIndex];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="projects-view">
      <div className="section-header">
        <h2>Resume Projects Forge</h2>
        <p>రెజ్యూమ్ ప్రాజెక్టులు - ప్లేస్‌మెంట్స్ లో మిమ్మల్ని ఇంటర్వ్యూయర్ల ముందు ప్రత్యేకం చేసే ప్రాజెక్ట్ గైడ్స్.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'flex-start' }} className="dsa-grid">
        
        {/* Left Side: Project list */}
        <div className="roadmap-list">
          {projectsBlueprints.map((project) => {
            const isCompleted = completions[project.id];
            return (
              <div 
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setSelectedFileIndex(0);
                }}
                className={`roadmap-item \${selectedProject.id === project.id ? 'active' : ''}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '1rem' }}>{project.title.split(':')[0]}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {project.title.split(':')[1]}
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompletion(project.id);
                  }}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isCompleted ? 'var(--success)' : 'var(--text-muted)' }}
                >
                  {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Side: Project Details */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>{selectedProject.title}</h3>
            <button 
              onClick={() => toggleCompletion(selectedProject.id)}
              className="nav-btn"
              style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              {completions[selectedProject.id] ? (
                <>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                  <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>Completed</span>
                </>
              ) : (
                <>
                  <Circle size={16} />
                  <span style={{ fontSize: '0.85rem' }}>Mark Completed</span>
                </>
              )}
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{selectedProject.description}</p>

          {/* Tech Stack */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Layers size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Technology Stack:</span>
            <span className="badge badge-medium" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
              {selectedProject.techStack}
            </span>
          </div>

          {/* Directory Structure Layout */}
          <div style={{ background: 'rgba(255,255,255,0.015)', padding: '16px', borderRadius: '12px', marginBottom: '25px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent)', fontWeight: '600', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Folder size={18} /> Directory Structure Layout
            </h4>
            <pre style={{ margin: 0, padding: 0, fontFamily: 'monospace', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {selectedProject.layout}
            </pre>
          </div>

          {/* Code Files Section */}
          {selectedProject.codeFiles && selectedProject.codeFiles.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={18} style={{ color: 'var(--primary)' }} /> Core File Blueprint (కోడ్ మరియు గైడ్)
              </h4>

              <div className="tab-row">
                {selectedProject.codeFiles.map((file, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`tab-btn \${selectedFileIndex === idx ? 'active' : ''}`}
                    style={{ fontSize: '0.88rem', padding: '6px 12px' }}
                  >
                    {file.filename}
                  </button>
                ))}
              </div>

              {/* Code window */}
              {activeFile && (
                <div className="code-window" style={{ marginTop: '10px' }}>
                  <div className="code-header">
                    <div className="code-dots">
                      <div className="code-dot red"></div>
                      <div className="code-dot yellow"></div>
                      <div className="code-dot green"></div>
                    </div>
                    <button 
                      onClick={() => handleCopyCode(activeFile.code)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                    >
                      <Clipboard size={14} />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="code-pre">
                    <code>{activeFile.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
