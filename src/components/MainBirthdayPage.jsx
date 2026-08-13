import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { 
  Heart, Music, Sparkles, X, Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, ChevronDown
} from 'lucide-react';
import GinghamBirthdayCard from './GinghamBirthdayCard';

/* ====== LETTER TYPEWRITER SUB-COMPONENT (UNTOUCHED & PRESERVED) ====== */
function LetterTypewriter() {
  const letterRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  const letterLines = [
    { text: "Haii babe, for you Biuuu 🤍", style: "greeting" },
    { text: "", style: "spacer" },
    { text: "Jujur aku selama ini nyaman banget sama kamu... I have a crush on you.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Aku nggak berharap banyak buat kamu bisa suka balik sama aku, karena kamu pun punya hak pribadi.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Dari awal aku kenal kamu, aku udah mulai ngerasa nyaman entah dari mana sih datengnya. Dari first kita ketemu, aku punya feeling lebih ke kamu.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Suka banget kalau kamu bisa ngasih perhatian-perhatian kecil ke aku... Mungkin dari aku segitu aja, sebenarnya masih banyak banget hehe tapi ringkasnya segitu.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Sorry ya kalau jadinya kamu ngerasa risih atau nggak nyaman dan pengen ngejauh dari aku.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Nggak lebih nggak kurang, aku ngomong gini biar aku bisa lega dan tau sebenernya perasaan kamu kayak gimana ke aku. 🤍", style: "ps" },
  ];

  // Trigger typewriter when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.25 }
    );
    if (letterRef.current) observer.observe(letterRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Typewriter engine
  useEffect(() => {
    if (!started) return;
    if (currentLine >= letterLines.length) return;

    const line = letterLines[currentLine];

    // Spacer lines — skip immediately
    if (line.style === "spacer") {
      setDisplayedLines(prev => [...prev, { text: "", style: "spacer" }]);
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 150);
      return;
    }

    if (currentChar <= line.text.length) {
      const timer = setTimeout(() => {
        const partial = line.text.slice(0, currentChar);
        
        setDisplayedLines(prev => {
          const copy = [...prev];
          const lastIdx = copy.length - 1;
          if (lastIdx >= 0 && copy[lastIdx].style === line.style && copy[lastIdx]._lineIdx === currentLine) {
            copy[lastIdx] = { text: partial, style: line.style, _lineIdx: currentLine };
          } else {
            copy.push({ text: partial, style: line.style, _lineIdx: currentLine });
          }
          return copy;
        });

        setCurrentChar(prev => prev + 1);
      }, 25);

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 280);
    }
  }, [started, currentLine, currentChar]);

  const isTyping = currentLine < letterLines.length;

  const getLineStyle = (style) => {
    switch (style) {
      case 'greeting':
        return { fontWeight: '600', marginBottom: '4px', fontSize: '1.08rem', color: '#38bdf8', fontFamily: 'var(--font-display)' };
      case 'ps':
        return { marginBottom: '0', fontStyle: 'italic', color: '#38bdf8', fontWeight: '500' };
      case 'spacer':
        return { height: '10px' };
      default:
        return { marginBottom: '4px' };
    }
  };

  return (
    <div
      ref={letterRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.35)',
        padding: '28px 20px 24px',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px',
      }}
    >
      {/* Floating Decorative Elements */}
      <div style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '1.4rem', filter: 'drop-shadow(0 0 6px #00d2ff)' }}>💙</div>
      <div style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '1.4rem', filter: 'drop-shadow(0 0 6px #38bdf8)' }}>✨</div>
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '1.3rem', filter: 'drop-shadow(0 0 6px #60a5fa)' }}>🔹</div>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — FROM MY HEART —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', marginBottom: '4px' }}>
          A Letter For You
        </h3>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            background: 'rgba(0, 210, 255, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '16px',
            fontSize: '0.78rem',
            color: '#e0f2fe',
            marginTop: '4px',
          }}
        >
          <span>💙</span>
          <span>Specially for Biuuu</span>
          <span>💙</span>
        </div>
      </div>

      {/* Typewriter Letter Content */}
      <div style={{ fontSize: '0.92rem', lineHeight: '1.65', color: '#e0f2fe', position: 'relative', zIndex: 2, minHeight: '200px' }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={getLineStyle(line.style)}>
            {line.text}
            {i === displayedLines.length - 1 && isTyping && line.style !== 'spacer' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  backgroundColor: '#00d2ff',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 8px #00d2ff',
                  animation: 'pulseGlow 0.6s infinite alternate',
                }}
              />
            )}
          </div>
        ))}

        {!isTyping && displayedLines.length > 0 && (
          <div
            style={{
              marginTop: '20px',
              textAlign: 'right',
              fontWeight: '600',
              color: '#38bdf8',
              fontSize: '0.95rem',
              opacity: 0,
              animation: 'fadeInUp 0.8s forwards 0.3s',
            }}
          >
            <span style={{ color: '#60a5fa', fontSize: '0.85rem' }}>With all my sincerity,</span><br />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#38bdf8', textShadow: '0 0 10px rgba(56,189,248,0.5)' }}>From Me 🤍</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====== INTERACTIVE PROPOSAL / CONFESSION DECISION SECTION ====== */
function InteractiveConfessionSection() {
  const sectionRef = useRef(null);
  const noBtnRef = useRef(null);
  const cardRef = useRef(null);
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const noPhrases = [
    "No 🙈",
    "Eits, can't click this 😜",
    "Are you sure? 🥺",
    "Try the blue button 💙",
    "Button is unavailable 🤭",
    "Think again 💙",
    "Can't say no 😜"
  ];

  const handleAccept = () => {
    setAccepted(true);

    // Multi-stage confetti celebration
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00d2ff', '#38bdf8', '#0066ff', '#ffffff', '#60a5fa', '#93c5fd'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#38bdf8', '#00d2ff', '#ffffff'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#38bdf8', '#00d2ff', '#ffffff'],
      });
    }, 250);

    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' }
      );
    }
  };

  const handleDodgeNo = () => {
    setNoCount(prev => prev + 1);
    if (!noBtnRef.current) return;

    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 80;

    gsap.to(noBtnRef.current, {
      x: randomX,
      y: randomY,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={sectionRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.9) 0%, rgba(3, 15, 38, 0.95) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(0, 210, 255, 0.45)',
        padding: '28px 18px',
        textAlign: 'center',
        boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 25px rgba(0, 210, 255, 0.25)',
        marginBottom: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glowing Ambient Background */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,255,0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '6px' }}>
        — THE BIG QUESTION —
      </p>

      <h3
        className="neon-text"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.65rem',
          lineHeight: '1.3',
          marginBottom: '8px',
        }}
      >
        Will you be my girlfriend, Biuuu? 💙
      </h3>

      <p style={{ fontSize: '0.85rem', color: '#e0f2fe', opacity: 0.9, marginBottom: '24px' }}>
        Purely from my heart, no pressure at all... ✨
      </p>

      {!accepted ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            minHeight: '70px',
            position: 'relative',
          }}
        >
          {/* YES Button */}
          <button
            onClick={handleAccept}
            style={{
              background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 50%, #0066ff 100%)',
              color: '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.8)',
              padding: '13px 32px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 0 25px #00d2ff, 0 0 45px rgba(0, 210, 255, 0.5)',
              transform: 'scale(1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              zIndex: 5,
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Sparkles size={18} />
            <span>YES, I WILL! 💙</span>
          </button>

          {/* Playful Dodging NO Button */}
          <button
            ref={noBtnRef}
            onMouseEnter={handleDodgeNo}
            onTouchStart={handleDodgeNo}
            onClick={handleDodgeNo}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              color: '#93c5fd',
              padding: '12px 20px',
              borderRadius: '30px',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              userSelect: 'none',
              zIndex: 4,
            }}
          >
            {noPhrases[noCount % noPhrases.length]}
          </button>
        </div>
      ) : (
        /* Accepted Joyful Card */
        <div
          ref={cardRef}
          style={{
            padding: '20px 16px',
            background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2) 0%, rgba(10, 30, 63, 0.95) 100%)',
            borderRadius: '20px',
            border: '2px solid #38bdf8',
            boxShadow: '0 0 30px rgba(0, 210, 255, 0.5)',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
            🎉💙✨
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: '#38bdf8',
              marginBottom: '8px',
            }}
          >
            Yaaay! You just made my day! 🥹💙
          </h4>
          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: '1.6',
              color: '#f0f9ff',
              fontWeight: '500',
            }}
          >
            Thank you so much, Biuuu! Ini bener-bener bikin aku happy banget. I promise to always treat you with care, honesty, and respect. Let's make lots of sweet memories together! 🤍
          </p>
        </div>
      )}
    </div>
  );
}

