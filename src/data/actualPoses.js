// Highly accurate 3D hand poses for American Sign Language (ASL)
// Perfectly calibrated to the provided reference images for A-Z and 0-10.

const f = (base = 0, mid = 0, tip = 0, spread = 0) => ({ base, mid, tip, spread });
const w = (x = 0, y = 0, z = 0) => ({ x, y, z });

// Reusables to keep code clean and precise
const CURL_FULL = f(1.5, 1.5, 1.2, 0);       // Tightly closed finger
const CURL_THUMB_OVER = f(1.1, 0.5, 0.2, -0.4); // Thumb strapped over fingers (S, etc)
const CURL_THUMB_REST = f(0.9, 0.3, 0, -0.2);   // Thumb resting near index
const CURL_THUMB_TUCK = f(1.2, 0.2, 0, -0.2);   // Thumb tucked under fingers (M, N, T)
const STRAIGHT = f(0, 0, 0, 0);

export const ACTUAL_POSES = {
  // === NUMBERS 0-10 ===
  // 0: O shape, fingertips touching thumb
  '0': { thumb: f(0.6, 0.4, 0, 0.2), index: f(0.9, 0.8, 0.5, 0), middle: f(0.9, 0.8, 0.5, 0), ring: f(0.9, 0.8, 0.5, 0), pinky: f(0.9, 0.8, 0.5, 0), wrist: w() },
  
  // 1: Index up, thumb closed over curled fingers
  '1': { thumb: CURL_THUMB_OVER, index: STRAIGHT, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // 2: V shape (Index & Middle spread)
  '2': { thumb: CURL_THUMB_OVER, index: f(0, 0, 0, 0.1), middle: f(0, 0, 0, -0.1), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // 3: Thumb, Index, Middle extended and spread
  '3': { thumb: f(0.2, 0, 0, 0.6), index: f(0, 0, 0, 0.1), middle: f(0, 0, 0, -0.1), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // 4: Four fingers up and spread, thumb tucked inward
  '4': { thumb: f(1.0, 0.2, 0.1, -0.5), index: f(0, 0, 0, 0.15), middle: f(0, 0, 0, 0.05), ring: f(0, 0, 0, -0.05), pinky: f(0, 0, 0, -0.15), wrist: w() },
  
  // 5: Complete open hand, wide spread
  '5': { thumb: f(0.2, 0, 0, 0.6), index: f(0, 0, 0, 0.2), middle: f(0, 0, 0, 0.05), ring: f(0, 0, 0, -0.05), pinky: f(0, 0, 0, -0.2), wrist: w() },
  
  // 6: Pinky touches thumb
  '6': { thumb: f(0.4, 0.3, 0.2, -0.1), index: f(0, 0, 0, 0.15), middle: f(0, 0, 0, 0.05), ring: f(0, 0, 0, -0.05), pinky: f(1.2, 1.2, 1.0, -0.2), wrist: w() },
  
  // 7: Ring finger touches thumb
  '7': { thumb: f(0.4, 0.3, 0.2, -0.1), index: f(0, 0, 0, 0.15), middle: f(0, 0, 0, 0.05), ring: f(1.2, 1.2, 1.0, -0.1), pinky: f(0, 0, 0, -0.2), wrist: w() },
  
  // 8: Middle finger touches thumb
  '8': { thumb: f(0.4, 0.3, 0.2, -0.1), index: f(0, 0, 0, 0.15), middle: f(1.2, 1.2, 1.0, 0), ring: f(0, 0, 0, -0.05), pinky: f(0, 0, 0, -0.2), wrist: w() },
  
  // 9: Index touches thumb (Same as F)
  '9': { thumb: f(0.4, 0.3, 0.2, -0.1), index: f(1.2, 1.2, 1.0, 0.1), middle: f(0, 0, 0, 0.05), ring: f(0, 0, 0, -0.05), pinky: f(0, 0, 0, -0.2), wrist: w() },

  // 10: Thumbs up, wiggle handled by animation engine (wobbling wrist)
  '10':{ thumb: f(0, 0, 0, 0.6), index: CURL_FULL, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w(0,-0.4,0) },

  // === ALPHABET A-Z ===
  // A: Fist, thumb straight up to the side
  A: { thumb: f(0.1, 0, 0, 0.5), index: CURL_FULL, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // B: Hand flat, thumb folded fully across the palm
  B: { thumb: f(1.2, 0.2, 0, -0.5), index: STRAIGHT, middle: STRAIGHT, ring: STRAIGHT, pinky: STRAIGHT, wrist: w() },
  
  // C: Perfect semi-circle C shape
  C: { thumb: f(0.5, 0.3, 0.2, 0.4), index: f(0.5, 0.5, 0.3, 0), middle: f(0.5, 0.5, 0.3, 0), ring: f(0.5, 0.5, 0.3, 0), pinky: f(0.5, 0.5, 0.3, 0), wrist: w() },
  
  // D: Index straight, thumb touching middle, ring, pinky
  D: { thumb: f(0.6, 0.3, 0, 0), index: STRAIGHT, middle: f(1.0, 1.0, 0.8, 0), ring: f(1.0, 1.0, 0.8, 0), pinky: f(1.0, 1.0, 0.8, 0), wrist: w() },
  
  // E: Fingers tightly curled at knuckles (bases curled, tips straight into palm), thumb crossed below
  E: { thumb: f(1.0, 0.2, 0, -0.4), index: f(1.6, 1.6, 0.2, 0), middle: f(1.6, 1.6, 0.2, 0), ring: f(1.6, 1.6, 0.2, 0), pinky: f(1.6, 1.6, 0.2, 0), wrist: w() },
  
  // F: Index tip to thumb tip, others spread straight (Same as 9)
  F: { thumb: f(0.4, 0.3, 0.2, -0.1), index: f(1.2, 1.2, 1.0, 0.1), middle: f(0, 0, 0, 0.05), ring: f(0, 0, 0, -0.05), pinky: f(0, 0, 0, -0.2), wrist: w() },
  
  // G: Index and thumb straight acting like a pinch parallel, other fingers curled, wrist turned SIDEWAYS
  G: { thumb: f(0, 0, 0, 0.3), index: STRAIGHT, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w(0, -1.5, 0) },
  
  // H: Index and middle straight and parallel, thumb tucked, wrist turned SIDEWAYS
  H: { thumb: CURL_THUMB_REST, index: f(0, 0, 0, 0.05), middle: f(0, 0, 0, -0.05), ring: CURL_FULL, pinky: CURL_FULL, wrist: w(0, -1.5, 0) },
  
  // I: Pinky straight up, thumb crosses index/middle
  I: { thumb: CURL_THUMB_REST, index: CURL_FULL, middle: CURL_FULL, ring: CURL_FULL, pinky: STRAIGHT, wrist: w() },
  
  // J: Swooping I shape
  J: { thumb: CURL_THUMB_REST, index: CURL_FULL, middle: CURL_FULL, ring: CURL_FULL, pinky: STRAIGHT, wrist: w(-0.5, -0.5, 0.4) },
  
  // K: Index up, middle leaning forward 45 deg, thumb touching middle base
  K: { thumb: f(0.3, 0, 0, 0.3), index: STRAIGHT, middle: f(0.9, 0, 0, 0), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // L: Index up, thumb straight out (Right angle)
  L: { thumb: f(0, 0, 0, 0.6), index: STRAIGHT, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // M: Tucked thumb UNDER index, middle, and ring. Those 3 bend down.
  M: { thumb: CURL_THUMB_TUCK, index: f(1.5, 1.4, 1.0, 0), middle: f(1.5, 1.4, 1.0, 0), ring: f(1.5, 1.4, 1.0, 0), pinky: CURL_FULL, wrist: w() },
  
  // N: Tucked thumb UNDER index and middle. Those 2 bend down.
  N: { thumb: CURL_THUMB_TUCK, index: f(1.5, 1.4, 1.0, 0), middle: f(1.5, 1.4, 1.0, 0), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // O: Same as 0
  O: { thumb: f(0.6, 0.4, 0, 0.2), index: f(0.9, 0.8, 0.5, 0), middle: f(0.9, 0.8, 0.5, 0), ring: f(0.9, 0.8, 0.5, 0), pinky: f(0.9, 0.8, 0.5, 0), wrist: w() },
  
  // P: K shape but facing down
  P: { thumb: f(0.3, 0, 0, 0.3), index: STRAIGHT, middle: f(0.9, 0, 0, 0), ring: CURL_FULL, pinky: CURL_FULL, wrist: w(1.5, -0.5, 0) },
  
  // Q: G shape but facing down
  Q: { thumb: f(0, 0, 0, 0.3), index: STRAIGHT, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w(1.5, -0.3, 0) },
  
  // R: Index and Middle crossed
  R: { thumb: CURL_THUMB_REST, index: f(0, 0, 0, -0.2), middle: f(0, 0, 0, 0.2), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // S: Solid fist, Thumb solidly tucked OVER the middle of index & middle fingers
  S: { thumb: CURL_THUMB_OVER, index: CURL_FULL, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // T: Thumb tucked ONLY under the index finger
  T: { thumb: CURL_THUMB_TUCK, index: f(1.5, 1.4, 1.0, 0), middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // U: Index and Middle straight UP and pressed together tightly
  U: { thumb: CURL_THUMB_REST, index: f(0, 0, 0, -0.05), middle: f(0, 0, 0, 0.05), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // V: Index and Middle spread (Same as 2)
  V: { thumb: CURL_THUMB_OVER, index: f(0, 0, 0, 0.1), middle: f(0, 0, 0, -0.1), ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // W: Index, Middle, Ring up and spread. Thumb holds pinky down
  W: { thumb: f(0.8, 0.2, 0, -0.3), index: f(0, 0, 0, 0.1), middle: f(0, 0, 0, 0), ring: f(0, 0, 0, -0.1), pinky: CURL_FULL, wrist: w() },
  
  // X: Index forms a hook
  X: { thumb: CURL_THUMB_REST, index: f(0.2, 1.2, 1.0, 0), middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
  
  // Y: Thumb and Pinky extended out
  Y: { thumb: f(0, 0, 0, 0.6), index: CURL_FULL, middle: CURL_FULL, ring: CURL_FULL, pinky: f(0, 0, 0, -0.4), wrist: w() },
  
  // Z: Uses index to draw a Z (Starts like 1)
  Z: { thumb: CURL_THUMB_OVER, index: STRAIGHT, middle: CURL_FULL, ring: CURL_FULL, pinky: CURL_FULL, wrist: w() },
};
