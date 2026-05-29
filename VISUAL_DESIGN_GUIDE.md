# 🎨 Pexy AI - Visual Design Guide

## 1. Home Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  ✨ Pexy AI                          [Get Started]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│        Your AI Co-Pilot for                            │
│        Everything                                       │
│                                                         │
│   Chat • Create Images • Generate Videos              │
│   Debug Code • Use Voice AI                           │
│                                                         │
│          [Start Now →]                                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                  POWERFUL FEATURES                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │      💬      │  │      🎨      │  │      🎬      │ │
│  │  AI Chat     │  │    Images    │  │    Videos    │ │
│  │              │  │              │  │              │ │
│  │ Ask anything │  │ Create pics  │  │ Generate    │ │
│  │ Get answers  │  │ from text    │  │ from text    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │      🔧      │  │      🎤      │                   │
│  │    Code      │  │    Voice     │                   │
│  │              │  │              │                   │
│  │ Debug & Gen  │  │ Text-to-Spee │                   │
│  │ code         │  │ with 6 voice │                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Ready to experience AI magic?                         │
│  No signup required. Start using Pexy AI instantly.   │
│           [Get Started Free]                          │
├─────────────────────────────────────────────────────────┤
│    © 2026 Pexy AI. Your AI Co-Pilot for Everything.   │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Chat Page

```
┌─────────────────────────────────────────────────────────┐
│  💬 AI Chat Assistant          [Persona: Teacher ▼]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ You: What is machine learning?                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ AI: Machine learning is a subset of           │   │
│  │ artificial intelligence that enables systems  │   │
│  │ to learn and improve from experience without  │   │
│  │ being explicitly programmed...                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ You: Can you give me an example?               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ⊙ ⊙ ⊙  (typing...)                               │   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Ask me anything...              ] [Send]            │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Image Generation Page

```
┌─────────────────────────────────────────────────────────┐
│  🎨 Image Generation                                    │
│  Create stunning images from text descriptions          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   LEFT PANEL:               │  RIGHT PANEL:            │
│  ┌──────────────────────┐  │  ┌──────────────────────┐│
│  │ Prompt:              │  │  │ Generated Images:   ││
│  │ [A futuristic city   │  │  │                     ││
│  │  at sunset]          │  │  │ ┌────────┐┌────────┐││
│  │  ┌─────────────────┐ │  │  │ │        ││        │││
│  │  │ ✨ Enhance      │ │  │  │ │ Image1 ││ Image2 │││
│  │  └─────────────────┘ │  │  │ │        ││        │││
│  │                      │  │  │ └────────┘└────────┘││
│  │ Size: [1024x1024 ▼] │  │  │                     ││
│  │ Style: [Artistic ▼] │  │  │ ┌────────┐┌────────┐││
│  │ Quality: [HD ▼]     │  │  │ │        ││        │││
│  │                      │  │  │ │ Image3 ││ Image4 │││
│  │ ┌──────────────────┐│  │  │ │        ││        │││
│  │ │ 🎨 Generate      ││  │  │ │        ││        │││
│  │ └──────────────────┘│  │  │ └────────┘└────────┘││
│  └──────────────────────┘  │  └─────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Code Assistant Page

```
┌─────────────────────────────────────────────────────────┐
│  🔧 Code Assistant                                      │
│  Debug, explain, and generate code with AI              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Language: [JavaScript ▼]  Action: [Debug ▼]          │
│                                                         │
│  LEFT:                     │  RIGHT:                   │
│  ┌────────────────────────┐│┌────────────────────────┐│
│  │ const x = null.map(i  ││ 🔍 Analysis:            ││
│  │   => i * 2);           ││                        ││
│  │                        ││ The error occurs because││
│  │ Error (optional):      ││ you're trying to call  ││
│  │ Cannot read properties ││ .map() on null         ││
│  │ of null                ││                        ││
│  │                        ││ Solution:              ││
│  │ ┌───────────────────┐ ││ Check if x exists      ││
│  │ │ 🔍 Debug Code     │ ││ before calling .map()  ││
│  │ └───────────────────┘ ││                        ││
│  │                        ││ Fixed code:            ││
│  │                        ││ if (x) {               ││
│  │                        ││   x.map(i => i * 2)   ││
│  │                        ││ }                      ││
│  └────────────────────────┘└────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Voice AI Page

```
┌─────────────────────────────────────────────────────────┐
│  🎤 Voice AI                                            │
│  Convert text to natural-sounding speech                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  LEFT PANEL:              │  RIGHT PANEL:             │
│  ┌────────────────────┐   │  ┌────────────────────┐   │
│  │ Text:              │   │  │ Generated Audio:   │   │
│  │ [Hello, this is    │   │  │                    │   │
│  │  Pexy AI. I can    │   │  │ 🎤 NOVA            │   │
│  │  help you with     │   │  │ [████░░░░░░] 0:15  │   │
│  │  anything]         │   │  │ ▶ ⏸ ⏹              │   │
│  │                    │   │  │                    │   │
│  │ Voice:             │   │  │ 🎤 ECHO            │   │
│  │ [🎙️ Nova ▼]       │   │  │ [██████░░░░░] 0:18 │   │
│  │                    │   │  │ ▶ ⏸ ⏹              │   │
│  │ ┌────────────────┐ │   │  │                    │   │
│  │ │ 🤖 ALLOY       │ │   │  │ 📢 ECHO            │   │
│  │ ├────────────────┤ │   │  │ 🎙️ FABLE          │   │
│  │ │ 📢 ECHO        │ │   │  │ 🎙️ ONYX           │   │
│  │ ├────────────────┤ │   │  │ ✨ NOVA            │   │
│  │ │ 📖 FABLE       │ │   │  │ 💫 SHIMMER         │   │
│  │ ├────────────────┤ │   │  │                    │   │
│  │ │ 🎙️ ONYX        │ │   │  │ Speed: 1.0x ▬▬░░   │   │
│  │ ├────────────────┤ │   │  │                    │   │
│  │ │ ✨ NOVA (sel)  │ │   │  │ ┌──────────────┐   │   │
│  │ ├────────────────┤ │   │  │ │ 🎵 Generate  │   │   │
│  │ │ 💫 SHIMMER     │ │   │  │ └──────────────┘   │   │
│  │ └────────────────┘ │   │  │                    │   │
│  │                    │   │  └────────────────────┘   │
│  └────────────────────┘   │                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Video Generation Page