/* ====== REASONS WHY I FELL FOR YOU ====== */
function ReasonsWhySection({ onSelectReason }) {
  const reasons = [
    {
      id: 1,
      icon: "💬",
      tag: "The Sweetness",
      title: "Your Little Attentions",
      desc: "Suka banget cara kamu ngasih perhatian-perhatian kecil secara tulus. Those small sweet things always brighten up my day.",
      gradient: "linear-gradient(135deg, rgba(0, 210, 255, 0.25) 0%, rgba(10, 30, 63, 0.8) 100%)"
    },
    {
      id: 2,
      icon: "🤍",
      tag: "The Pure Comfort",
      title: "The Natural Comfort",
      desc: "From our very first conversation, ada rasa nyaman yang begitu natural. It just feels easy and safe to talk to you.",
      gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(10, 30, 63, 0.8) 100%)"
    },
    {
      id: 3,
      icon: "✨",
      tag: "The Spark",
      title: "That Special Feeling",
      desc: "Sejak awal ketemu, I felt something distinct and special about you. Ada daya tarik tersendiri yang susah dijelasin.",
      gradient: "linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(10, 30, 63, 0.8) 100%)"
    },
    {
      id: 4,
      icon: "🌸",
      tag: "The Authenticity",
      title: "Being Truly Yourself",
      desc: "The way you express yourself, your genuine laugh, and your kindness—it's so refreshing and attractive.",
      gradient: "linear-gradient(135deg, rgba(0, 210, 255, 0.25) 0%, rgba(10, 30, 63, 0.8) 100%)"
    },
    {
      id: 5,
      icon: "💫",
      tag: "Every Little Moment",
      title: "Every Conversation With You",
      desc: "Mau obrolan random atau deep talk singkat, every little interaction with you is always something I look forward to.",
      gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(10, 30, 63, 0.8) 100%)"
    },
  ];

  return (
    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
        — THINGS I ADORE ABOUT YOU —
      </p>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
        Why You're Special To Me
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        A few little things about you that always caught my heart 💙
      </p>

      {/* Interactive Reason Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
        {reasons.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelectReason(item)}
            style={{
              width: '100%',
              maxWidth: '360px',
              background: item.gradient,
              border: '1.5px solid rgba(96, 165, 250, 0.35)',
              borderRadius: '20px',
              padding: '18px 16px',
              textAlign: 'left',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#00d2ff';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 210, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.35)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#38bdf8',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: '700',
                  }}
                >
                  #{idx + 1} · {item.tag}
                </span>
              </div>
              <Sparkles size={14} color="#38bdf8" />
            </div>

            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.08rem',
                color: '#ffffff',
                marginBottom: '6px',
              }}
            >
              {item.title}
            </h4>

            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: '1.5',
                color: '#e0f2fe',
                opacity: 0.9,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====== ELEGANT FAREWELL SECTION SUB-COMPONENT ====== */
function FarewellSection({ onOpenCelebration }) {
  const farewellRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const tl = gsap.timeline({ defaults: { ease: 'back.out(1.5)', duration: 0.7 } });

          tl.fromTo('.farewell-eyebrow',
            { opacity: 0, y: -15, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 }
          )
          .fromTo('.farewell-title',
            { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.9 },
            { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.8 },
            '-=0.3'
          )
          .fromTo('.farewell-message',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo('.farewell-blossom',
            { opacity: 0, scale: 0.3, rotate: -45 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' },
            '-=0.3'
          )
          .fromTo('.farewell-closing',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo('.farewell-btn',
            { opacity: 0, scale: 0.6, y: 25 },
            { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' },
            '-=0.2'
          );
        }
      },
      { threshold: 0.1 }
    );

    if (farewellRef.current) observer.observe(farewellRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={farewellRef}
      style={{
        textAlign: 'center',
        marginTop: '10px',
        paddingTop: '20px',
        paddingBottom: '50px',
        position: 'relative',
      }}
    >
      {/* Floating decorative sparkles */}
      <div style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '1rem', opacity: 0.5, filter: 'drop-shadow(0 0 6px #00d2ff)' }}>💙</div>
      <div style={{ position: 'absolute', top: '5%', right: '12%', fontSize: '0.9rem', opacity: 0.4, filter: 'drop-shadow(0 0 6px #38bdf8)' }}>✨</div>
      <div style={{ position: 'absolute', bottom: '20%', left: '6%', fontSize: '0.8rem', opacity: 0.35, filter: 'drop-shadow(0 0 6px #00d2ff)' }}>🔹</div>
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', fontSize: '0.85rem', opacity: 0.4, filter: 'drop-shadow(0 0 6px #38bdf8)' }}>💙</div>

      {/* Eyebrow */}
      <p
        className="farewell-eyebrow"
        style={{
          fontSize: '0.85rem',
          color: '#38bdf8',
          marginBottom: '18px',
          letterSpacing: '0.5px',
        }}
      >
        💙 From me to you 💙
      </p>

      {/* Main Title */}
      <h2
        className="farewell-title"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontSize: '2rem',
          lineHeight: '1.25',
          color: '#fff',
          textShadow: '0 0 15px rgba(0, 210, 255, 0.5), 0 0 30px rgba(0, 210, 255, 0.3)',
          marginBottom: '24px',
          fontWeight: '600',
        }}
      >
        Thank you for<br />
        <span
          style={{
            fontStyle: 'italic',
            color: '#38bdf8',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(0, 210, 255, 0.4)',
          }}
        >
          bringing such sweet warmth
        </span>
        <br />
        into my life
      </h2>

      {/* Message Paragraph */}
      <p
        className="farewell-message"
        style={{
          fontSize: '0.88rem',
          lineHeight: '1.7',
          color: 'rgba(224, 242, 254, 0.85)',
          maxWidth: '320px',
          margin: '0 auto 24px',
          fontWeight: '400',
        }}
      >
        Whatever happens, aku selalu bersyukur bisa kenal dan deket sama kamu. May your days always be filled with good energy, peace of mind, and genuine happiness, Biuuu 🤍.
      </p>

      {/* Center Flower Bucket PNG Ornament */}
      <div
        className="farewell-blossom"
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src="/bucket bunga 2 no bg.png"
          alt="Flower Bucket"
          style={{
            width: '85px',
            height: 'auto',
            filter: 'drop-shadow(0 0 16px #00d2ff) drop-shadow(0 0 30px #38bdf8)',
          }}
        />
      </div>

      {/* Closing Line */}
      <p
        className="farewell-closing"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontStyle: 'italic',
          fontSize: '0.92rem',
          color: 'rgba(224, 242, 254, 0.7)',
          letterSpacing: '0.3px',
          marginBottom: '28px',
        }}
      >
        — Sincere feelings never fade 💙 —
      </p>

      {/* Celebration Button */}
      <button
        className="farewell-btn"
        onClick={onOpenCelebration}
        style={{
          background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
          color: '#fff',
          border: 'none',
          padding: '13px 30px',
          borderRadius: '30px',
          fontSize: '0.95rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 35px var(--neon-pink-light), 0 0 60px var(--neon-pink)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)';
        }}
      >
        <Sparkles size={18} /> A Sweet Hug For Biuuu 💕
      </button>
    </div>
  );
}

