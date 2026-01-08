import { useState, useEffect, useRef, useCallback } from 'react'

const quotes = [
  { text: "Niggas out here really broke… Luckily we ain't niggas", artist: "DFine" },
  { text: "I got ten missed calls, all my bitches mad at me", artist: "BossMan Dlow" },
  { text: "How tf y'all bout to drown me when I'm the one who caused the wave", artist: "BossMan Dlow" },
  { text: "Off this drank, I bet I catch a opp before I catch a cold", artist: "Pooh Shiesty" },
  { text: "Niggas ain't got more money than my bitches", artist: "BossMan Dlow" },
  { text: "You running your fuckin' mouth, I'm tryna run it up", artist: "BossMan Dlow" },
  { text: "I go get free shit out the store 'cause I'm fuckin' the clerk", artist: "Pooh Shiesty" },
  { text: "He got out the kitchen when he found out he couldn't take the heat", artist: "Pooh Shiesty" },
  { text: "Have you ever spent a million dollars on a rainy day?", artist: "Young Dolph" },
  { text: "Main slime, king snake, niggas know exactly what I am", artist: "Pooh Shiesty" },
  { text: "Pocket watching? You need to watch your weight", artist: "Moneybagg Yo" },
  { text: "I'm allergic to broke niggas", artist: "Key Glock" },
  { text: "You running your mouth, I'm running up a check", artist: "BossMan Dlow" },
  { text: "I'm focused on the bag, you focused on the past", artist: "Future" },
  { text: "I'm a hustler baby, I sell water to a well", artist: "Jay-Z" },
  { text: "Soon as I found out money never sleep, I'm taking my bed out the house", artist: "Veeze" },
  { text: "I'll make that bitch hold the blicky before we hold hands", artist: "Veeze" },
  { text: "AR with the silencer at the end like a bad joke", artist: "Cash Kidd" },
  { text: "I let the money do the talking, I'm a mime", artist: "Key Glock" },
  { text: "Bitch asked me do I love her? I love Wockhardt", artist: "Rio Da Yung OG" },
  { text: "I'm rude as hell, I need to learn some manners, but I'm rich", artist: "Key Glock" },
  { text: "My pockets full of dead guys, it's a cemetery", artist: "Lil Uzi Vert" },
  { text: "I really hate a sober bitch, they be too opinionated", artist: "Rio Da Yung OG" },
  { text: "Bitch asked for a ring, so I bought her a Ring camera", artist: "Cash Kidd" },
  { text: "I bought a brand new watch and it cost a brand new car", artist: "Rylo Rodriguez" },
  { text: "I ran out of rubber bands, I had to use a shoelace", artist: "Young Dolph" },
  { text: "The way I'm chasing money, I might catch a speeding ticket", artist: "Kodak Black" },
  { text: "I don't even check the weather, I make it rain regardless", artist: "Lil Wayne" },
  { text: "I tried to put the money in the safe, but the door wouldn't close", artist: "Young Dolph" },
  { text: "Every time I look in the mirror, I see a threat", artist: "Rick Ross" },
  { text: "They waiting on me to fall, tell 'em bring a chair", artist: "Moneybagg Yo" },
  { text: "Unc asked to borrow fifty dollars, I told him I ain't got it... while counting fifty thousand", artist: "Rio Da Yung OG" },
  { text: "She asked me 'What are we?', I said 'We rich'", artist: "Future" },
  { text: "My auntie said I need to settle down... I told her I settle for nothing", artist: "Babyface Ray" },
  { text: "I told the mechanic 'Put a turbo on it'... I want to get to the money faster", artist: "Curren$y" },
  { text: "She asked if I'm free tonight... I told her 'Nothing about me is free'", artist: "Future" },
  { text: "Teacher told me 'Pay attention'... I told her 'I pay in cash'", artist: "Young Dolph" },
  { text: "I told the cameraman 'Get my good side'... and pointed at my pocket", artist: "Peewee Longway" },
  { text: "She asked 'What's your body count?'... I said 'I only count checks'", artist: "Young Dolph" },
  { text: "She said 'You act like you don't need nobody'... I said 'I need a accountant, that's it'", artist: "Babyface Ray" },
  { text: "I told the doctor 'I'm sick'... sick of being the realest nigga in the room", artist: "Boosie Badazz" },
  { text: "I keep an EPI Pen I'm allergic to losing", artist: "DFine" },
  { text: "I just took a bar got a bad bitch in my double R, staring at the ceiling I said girl u with a star", artist: "DFine" }
]

