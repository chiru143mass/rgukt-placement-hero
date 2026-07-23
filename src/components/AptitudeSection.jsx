import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, HelpCircle } from 'lucide-react';
import { aptitudeData } from '../utils/studyData';

export default function AptitudeSection({ completions, toggleCompletion }) {
  const [selectedTopic, setSelectedTopic] = useState(aptitudeData[0]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelectOption = (questionIndex, optionIndex) => {
    const key = `\${selectedTopic.id}-\${questionIndex}`;
    // Only allow selecting once per question
    if (selectedAnswers[key] !== undefined) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [key]: optionIndex
    });
  };

  return (
    <div className="aptitude-view">
      <div className="section-header">
        <h2>Aptitude Coach</h2>
        <p>క్వాంటిటేటివ్ ఆప్టిట్యూడ్ - లెక్కలు మరియు తార్కిక ప్రశ్నలను సులభమైన పద్ధతిలో చేధించడం.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'flex-start' }} className="dsa-grid">
        
        {/* Left Side: Topic list */}
        <div className="roadmap-list">
          {aptitudeData.map((topic) => {
            const isCompleted = completions[topic.id];
            return (
              <div 
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`roadmap-item \${selectedTopic.id === topic.id ? 'active' : ''}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '1rem' }}>{topic.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {topic.quiz.length} Practice Questions
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
            <h3 style={{ fontSize: '1.4rem' }}>{selectedTopic.title} Cheat Sheet</h3>
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

          {/* Formulas */}
          <div style={{ background: 'rgba(255,255,255,0.015)', padding: '18px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: '600', marginBottom: '10px' }}>Important Formulas & Rules</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {selectedTopic.formulas.map((formula, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{formula}</li>
              ))}
            </ul>
          </div>

          {/* Shortcuts */}
          <div style={{ background: 'rgba(6, 182, 212, 0.03)', padding: '16px', borderRadius: '10px', marginBottom: '25px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent)', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={18} /> Shortcut Tricks (షార్ట్‌కట్ చిట్కా)
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{selectedTopic.shortcuts}</p>
          </div>

          {/* Practice Quiz */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={20} style={{ color: 'var(--primary)' }} /> Interactive Practice Test
            </h4>

            {selectedTopic.quiz.map((q, qIdx) => {
              const key = `\${selectedTopic.id}-\${qIdx}`;
              const userAnswerIndex = selectedAnswers[key];
              const isAnswered = userAnswerIndex !== undefined;

              return (
                <div key={qIdx} className="quiz-panel" style={{ marginBottom: '24px' }}>
                  <p style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '14px', color: 'var(--text-main)' }}>
                    Q{qIdx + 1}: {q.question}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, oIdx) => {
                      let optionClass = '';
                      if (isAnswered) {
                        if (oIdx === q.answer) {
                          optionClass = 'correct'; // Show correct in green
                        } else if (oIdx === userAnswerIndex) {
                          optionClass = 'incorrect'; // Show user's wrong answer in red
                        }
                      }
                      
                      return (
                        <div 
                          key={oIdx}
                          onClick={() => handleSelectOption(qIdx, oIdx)}
                          className={`quiz-option \${optionClass}`}
                          style={{ margin: 0 }}
                        >
                          <span>{opt}</span>
                          {isAnswered && oIdx === q.answer && <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>✓ Correct</span>}
                          {isAnswered && oIdx === userAnswerIndex && oIdx !== q.answer && <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>✗ Selected</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Show explanation after answer is selected */}
                  {isAnswered && (
                    <div className="explanation-box">
                      <strong>Solution Explanation (వివరణ):</strong>
                      <p style={{ marginTop: '6px', fontSize: '0.88rem', whiteSpace: 'pre-line' }}>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