/* ====== MAIN PAGE COMPONENT ====== */
export default function MainBirthdayPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const happyRef = useRef(null);
  const birthdayRef = useRef(null);
  const agaaRef = useRef(null);
  const eyebrowRef = useRef(null);
  const dateRef = useRef(null);
  
  // Typewriter effect state
  const fullRomanticText = "Scroll down slowly ya, ada sesuatu yang pengen aku share ke kamu 🥹🤍";
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullRomanticText.length) {
        setTypedText(fullRomanticText.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 60);

    // Auto-play music automatically when unlocked after opening gift box
    const autoPlayTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay deferred:', err));
      }
    }, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(autoPlayTimer);
    };
  }, []);

  // 1. Audio Player State (Last Night on Earth)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);
  const vinylRef = useRef(null);

  const playlist = [
    { 
      id: 1, 
      title: 'Last Night on Earth', 
      artist: 'Green Day', 
      duration: '3:57', 
      src: '/Last Night on Earth_spotdown.org.mp3' 
    },
  ];

  // 2. Bouquet Flowers Compliment Messages State
  const [activeFlower, setActiveFlower] = useState('sakura');
  const flowerCompliments = {
    rose: {
      name: "Mawar",
      icon: "🌹",
      color: "#38bdf8",
      text: "If I had to describe how comfortable I feel around you, it's definitely this—you have such a special and warm spot in my heart."
    },
    tulip: {
      name: "Tulip",
      icon: "🌷",
      color: "#60a5fa",
      text: "Like a tulip that's simple yet elegant, aku suka banget your little gestures and small attentions. It means so much to me."
    },
    sakura: {
      name: "Sakura",
      icon: "🌸",
      color: "#93c5fd",
      text: "Ever since our first meetup, senyum dan caramu ngobrol always effortlessly make my day feel calmer and happier."
    },
    sunflower: {
      name: "Sunflower",
      icon: "🌻",
      color: "#38bdf8",
      text: "You naturally bring this bright, positive energy wherever you go. Selalu ada alasan buat senyum tiap ngobrol bareng kamu."
    },
    daisy: {
      name: "Daisy",
      icon: "🌼",
      color: "#00d2ff",
      text: "Everything feels effortless and genuine when I'm with you. Thank you for always being your authentic self."
    }
  };

  // 3. Selected Reason Modal State
  const [selectedReason, setSelectedReason] = useState(null);

  // 4. Jar of Notes State
  const jarRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const jarNotes = [
    "Honestly, from the moment I got to know you, it always felt so comfortable. Makasih udah selalu jadi orang yang seru dan bikin nyaman. 💙",
    "I'm genuinely glad our paths crossed. Your presence alone turns a tiring day into something so much better. 🤍",
    "Apapun yang kamu rasain, I just wanted to be honest with my feelings. You're genuinely a special person to me. ✨",
    "Denger suara kamu atau sekadar bertukar kabar ringan can easily turn my mood around. Thank you for that, Biuuu. 💙"
  ];

  // 5. Celebration Modal State
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo(happyRef.current,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.5'
    )
    .fromTo(birthdayRef.current,
      { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.5)' },
      '-=0.6'
    )
    .fromTo(agaaRef.current,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.6'
    )
    .fromTo(dateRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    );

    const flowers = gsap.utils.toArray('.floating-hero-flower');
    flowers.forEach((flower, i) => {
      gsap.to(flower, {
        y: i % 2 === 0 ? -16 : 16,
        rotation: i % 2 === 0 ? 25 : -25,
        scale: 1.15,
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    gsap.to(birthdayRef.current, {
      filter: 'drop-shadow(0 0 25px #00d2ff) drop-shadow(0 0 45px #38bdf8)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-scroll-indicator', {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    if (isPlaying) {
      gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
    } else {
      gsap.killTweensOf(vinylRef.current);
    }
  }, { scope: containerRef, dependencies: [isPlaying] });

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const playSpecificTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 50);
  };

  const handleFlowerSelect = (key) => {
    setActiveFlower(key);

    gsap.fromTo(`.flower-node-${key}`,
      { scale: 0.8, rotate: -15 },
      { scale: 1.25, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
    );

    gsap.fromTo('.compliment-toast-box',
      { opacity: 0, y: 15, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  };

  const handleShakeJar = () => {
    if (!jarRef.current) return;

    setSelectedNote(null);
    const tl = gsap.timeline();

    tl.to(jarRef.current, {
      rotation: -22,
      scale: 1.18,
      y: -10,
      duration: 0.09,
      ease: 'power1.out',
    })
    .to(jarRef.current, {
      rotation: 22,
      y: -12,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: -16,
      y: -8,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: 16,
      y: -6,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: 0,
      scale: 1,
      y: 0,
      duration: 0.15,
      ease: 'back.out(2)',
      onComplete: () => {
        const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
        setSelectedNote(randomNote);

        requestAnimationFrame(() => {
          gsap.fromTo('.note-popup',
            { 
              opacity: 0, 
              scale: 0.2, 
              y: 50,
              rotation: -15,
              filter: 'blur(8px)',
            },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotation: 0, 
              filter: 'blur(0px)',
              duration: 0.65, 
              ease: 'back.out(1.8)',
            }
          );
        });
      }
    });
  };

  const handleOpenCelebrationModal = () => {
    setShowCelebrationModal(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#00d2ff', '#38bdf8', '#0066ff', '#ffffff', '#60a5fa'],
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        flexShrink: 0,
        padding: '24px 16px 80px',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setAudioProgress(pct || 0);
          }
        }}
      />

      {/* Floating Audio Quick Toggle Button */}
      <button
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 90,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px #00d2ff, 0 4px 12px rgba(0,0,0,0.4)',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* SECTION 1: HERO HEADER WITH TYPEWRITER EFFECT */}
      <div
        ref={heroRef}
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '30px 0 10px',
          marginBottom: '36px',
        }}
      >
        {/* Cute Mascot Sticker floating in Hero */}
        <img
          src="/lucu1 no bg.png"
          alt="Cute Mascot"
          style={{
            position: 'absolute',
            top: '2%',
            right: '4%',
            width: '65px',
            height: 'auto',
            filter: 'drop-shadow(0 0 12px #38bdf8)',
            animation: 'pulseGlow 2.5s infinite ease-in-out',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative Flower PNG in Hero Left */}
        <img
          src="/bunga no bg 2.png"
          alt="Decorative Flower"
          style={{
            position: 'absolute',
            top: '40%',
            left: '2%',
            width: '45px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
        {/* Animated Floating Flowers around Hero */}
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '4%', left: '8%', fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}>💙</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '12%', right: '8%', fontSize: '1.8rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>✨</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '45%', left: '4%', fontSize: '1.5rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}>🔹</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '48%', right: '6%', fontSize: '1.7rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>💙</div>

        {/* Ambient Glowing Aura */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 210, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Eyebrow Tag */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: '#7dd3fc',
            marginBottom: '20px',
            letterSpacing: '0.5px',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.6)',
            padding: '0 8px',
          }}
        >
          <span>🤍</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>Something sincere from my heart</span>
          <span>🤍</span>
        </div>

        {/* Title: A Special Note For Biuuu */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: '1.15',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            ref={happyRef}
            style={{
              fontSize: '2.4rem',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
            }}
          >
            A Special Note For,
          </div>
          <div
            ref={birthdayRef}
            style={{
              fontSize: '2.8rem',
              fontStyle: 'italic',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #00d2ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 15px rgba(0, 210, 255, 0.8))',
              margin: '6px 0',
              letterSpacing: '0.5px',
            }}
          >
            My Favorite Person 🤍
          </div>
          <div
            ref={agaaRef}
            style={{
              fontSize: '3.6rem',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '1.5px',
              textShadow: '0 0 25px rgba(0, 210, 255, 0.8), 0 0 45px rgba(56, 189, 248, 0.5)',
            }}
          >
            Biuuu
          </div>
        </div>

        {/* Typewriter Romantic Writing Text Animation */}
        <div
          style={{
            minHeight: '28px',
            marginBottom: '20px',
            padding: '0 12px',
          }}
        >
          <p
            style={{
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: '#e0f2fe',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.5px',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.8)',
            }}
          >
            {typedText}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                backgroundColor: '#00d2ff',
                marginLeft: '3px',
                verticalAlign: 'middle',
                boxShadow: '0 0 8px #00d2ff',
                opacity: isTypingDone ? 0.3 : 1,
                animation: 'pulseGlow 0.8s infinite alternate',
              }}
            />
          </p>
        </div>

        {/* Thin Horizontal Divider */}
        <div
          style={{
            width: '140px',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)',
            marginBottom: '22px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
          }}
        />

        {/* Subtitle Dedication */}
        <div
          ref={dateRef}
          style={{
            fontSize: '0.78rem',
            letterSpacing: '3px',
            color: 'rgba(224, 242, 254, 0.85)',
            fontWeight: '600',
            textTransform: 'uppercase',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.4)',
            marginBottom: '28px',
          }}
        >
          A LITTLE CONFESSION FROM MY HEART 💙
        </div>

        {/* Scroll Down Bounce Arrow */}
        <div className="hero-scroll-indicator" style={{ opacity: 0.8 }}>
          <ChevronDown size={22} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #00d2ff)' }} />
        </div>
      </div>

      {/* SECTION 1.5: 3D GSAP INTERACTIVE LOVE CARD */}
      <GinghamBirthdayCard />

      {/* SECTION 2: DIGITAL BOUQUET */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.7)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(0, 210, 255, 0.4)',
          padding: '24px 12px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 20px rgba(0, 210, 255, 0.15)',
          marginBottom: '36px',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — A DIGITAL BOUQUET —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
          A Bouquet For You 🌷
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Pick a flower, there's a little thought behind each one 🤍
        </p>

        {/* Bouquet PNG Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <img
            src="/bunga bucket no bg.png"
            alt="Bouquet Banner"
            style={{
              width: '80px',
              height: 'auto',
              filter: 'drop-shadow(0 0 14px #00d2ff) drop-shadow(0 0 25px #38bdf8)',
            }}
          />
        </div>

        {/* SVG Bouquet */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '350px',
            height: '240px',
            margin: '0 auto 20px',
          }}
        >
          <svg viewBox="0 0 350 240" width="100%" height="100%">
            <defs>
              <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0052cc" />
              </linearGradient>
            </defs>

            <path d="M 175 195 Q 90 140, 30 70" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 85 130 Q 70 125, 65 140 Z" fill="#0284c7" />

            <path d="M 175 195 Q 125 110, 100 45" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 125 110 Q 140 105, 140 120 Z" fill="#0284c7" />

            <path d="M 175 195 L 175 30" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            <path d="M 175 115 Q 160 105, 160 120 Z" fill="#0284c7" />

            <path d="M 175 195 Q 225 110, 250 45" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 225 110 Q 210 105, 210 120 Z" fill="#0284c7" />

            <path d="M 175 195 Q 260 140, 320 70" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 265 130 Q 280 125, 285 140 Z" fill="#0284c7" />

            <path d="M 115 160 C 115 160, 95 215, 120 225 C 145 235, 205 235, 230 225 C 255 215, 235 160, 235 160 Z" fill="url(#potGrad)" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 8px 15px rgba(0,0,0,0.6))" />
            <circle cx="175" cy="190" r="11" fill="#ffffff" />
            <circle cx="175" cy="190" r="7" fill="#00d2ff" />
            <path d="M 175 190 C 150 175, 140 200, 175 190 Z" fill="#ffffff" />
            <path d="M 175 190 C 200 175, 210 200, 175 190 Z" fill="#ffffff" />
          </svg>

          {/* Clickable Flower Nodes */}
          <div
            className="flower-node-rose"
            onClick={() => handleFlowerSelect('rose')}
            style={{
              position: 'absolute',
              left: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'rose' ? 'drop-shadow(0 0 16px #38bdf8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'rose' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌹
          </div>

          <div
            className="flower-node-tulip"
            onClick={() => handleFlowerSelect('tulip')}
            style={{
              position: 'absolute',
              left: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'tulip' ? 'drop-shadow(0 0 16px #60a5fa)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'tulip' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌷
          </div>

          <div
            className="flower-node-sakura"
            onClick={() => handleFlowerSelect('sakura')}
            style={{
              position: 'absolute',
              left: '50%',
              transform: activeFlower === 'sakura' ? 'translateX(-50%) scale(1.3)' : 'translateX(-50%) scale(1)',
              top: '-14px',
              fontSize: '2.8rem',
              cursor: 'pointer',
              filter: activeFlower === 'sakura' ? 'drop-shadow(0 0 18px #93c5fd)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌸
          </div>

          <div
            className="flower-node-sunflower"
            onClick={() => handleFlowerSelect('sunflower')}
            style={{
              position: 'absolute',
              right: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'sunflower' ? 'drop-shadow(0 0 16px #38bdf8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'sunflower' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌻
          </div>

          <div
            className="flower-node-daisy"
            onClick={() => handleFlowerSelect('daisy')}
            style={{
              position: 'absolute',
              right: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'daisy' ? 'drop-shadow(0 0 16px #00d2ff)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'daisy' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌼
          </div>
        </div>

        {/* Flower Selection Badge Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '18px',
          }}
        >
          {Object.keys(flowerCompliments).map((key) => {
            const item = flowerCompliments[key];
            const isSelected = activeFlower === key;
            return (
              <button
                key={key}
                onClick={() => handleFlowerSelect(key)}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, rgba(0, 210, 255, 0.3) 0%, rgba(0, 102, 255, 0.2) 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? `1.5px solid #00d2ff` : '1px solid rgba(96, 165, 250, 0.25)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected ? `0 0 15px rgba(0, 210, 255, 0.4)` : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Compliment Message Box */}
        <div
          className="compliment-toast-box"
          style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.18) 0%, rgba(10, 30, 63, 0.9) 100%)',
            border: `1.5px solid ${flowerCompliments[activeFlower].color}`,
            borderRadius: '20px',
            boxShadow: `0 0 20px rgba(0, 210, 255, 0.25)`,
            transition: 'all 0.3s ease',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: '1.5',
              color: '#ffffff',
              fontWeight: '500',
            }}
          >
            "{flowerCompliments[activeFlower].text}"
          </p>
        </div>
      </div>

      {/* SECTION 3: A LETTER FOR YOU — TYPEWRITER EFFECT */}
      <LetterTypewriter />

      {/* SECTION 4: REASONS WHY I LIKE YOU (REPLACING PHOTO GALLERY) */}
      <ReasonsWhySection onSelectReason={(reason) => setSelectedReason(reason)} />

      {/* SECTION 5: INTERACTIVE CONFESSION DECISION */}
      <InteractiveConfessionSection />

      {/* SECTION 6: SPECIAL PLAYLIST (LAST NIGHT ON EARTH) */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.75)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(96, 165, 250, 0.35)',
          padding: '22px 16px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
          marginBottom: '36px',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — CURRENT TRACK —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '16px' }}>
          Special Playlist
        </h3>

        {/* Spinning Vinyl Disc */}
        <div
          style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            margin: '0 auto 16px',
          }}
        >
          <div
            ref={vinylRef}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #333 15%, #111 20%, #222 35%, #050505 60%)',
              border: '3px solid rgba(0, 210, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0,210,255,0.4)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Music size={20} color="#fff" />
            </div>
          </div>
        </div>

        {/* Track Title */}
        <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '2px', fontFamily: 'var(--font-display)' }}>
          {playlist[currentTrack].title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {playlist[currentTrack].artist}
        </p>

        {/* Audio Progress Slider Line */}
        <div
          style={{
            width: '100%',
            height: '5px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            marginBottom: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${audioProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d2ff, #38bdf8)',
              transition: 'width 0.2s linear',
            }}
          />
        </div>

        {/* Playback Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipBack size={24} />
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px #00d2ff',
              cursor: 'pointer',
            }}
          >
            {isPlaying ? <Pause size={24} fill="#fff" /> : <Play size={24} fill="#fff" style={{ marginLeft: '2px' }} />}
          </button>

          <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipForward size={24} />
          </button>
        </div>

        {/* Song List Card */}
        <div
          onClick={() => playSpecificTrack(0)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0,210,255,0.3) 0%, rgba(0,102,255,0.15) 100%)',
            border: '1.5px solid var(--neon-pink)',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,210,255,0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#00d2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#fff',
              }}
            >
              {isPlaying ? <Music size={14} /> : 1}
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ffffff' }}>
                Last Night on Earth
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Green Day
              </p>
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            3:57
          </span>
        </div>
      </div>

      {/* SECTION 7: JAR OF NOTES */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          padding: '20px 16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          marginBottom: '36px',
          position: 'relative',
        }}
      >
        {/* Mascot Sticker */}
        <img
          src="/lucu 2 no bg.png"
          alt="Cute Mascot"
          style={{
            position: 'absolute',
            top: '-20px',
            right: '12px',
            width: '58px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            pointerEvents: 'none',
          }}
        />
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — LITTLE THOUGHTS —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '4px' }}>
          Things I'm Grateful For
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Shake the jar to read a little note 📜
        </p>

        <div ref={jarRef} style={{ fontSize: '3.5rem', marginBottom: '12px', cursor: 'pointer' }} onClick={handleShakeJar}>
          🫙
        </div>

        <button
          onClick={handleShakeJar}
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '20px',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,210,255,0.4)',
          }}
        >
          Shake the Jar ✨
        </button>

        {selectedNote && (
          <div
            className="note-popup"
            style={{
              marginTop: '26px',
              padding: '26px 16px 18px',
              background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#0f172a',
              borderRadius: '20px',
              border: '2.5px solid #38bdf8',
              fontSize: '0.92rem',
              fontWeight: '600',
              boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 25px rgba(0, 210, 255, 0.35)',
              lineHeight: '1.55',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Paper Washi Tape Header Ornament */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
                color: '#ffffff',
                padding: '4px 14px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                letterSpacing: '0.8px',
                fontWeight: '700',
                boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
                whiteSpace: 'nowrap',
                zIndex: 5,
              }}
            >
              📜 SPECIAL NOTE FOR BIUUU 💙
            </div>

            <p style={{ marginTop: '4px', fontFamily: 'var(--font-body)' }}>
              "{selectedNote}"
            </p>
          </div>
        )}
      </div>

      {/* SECTION 8: ELEGANT FAREWELL */}
      <FarewellSection onOpenCelebration={handleOpenCelebrationModal} />

      {/* REASON DETAIL MODAL */}
      {selectedReason && (
        <div
          onClick={() => setSelectedReason(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(3, 12, 27, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(165deg, #0a1e3f 0%, #041026 100%)',
              border: '1.5px solid #00d2ff',
              padding: '24px 20px',
              borderRadius: '24px',
              maxWidth: '340px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(0, 210, 255, 0.4)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedReason(null)}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#00d2ff',
                color: '#fff',
                border: '2px solid #fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px #00d2ff',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              {selectedReason.icon}
            </div>

            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(0, 210, 255, 0.15)',
                borderRadius: '12px',
                fontSize: '0.75rem',
                color: '#38bdf8',
                fontWeight: '700',
                marginBottom: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {selectedReason.tag}
            </div>

            <h4
              style={{
                color: '#ffffff',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-display)',
                marginBottom: '12px',
              }}
            >
              {selectedReason.title}
            </h4>

            <p
              style={{
                color: '#e0f2fe',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              "{selectedReason.desc}"
            </p>

            <button
              onClick={() => setSelectedReason(null)}
              style={{
                padding: '9px 24px',
                background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(0,210,255,0.4)',
              }}
            >
              Close 💙
            </button>
          </div>
        </div>
      )}

      {/* SPECIAL HUG CELEBRATION MODAL */}
      {showCelebrationModal && (
        <div
          onClick={() => setShowCelebrationModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #0a1e3f 0%, #041026 100%)',
              border: '1.5px solid var(--neon-pink)',
              padding: '28px 20px',
              borderRadius: '24px',
              maxWidth: '320px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 0 40px var(--neon-pink)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💙✨🤗</div>
            <h3 className="neon-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '8px' }}>
              A Sweet Hug For Biuuu
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#e0f2fe', lineHeight: '1.55', marginBottom: '20px' }}>
              Hope whatever you're working on goes smoothly. Stay happy, stay positive, and take good care of yourself! 🤍
            </p>

            <button
              onClick={() => setShowCelebrationModal(false)}
              style={{
                padding: '9px 26px',
                background: 'rgba(0,210,255,0.2)',
                border: '1.5px solid var(--neon-pink)',
                color: '#fff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Thank You 💙
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
