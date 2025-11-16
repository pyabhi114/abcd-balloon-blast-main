import { useState, useMemo, useEffect } from "react";

// Singleton AudioContext
let audioContext: AudioContext | null = null;
let isAudioInitialized = false;

// Function to get or create the AudioContext
const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Function to ensure audio is ready to play
const ensureAudioReady = async (): Promise<AudioContext> => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  return ctx;
};

// Initialize audio on first user interaction
const initializeAudio = () => {
  if (isAudioInitialized || typeof window === 'undefined') return;
  isAudioInitialized = true;
  
  // Single touch/click handler for audio initialization
  const initAudioOnInteraction = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    // Remove all event listeners after first interaction
    document.removeEventListener('click', initAudioOnInteraction);
    document.removeEventListener('touchstart', initAudioOnInteraction);
  };

  // Add both touch and click handlers for better mobile support
  document.addEventListener('click', initAudioOnInteraction, { once: true });
  document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
};

// Call initializeAudio when the module loads
if (typeof window !== 'undefined') {
  initializeAudio();
}

interface BalloonProps {
  letter: string;
  color: string;
  onClick: () => void;
}

/**
 * Balloon component with float and pop animations.
 * - Click -> pop animation, string falls, particles burst.
 * - onClick() is still called immediately so parent can remove or count score.
 */
const Balloon = ({ letter, color, onClick }: BalloonProps) => {
  const [isPopping, setIsPopping] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Generate per-instance particle directions so the burst looks organic.
  const particleAngles = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 8; i++) {
      // spread angles across 360° but clustered upwards
      arr.push(-100 + i * 25 + Math.round(Math.random() * 10 - 5));
    }
    return arr;
  }, []);

  // Simple Web Audio "pop" sound
  const playPop = async () => {
    try {
      const ctx = await ensureAudioReady();
      const now = ctx.currentTime;

      // Short noise burst
      const bufferSize = 0.03 * ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // white noise with quick decay
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Highpass to make it snappy
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 800;

      // Add a tiny pitched blip
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(hp).connect(gain);
      osc.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.05);
      osc.start(now);
      osc.stop(now + 0.12);
      
      // Clean up nodes after they're done playing
      const cleanup = () => {
        noise.disconnect();
        osc.disconnect();
        gain.disconnect();
        hp.disconnect();
      };
      
      // Set a timeout to clean up nodes after they're done playing
      setTimeout(cleanup, 200);
    } catch (error) {
      console.error('Error playing pop sound:', error);
    }
  };

  const handleClick = async () => {
    if (isPopping) return;
    setIsPopping(true);
    
    try {
      // Play the pop sound and wait for it to start
      await playPop();
    } catch (error) {
      console.error('Error in pop sound:', error);
    }
    
    // Call the parent's onClick handler
    onClick();
    
    // hide after full pop animation + particle animation (tweak timeout if you change CSS)
    window.setTimeout(() => setHidden(true), 950);
  };

  if (hidden) return null;

  return (
    <button
      onClick={handleClick}
      className={`relative group w-24 h-44 flex flex-col items-center justify-start bg-transparent border-0 p-0 ${
        isPopping ? "pointer-events-none" : ""
      }`}
      disabled={isPopping}
      aria-label={`Balloon ${letter}`}
    >
      {/* balloon */}
      <div
        className={`
          relative flex items-center justify-center
          w-24 h-28 rounded-[46px] shadow-[0_12px_20px_rgba(0,0,0,0.25)]
          transition-transform duration-300
          ${isPopping ? "animate-pop" : "animate-float hover:scale-110"}
          cursor-pointer
        `}
        style={{ backgroundColor: color }}
      >
        {/* glossy radial highlight */}
        <span
          aria-hidden
          className="absolute -top-2 -left-1 w-[85%] h-[60%] rounded-[50%] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 60%)",
            filter: "blur(1px)",
            mixBlendMode: "screen",
          }}
        />

        {/* subtle inner shadow for depth */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[46px]"
          style={{
            boxShadow: "inset -10px -16px 24px rgba(0,0,0,0.18), inset 8px 10px 18px rgba(255,255,255,0.25)",
          }}
        />

        <span className="text-5xl font-bold text-white drop-shadow-lg select-none">
          {letter}
        </span>

        {/* burst white flash circle */}
        <span
          className={`absolute inset-0 rounded-full opacity-0 pointer-events-none ${
            isPopping ? "pop-flash" : ""
          }`}
        />
        {/* particles */}
        {isPopping &&
          particleAngles.map((angle, i) => (
            <span
              key={i}
              className="particle"
              style={{
                // pass angle and small speed variation as CSS variables
                transform: `rotate(${angle}deg) translateY(0)`,
                // scale a bit randomly:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ["--particle-idx" as any]: i,
              }}
            />
          ))}

        {/* knot */}
        <span
          aria-hidden
          className="absolute -bottom-2 w-3 h-3 rotate-45"
          style={{
            background: color,
            borderRadius: "2px",
            boxShadow: "0 3px 4px rgba(0,0,0,0.25)",
          }}
        />
      </div>

      {/* string */}
      <div
        className={`w-[2px] h-10 mx-auto origin-top transition-all ${
          isPopping ? "string-fall" : ""
        }`}
      >
        <div
          className="w-full h-full bg-[rgba(0,0,0,0.22)]"
          style={{
            borderRadius: 2,
          }}
        />
      </div>

      {/* soft ground shadow */}
      <div
        aria-hidden
        className="absolute -bottom-1 w-16 h-4 rounded-full left-1/2 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.22), rgba(0,0,0,0) 70%)",
          filter: "blur(2px)",
          opacity: 0.6,
        }}
      />
    </button>
  );
};

export default Balloon;

