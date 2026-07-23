import React from 'react';
import { Award, CheckCircle2, Circle, Flame, Target, Trophy } from 'lucide-react';
import { dsaRoadmap, aptitudeData, verbalData, projectsBlueprints } from '../utils/studyData';

export default function Dashboard({ completions, toggleCompletion, setActiveTab }) {
  // Calculate counts
  const totalDSA = dsaRoadmap.length;
  const completedDSA = dsaRoadmap.filter(item => completions[item.id]).length;
  const dsaPercent = totalDSA > 0 ? Math.round((completedDSA / totalDSA) * 100) : 0;

  const totalApt = aptitudeData.length;
  const completedApt = aptitudeData.filter(item => completions[item.id]).length;
  const aptPercent = totalApt > 0 ? Math.round((completedApt / totalApt) * 100) : 0;

  const totalVerbal = verbalData.length;
  const completedVerbal = verbalData.filter(item => completions[item.id]).length;
  const verbalPercent = totalVerbal > 0 ? Math.round((completedVerbal / totalVerbal) * 100) : 0;

  const totalProj = projectsBlueprints.length;
  const completedProj = projectsBlueprints.filter(item => completions[item.id]).length;
  const projPercent = totalProj > 0 ? Math.round((completedProj / totalProj) * 100) : 0;

  const overallPercent = Math.round((dsaPercent + aptPercent + verbalPercent + projPercent) / 4);

  const getReadinessLevel = (pct) => {
    if (pct < 20) return { title: "Novice (Beginner)", desc: "Starting the journey. Focus on basic array manipulation and aptitude concepts.", color: "#f87171" };
    if (pct < 60) return { title: "Competent (Intermediate)", desc: "Gaining momentum. You have started building resume projects and practicing math.", color: "#fbbf24" };
    return { title: "Placement Ready (Hero)", desc: "Excellent! You have solid DSA knowledge, complete projects, and strong aptitude skills.", color: "#34d399" };
  };

  const status = getReadinessLevel(overallPercent);

  const dailyGoals = [
    { text: "Practice 1 DSA problem (Two Sum or Reverse List)", targetTab: "dsa" },
    { text: "Solve 5 Time & Work Quantitative questions", targetTab: "aptitude" },
    { text: "Revise Subject-Verb Agreement grammar rules", targetTab: "verbal" },
    { text: "Assemble your first AI Smart Expense Tracker project", targetTab: "projects" }
  ];

  return (
    <div className="dashboard-view">
      <div className="section-header">
        <h2>CSE Placement preparation Portal</h2>
        <p>మీ లోకల్ కోచ్ - CSE ప్లేస్‌మెంట్స్ లో విజయ కేతనం ఎగురవేయడానికి మార్గదర్శిని.</p>
      </div>

      {/* Main Stats Card */}
      <div className="card" style={{ marginBottom: '30px', borderLeft: `6px solid ${status.color}`, background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', color: status.color, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Trophy size={28} /> {status.title}
            </h3>
            <p style={{ marginTop: '6px', fontSize: '1.05rem', color: 'var(--text-main)' }}>{status.desc}</p>
            <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              అన్ని మాడ్యూల్స్ పూర్తి చేయడం ద్వారా మీ ప్లేస్‌మెంట్స్ సన్నద్ధతను 100% కి చేర్చండి!
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'Outfit', color: status.color }}>
              {overallPercent}%
            </span>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>OVERALL READINESS</div>
          </div>
        </div>
        <div className="progress-bar-container" style={{ height: '14px', borderRadius: '7px' }}>
          <div className="progress-bar" style={{ width: `${overallPercent}%` }}></div>
        </div>
      </div>

      {/* Course Breakdown Grid */}
      <div className="dashboard-grid">
        <div className="card" onClick={() => setActiveTab('dsa')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justify: 'space-between', marginBottom: '10px' }}>
            <h3>DSA Academy</h3>
            <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{dsaPercent}%</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
            Data Structures & Algorithms - Arrays, Lists, Stacks, Queues.
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${dsaPercent}%` }}></div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {completedDSA} of {totalDSA} topics completed
          </div>
        </div>

        <div className="card" onClick={() => setActiveTab('aptitude')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justify: 'space-between', marginBottom: '10px' }}>
            <h3>Aptitude Coach</h3>
            <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{aptPercent}%</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
            Quantitative Aptitude, logical math, Profit & Loss formulas.
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${aptPercent}%`, background: 'var(--accent)' }}></div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {completedApt} of {totalApt} topics completed
          </div>
        </div>

        <div className="card" onClick={() => setActiveTab('verbal')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justify: 'space-between', marginBottom: '10px' }}>
            <h3>Verbal English</h3>
            <span style={{ color: '#ec4899', fontWeight: '700' }}>{verbalPercent}%</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
            General English grammar, Subject-Verb agreement rules.
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${verbalPercent}%`, background: '#ec4899' }}></div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {completedVerbal} of {totalVerbal} topics completed
          </div>
        </div>

        <div className="card" onClick={() => setActiveTab('projects')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justify: 'space-between', marginBottom: '10px' }}>
            <h3>Resume Projects</h3>
            <span style={{ color: '#10b981', fontWeight: '700' }}>{projPercent}%</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
            Domain-specific step-by-step codes for 3 portfolio projects.
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${projPercent}%`, background: '#10b981' }}></div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {completedProj} of {totalProj} projects completed
          </div>
        </div>
      </div>

      {/* Daily Placement Checklist */}
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Target size={24} style={{ color: 'var(--primary)' }} /> Daily Placement Targets (ఈరోజు లక్ష్యాలు)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dailyGoals.map((goal, index) => (
            <div 
              key={index}
              className="quiz-option" 
              onClick={() => setActiveTab(goal.targetTab)}
              style={{ margin: 0, padding: '12px 18px', background: 'rgba(255,255,255,0.015)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                <span>{goal.text}</span>
              </div>
              <Flame size={18} style={{ color: 'var(--warning)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
