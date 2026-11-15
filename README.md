# THE DATA DETECTIVES
### Tagline: *Every Case Has a Secret. Every Clue Has Data.*
**College-Level IDSE Academic Project | Interactive 2D Educational Detective Game**

---

## 🔍 1. Executive Summary & Educational Vision

**THE DATA DETECTIVES** is an interactive 2D detective mystery game that teaches foundational and advanced **Data Science concepts through active criminal investigations**. 

Unlike conventional multiple-choice quizzes or dry academic tutorials, this game embeds real data operations directly into the investigation:
- **Removing duplicate records** teaches **Data Cleaning & De-duplication**.
- **Identifying corrupted telemetry** teaches **Missing Value Imputation**.
- **Comparing speeds & vehicle records** teaches **Measures of Central Tendency (Mean vs. Median vs. Mode)**.
- **Isolating offshore transactions** teaches **Outlier Detection via Interquartile Range (IQR)**.
- **Uncovering power grid sabotage** teaches **Correlation vs. Causation & Confounding Variables**.
- **Grouping smuggling coordinates** teaches **K-Means Clustering**.
- **Auditing misleading executive charts** teaches **Data Visualization Ethics & Truncated Axes**.
- **Predicting next heist locations** teaches **Supervised Machine Learning & Decision Classifiers**.
- **Fixing stadium vehicle surveys** teaches **Sampling Bias & Stratified Sampling**.
- **Tuning polynomial curves & model capacities** teaches **Overfitting, Generalization & The Bias-Variance Tradeoff**.
- **Unmasking "The Cipher"** brings together the **Complete End-to-End Data Science Pipeline**.

---

## 🎮 2. The 6-Stage Investigative Gameplay Loop

Every case follows a structured investigative cycle:

1. **Stage 1: Receive the Case (Briefing)**
   - Top-secret police docket detailing the incident narrative, location, timestamps, suspect photos, and mission objective.
2. **Stage 2: Investigate the Scene (Interactive Corkboard)**
   - Pinned physical evidence items (crime scene photos, CCTV stills, visitor registers, facility floorplans, witness statements).
   - Click to open the **Magnifying Glass Inspector** to view high-resolution forensic text and exhibits.
3. **Stage 3: Data Science Laboratory (Hands-on Workbench)**
   - Interactive, non-MCQ computational workbench. Perform real data transformations, run clustering iterations, slide statistical thresholds, and adjust machine learning model hyperparameters.
4. **Stage 4: Connect the Evidence (Red String Board)**
   - Click pushpins on evidence items to draw interactive red yarn strings, linking physical clues to mathematical findings.
5. **Stage 5: Final Investigation (Accusation Chamber)**
   - Cross-examine suspect statements against mathematical ground truth. If incorrect, the bureau provides specific deductive contradiction feedback; if correct, triggers case closure.
6. **Stage 6: Learning Report & Badge Collectible**
   - Official resolution dossier answering:
     1. *What happened in the case?*
     2. *What did you discover?*
     3. *Which Data Science concept was used?*
     4. *What does this concept mean?*
     5. *Where is it used in real life?*
   - Awards coins, XP, and a unique collectible curriculum badge.

---

## 📚 3. Curriculum & 15 Progressive Cases

### Chapter 1: Junior Detective (Foundations & Cleaning)
- **Case 001: The Missing Trophy** — *Data Collection, Observation & Tabular Structuring*
- **Case 002: The Confused Witness** — *Sorting, Multi-Attribute Filtering & Compound Logic*
- **Case 003: The Duplicate Identity** — *Duplicate Data Cleaning & Temporal Primary Key Collisions*
- **Case 004: The Missing Records** — *Missing Values, NaN Handling & Linear Imputation*
- **Case 005: The Suspicious Visitor** — *Frequency Distributions, Value Aggregations & Baselines*

### Chapter 2: Senior Detective (Statistics & Patterns)
- **Case 006: The Impossible Getaway** — *Measures of Central Tendency (Mean vs. Median vs. Mode)*
- **Case 007: The Unusual Suspect** — *Tukey’s Boxplot Outlier Fences (IQR = Q3 - Q1)*
- **Case 008: The Connected Crimes** — *Pearson Correlation (r) vs. Causation & Confounding Variables*
- **Case 009: The Hidden Groups** — *Unsupervised Machine Learning & 2D K-Means Clustering*
- **Case 010: The Misleading Evidence** — *Data Visualization Ethics, Truncated Y-Axes & Scale Integrity*

### Chapter 3: Master Detective (Machine Learning & The Mastermind)
- **Case 011: The Predictive Criminal** — *Supervised Machine Learning & Decision Tree Classification*
- **Case 012: The Biased Investigation** — *Convenience Sampling Bias vs. Stratified Random Sampling*
- **Case 013: The Overconfident Detective** — *Overfitting, Train vs. Test Split & Polynomial Complexity*
- **Case 014: The Accuracy Dilemma** — *The Bias-Variance Tradeoff & Model Capacity Optimization*
- **Case 015: The Mastermind** — *End-to-End 5-Stage Data Science Investigation Pipeline*

---

## 💰 4. Coin Economy & Informant Network

- **Starting Balance:** 100 Coins
- **Case Rewards:** 150c (Easy), 250c (Intermediate), 400c (Advanced), 500c (Boss Case)
- **Informant Clue Tiers:**
  - *Small Hint:* 10 Coins
  - *Evidence Highlight:* 25 Coins
  - *Step-by-Step Guidance:* 40 Coins
  - *Advanced Intelligence:* 60 Coins
- Prevents buying if funds are insufficient; saves permanently to `localStorage`.

---

## 🎖️ 5. Detective Rank Progression Ladder

1. **Junior Detective** (Cases 0–3)
2. **Field Investigator** (Cases 4–7)
3. **Senior Investigator** (Cases 8–11)
4. **Chief Detective** (Cases 12–14)
5. **Master Detective** (Case 15 Solved)

---

## 💻 6. Technical Stack & Offline Audio

- **Frontend:** React 19 + TypeScript (strict component architecture)
- **Styling:** Tailwind CSS with custom noir detective textures (corkboard, aged paper, pushed pins, desk lamp illumination)
- **Sound Engine:** Procedural Web Audio API sound generator (instant latency, zero missing mp3 files, typewriter keys, corkboard pins, yarn twangs, stamp thuds, and fanfare)
- **Data Math:** Pure TypeScript mathematical functions for Mean, Median, Mode, IQR, Pearson $r$, 2D K-Means, and Bias-Variance curves
- **Storage:** Browser `localStorage` state management

---

## 🚀 7. Running the Game

### Prerequisites
- Node.js (v18+) and npm

### Quick Start
```bash
# 1. Navigate to directory
cd data-detectives

# 2. Launch development server
npm run dev -- --host --port 5173
```
Or simply double-click `start-game.bat` on Windows!

Open your browser at:
`http://localhost:5173/`