```
┌─────────────────────────────────────────────────────────┐
│  🎬 Video Generation                                    │
│  Create videos from text descriptions                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  LEFT:                     │  RIGHT:                   │
│  ┌────────────────────────┐│┌───────────────────────┐ │
│  │ Prompt:                ││ Generated Video:      │ │
│  │ [A drone flying over   ││                       │ │
│  │  a mountain landscape] ││ Frame 1:   Frame 2:  │ │
│  │                        ││ ┌─────────┬─────────┐│ │
│  │ Duration: 5s ▬▬░░░░░░ ││ │         │         ││ │
│  │ FPS: [30 ▼]            ││ │ [Image] │ [Image] ││ │
│  │ Resolution: [720p ▼]   ││ │         │         ││ │
│  │                        ││ └─────────┴─────────┘│ │
│  │                        ││                       │ │
│  │ ┌──────────────────┐   ││ Frame 3:              │ │
│  │ │ 🎥 Generate      │   ││ ┌─────────────────┐  │ │
│  │ └──────────────────┘   ││ │     [Image]     │  │ │
│  │                        ││ │ processing...   │  │ │
│  │                        ││ └─────────────────┘  │ │
│  │                        ││                       │ │
│  └────────────────────────┘│ Status: Processing   │ │
│                             └───────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Color Scheme

```
PRIMARY GRADIENT:
┌─────────────────────────────────────────────┐
│ Cyan (#06b6d4)  ─────────► Purple (#a855f7) │
│ ✨ Sparkle, modern, AI-powered              │
└─────────────────────────────────────────────┘

ACCENT COLORS:
• Pink (#ec4899) - for highlights
• Blue (#0ea5e9) - for secondary actions
• Green (#10b981) - for success states
• Red (#ef4444) - for errors

BACKGROUNDS:
• Dark Slate (#0f172a) - main background
• Semi-transparent white - cards/panels
• Gradient overlays - animations
```

---

## 8. Pexy AI Logo Variations

```
SIMPLE LOGO:
┌──────────────┐
│ ✨ Pexy      │
└──────────────┘

MASCOT:
┌──────────────┐
│   ✨         │
│ (glowing)    │
└──────────────┘

LETTERMARK:
┌──────────────┐
│     [P]      │
│  (gradient)  │
└──────────────┘

WORDMARK:
┌──────────────────────────┐
│ ✨ Pexy AI               │
│ Your AI Co-Pilot        │
└──────────────────────────┘
```

---

## 9. Mobile View (Responsive)

```
┌─────────────────┐
│ ✨ Pexy    [≡]  │  ← Navigation
├─────────────────┤
│ 💬 AI Chat      │
│ [Ask anything]  │  ← Full width
├─────────────────┤
│ 🎨 Image Gen    │
│ [Create pics]   │
├─────────────────┤
│ 🎬 Video Gen    │
│ [Generate]      │
├─────────────────┤
│ 🔧 Code Helper  │
│ [Debug code]    │
├─────────────────┤
│ 🎤 Voice AI     │
│ [Text-to-spee]  │
└─────────────────┘
```

---

## 10. UI Components

```
BUTTONS:
• Primary: Gradient (Cyan → Purple)
• Secondary: White/10 with border
• Hover: Scale + shadow effect

INPUT FIELDS:
• Background: White/10
• Border: White/20
• Focus: Cyan/Purple border
• Placeholder: Gray text

CARDS:
• Background: White/10
• Border: White/20
• Rounded: 8-16px
• Shadow: Gradient glow on hover

ANIMATIONS:
• Float: 3s ease-in-out
• Pulse: Infinite opacity
• Slide: 0.3s ease-in-out
• Fade: 0.2s ease
```

---

## 11. Typography

```
HEADINGS:
H1: 48px, Bold, Gradient text
H2: 36px, Bold, White
H3: 24px, Semibold, White

BODY:
Regular: 16px, Regular, Gray-300
Small: 14px, Regular, Gray-400
Code: 14px, Mono, Gray-100

ALL TEXT:
Font: -apple-system, BlinkMacSystemFont, 'Segoe UI'
Antialiased: Yes
Smooth rendering: Yes
```

---

## 12. Dark Mode (Default)

```
✅ Dark backgrounds (#0f172a)
✅ Light text (white/gray)
✅ Gradient accents
✅ Glowing effects
✅ Smooth transitions

Perfect for:
• Late night use
• Reduced eye strain
• AI/tech aesthetic
• Professional look
```

---

## Summary

Pexy AI Features:
- ✨ Modern, minimalist design
- 🎨 Cyan + Purple gradient theme
- 💫 Smooth animations & transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌙 Dark mode optimized
- 🎯 Clean, intuitive UX
- ⚡ Fast, snappy interactions
- 🔥 Professional & premium feel

Ready to launch! 🚀
