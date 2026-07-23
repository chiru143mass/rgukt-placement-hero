import React, { useState } from 'react';
import { CheckCircle2, Circle, Clipboard, Code2, Play } from 'lucide-react';
import { dsaRoadmap } from '../utils/studyData';

export default function DSASection({ completions, toggleCompletion }) {
  const [selectedTopic, setSelectedTopic] = useState(dsaRoadmap[0]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeQuestion = selectedTopic.questions[selectedQuestionIndex];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dsa-view">
      <div className="section-header">
        <h2>DSA Academy</h2>
        <p>డేటా స్ట్రక్చర్స్ & అల్గోరిథమ్స్ - ఇంటర్వ్యూలలో విజయం సాధించడానికి పునాది.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'flex-start' }} className="dsa-grid">
        
        {/* Left Side: Topic list */}
        <div className="roadmap-list">
          {dsaRoadmap.map((topic) => {
            const isCompleted = completions[topic.id];
            return (
              <div 
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setSelectedQuestionIndex(0);
                }}
                className={`roadmap-item \${selectedTopic.id === topic.id ? 'active' : ''}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)' }}>{topic.title}</h4>
                  <span className={`badge badge-\${topic.difficulty.toLowerCase()}`} style={{ marginTop: '6px' }}>
                    {topic.difficulty}
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompletion(topic.id);
                  }}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isCompleted ? 'var(--success)' : 'var(--text-muted)' }}
                >
                  {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Side: Topic details */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>{selectedTopic.title} details</h3>
            <button 
              onClick={() => toggleCompletion(selectedTopic.id)}
              className="nav-btn"
              style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              {completions[selectedTopic.id] ? (
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
          
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{selectedTopic.description}</p>
          
          {/* Key Concepts */}
          <div style={{ background: 'rgba(255, 255, 255, 0.015)', padding: '16px', borderRadius: '10px', marginBottom: '25px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--primary)', fontWeight: '600' }}>Key Concepts & Complexities</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {selectedTopic.concepts.map((concept, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{concept}</li>
              ))}
            </ul>
          </div>

          {/* Questions Tabs */}
          {selectedTopic.questions && selectedTopic.questions.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={20} style={{ color: 'var(--accent)' }} /> Standard Interview Questions
              </h4>
              
              <div className="tab-row">
                {selectedTopic.questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedQuestionIndex(idx)}
                    className={`tab-btn \${selectedQuestionIndex === idx ? 'active' : ''}`}
                    style={{ fontSize: '0.9rem', padding: '6px 12px' }}
                  >
                    {q.title}
                  </button>
                ))}
              </div>

              {/* Question details */}
              <div style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h5 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{activeQuestion.title}</h5>
                  <span className="badge badge-medium" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    {activeQuestion.platform}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {activeQuestion.description}
                </p>
                <div style={{ background: 'rgba(6, 182, 212, 0.04)', borderLeft: '4px solid var(--accent)', padding: '12px', borderRadius: '4px', marginBottom: '18px', fontSize: '0.9rem' }}>
                  <strong>Optimal Logic: </strong> {activeQuestion.logic}
                </div>

                {/* Code Editor Window */}
                <div className="code-window">
                  <div className="code-header">
                    <div className="code-dots">
                      <div className="code-dot red"></div>
                      <div className="code-dot yellow"></div>
                      <div className="code-dot green"></div>
                    </div>
                    <button 
                      onClick={() => handleCopyCode(activeQuestion.code)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                    >
                      <Clipboard size={14} />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="code-pre">
                    <code>{activeQuestion.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