// Color themes: green (default), red, purple, blue
const colorThemes = [
  { main: '#00FF41', dim: '#00cc34', glow: 'rgba(0, 255, 65, 0.4)', hoverBg: 'rgba(0, 255, 65, 0.1)' },
  { main: '#FF4141', dim: '#cc3434', glow: 'rgba(255, 65, 65, 0.4)', hoverBg: 'rgba(255, 65, 65, 0.1)' },
  { main: '#A855F7', dim: '#9333ea', glow: 'rgba(168, 85, 247, 0.4)', hoverBg: 'rgba(168, 85, 247, 0.1)' },
  { main: '#3B82F6', dim: '#2563eb', glow: 'rgba(59, 130, 246, 0.4)', hoverBg: 'rgba(59, 130, 246, 0.1)' },
]

// Animation styles
const animations = [
  'fade-up',
  'fade-down',
  'scale',
  'slide-left',
  'slide-right',
  'blur',
  'rotate',
  'glitch'
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * quotes.length))
  const [isVisible, setIsVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [colorIndex, setColorIndex] = useState(0) // Start with green
  const [animStyle, setAnimStyle] = useState('fade-up')
  const audioRef = useRef(null)

  const currentQuote = quotes[currentIndex]
  const currentColor = colorThemes[colorIndex]

  const getRandomIndex = useCallback((excludeIndex) => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * quotes.length)
    } while (newIndex === excludeIndex)
    return newIndex
  }, [])

  const getRandomAnimation = useCallback((excludeAnim) => {
    let newAnim
    do {
      newAnim = animations[Math.floor(Math.random() * animations.length)]
    } while (newAnim === excludeAnim)
    return newAnim
  }, [])

  const handleRunItBack = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true)
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
        setIsMuted(false)
      }
    }

    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex(prev => getRandomIndex(prev))
      setColorIndex(prev => (prev + 1) % colorThemes.length)
      setAnimStyle(prev => getRandomAnimation(prev))
      setIsVisible(true)
    }, 300)
  }, [getRandomIndex, getRandomAnimation, hasInteracted])

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {})
      }
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [])

  // Dynamic glow style for text
  const textGlowStyle = {
    color: currentColor.main,
    textShadow: `0 0 10px ${currentColor.glow}, 0 0 20px ${currentColor.glow}, 0 0 30px ${currentColor.glow}`
  }

  return (
    <div className="noise-bg crt-flicker min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background effects */}
      <div className="scanlines" />

      {/* Audio element */}
      <audio ref={audioRef} src="/Zillionaire Doe - Set In Stone (Official Video).mp3" muted={isMuted} />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="cursor-blink text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider mb-12 md:mb-16"
            style={textGlowStyle}>
          D POSITIVITY TERMINAL
        </h1>

        {/* Quote container */}
        <div className="min-h-[200px] md:min-h-[250px] flex flex-col items-center justify-center mb-10 md:mb-14">
          <div
            className={`anim-${animStyle}-${isVisible ? 'visible' : 'hidden'}`}
          >
            {/* Quote text */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6 md:mb-8 px-2"
                        style={{ color: '#ffffff' }}>
              "{currentQuote.text}"
            </blockquote>

            {/* Artist name */}
            <p className="text-sm sm:text-base md:text-lg tracking-widest uppercase"
               style={{ color: currentColor.dim }}>
              — {currentQuote.artist}
            </p>
          </div>
        </div>

        {/* Run it back button */}
        <button
          onClick={handleRunItBack}
          className="group relative px-8 py-4 text-sm sm:text-base font-bold tracking-widest uppercase
                     border-2 transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'transparent',
            borderColor: currentColor.main,
            color: currentColor.main,
            boxShadow: `0 0 15px ${currentColor.glow}`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 25px ${currentColor.glow}, 0 0 40px ${currentColor.glow}, inset 0 0 15px ${currentColor.hoverBg}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 15px ${currentColor.glow}`
          }}
        >
          <span className="relative z-10">&gt; RUN_IT_BACK</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
               style={{ backgroundColor: currentColor.hoverBg }} />
        </button>
      </div>

      {/* Mute/Unmute button with arrow hint */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Arrow hint when muted */}
        {isMuted && (
          <div className="arrow-bounce flex items-center gap-2" style={{ color: currentColor.main }}>
            <span className="text-sm font-bold tracking-wide opacity-60">UNMUTE</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        )}

        <button
          onClick={toggleMute}
          className={`p-5 border-2 transition-all duration-200 hover:scale-110 ${isMuted ? 'pulsate' : ''}`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderColor: currentColor.main,
            color: currentColor.main,
            '--pulse-color': currentColor.glow
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 text-xs opacity-20" style={{ color: currentColor.main }}>
        ┌──────────
      </div>
      <div className="fixed top-4 right-4 text-xs opacity-20" style={{ color: currentColor.main }}>
        ──────────┐
      </div>
      <div className="fixed bottom-4 left-4 text-xs opacity-20" style={{ color: currentColor.main }}>
        └──────────
      </div>
    </div>
  )
}

export default App
