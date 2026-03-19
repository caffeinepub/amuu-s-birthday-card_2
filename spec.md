# Amuu's Birthday Card

## Current State
New project, no existing application.

## Requested Changes (Diff)

### Add
- Full interactive birthday card experience with multiple scenes/screens
- Adorable CSS/SVG teddy bear guide with speech bubbles
- Scene 1: Night sky opening with stars, "It's Amuu's Birthday ✨", Start button
- Scene 2: Birthday cake with clickable candles (blow out → confetti + hearts explosion)
- Scene 3: Cake cutting animation
- Scene 4: 3-4 gift boxes, each revealing a unique cute joke + heartfelt message
- Scene 5: Envelopes, each with a unique personality compliment
- Scene 6: Mini word-reveal game (Kind, Lovely, Bright, Special)
- Scene 7: Teddy gives virtual hug animation
- Scene 8: Romantic confession ending - text appears slowly: "Amuu… you are really special to me…" / "and there's something I've been wanting to say…" / ❤️ I love you Amuu
- Scene 9: Fireworks forming "Happy Birthday Amuu" in the sky, teddy waves goodbye
- Smooth transitions between all scenes
- Pastel color palette (pink, lavender, mint, peach)
- Floating hearts, sparkles, stars throughout
- Background music-ready (no actual audio, just visual polish)

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Minimal Motoko backend (greeting actor)
2. Frontend: multi-scene state machine with smooth animated transitions
3. CSS/SVG teddy bear character - ultra cute with big eyes, soft colors
4. Each scene fully animated with canvas or CSS animations
5. Gift box messages: mix of cute jokes + heartfelt messages (all unique)
   - "Why did the teddy bear say no to dessert? Because she was already sweet enough — just like you!"
   - "You make every ordinary day feel like a celebration"
   - "What do you call someone who makes everyone around them smile? Amuu."
   - "I'm so grateful the universe decided to put you in my world"
6. Envelope compliments (personality-focused, all unique):
   - "Your kindness is the kind that changes people"
   - "You have this rare warmth that makes everyone feel at home"
   - "The way you care — quietly, deeply, genuinely — is one of the most beautiful things about you"
   - "You don't just brighten rooms, you brighten people's whole weeks"
7. Word reveal mini game: tap/click letters to reveal Kind, Lovely, Bright, Special
8. Romantic confession scene with slow typewriter text
9. Fireworks canvas animation with "Happy Birthday Amuu" text
10. Teddy waving animation on final scene
