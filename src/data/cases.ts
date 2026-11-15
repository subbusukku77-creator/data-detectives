import { CaseData } from '../types/game';

export const CASE_LIST: CaseData[] = [
  // ==========================================
  // CHAPTER 1: JUNIOR DETECTIVE (EASY)
  // ==========================================
  {
    id: 'case-001',
    caseNumber: 1,
    chapter: 1,
    title: 'The Missing Trophy',
    subtitle: 'Golden trophy vanished from the exhibition hall',
    difficulty: 'Easy',
    rewardCoins: 150,
    rewardXp: 100,
    briefing: {
      crimeDescription: 'A solid gold academic trophy disappeared from the Oakridge Academy exhibition hall between 2:00 PM and 3:00 PM. Five individuals were registered in the wing, but their witness reports and sign-in sheets are scrambled across scribbled notes.',
      location: 'Oakridge Academy Exhibition Wing',
      incidentTime: 'Friday, 2:00 PM - 3:00 PM',
      initialClues: [
        'Trophy was intact on the pedestal at 2:00 PM.',
        'Pedestal was found empty by the janitor at 3:05 PM.',
        'Five people were logged entering or exiting the hall.',
        'One suspect carried an oversized gym duffel bag upon leaving.'
      ],
      missionObjective: 'Organize raw observation fragments into a structured dataset. Filter by departure time and carried items to identify the thief.'
    },
    evidenceList: [
      {
        id: 'ev-101',
        title: 'Empty Display Pedestal',
        type: 'photo',
        x: 18,
        y: 20,
        rotation: -4,
        shortDesc: 'Crime Scene Photograph',
        content: 'Photograph of the velvet-lined pedestal. Glass case lock was picked without damage. No fingerprints on glass.',
        tag: 'Crime Scene'
      },
      {
        id: 'ev-102',
        title: 'Hallway Entrance CCTV',
        type: 'cctv',
        x: 48,
        y: 16,
        rotation: 3,
        shortDesc: 'Time-stamped corridor video log',
        content: 'Corridor footage shows five individuals passing through the wing between 2:00 PM and 3:00 PM. Each carried different accessories.',
        tag: 'Surveillance'
      },
      {
        id: 'ev-103',
        title: 'Scrambled Visitor Notes',
        type: 'document',
        x: 78,
        y: 22,
        rotation: -2,
        shortDesc: 'Security guard raw notepad',
        content: 'Unstructured notes: "Marcus arrived 2:05 with backpack, Leo exited 2:40 with gym duffel, Sarah entered 2:15 empty-handed, Elena arrived 2:30 with folder, Arthur left 2:55 with umbrella."',
        tag: 'Raw Data'
      },
      {
        id: 'ev-104',
        title: 'Academy Floor Plan',
        type: 'map',
        x: 32,
        y: 65,
        rotation: 2,
        shortDesc: 'Exhibition wing layout',
        content: 'The exhibition hall has only one monitored front exit and an emergency exit door that triggers an alarm if opened. No alarm was tripped.',
        tag: 'Blueprint'
      },
      {
        id: 'ev-105',
        title: 'Janitor Witness Log',
        type: 'witness',
        x: 68,
        y: 66,
        rotation: -5,
        shortDesc: 'Statement from Janitor Frank',
        content: 'Saw a student quickly hurrying toward the courtyard at roughly 2:42 PM holding a heavy gym bag with metal clanking inside.',
        tag: 'Testimony'
      }
    ],
    suspects: [
      {
        id: 'susp-101',
        name: 'Marcus Vance',
        age: 19,
        role: 'History Student',
        avatarColor: '#3b82f6',
        alibi: 'Studying manuscripts in the library reading corner.',
        motive: 'Wanted to examine the historical gold hallmarks.',
        traits: ['Backpack', 'Glasses', 'Left at 2:20 PM'],
        isCulprit: false,
        contradiction: 'Marcus departed at 2:20 PM with only a thin notebook, verified by CCTV.'
      },
      {
        id: 'susp-102',
        name: 'Leo "Swift" Sterling',
        age: 20,
        role: 'Varsity Athlete',
        avatarColor: '#ef4444',
        alibi: 'Claims he was in the locker room getting water.',
        motive: 'Owed debts to local bookmakers and needed fast pawn cash.',
        traits: ['Oversized Duffel Bag', 'Departed 2:40 PM', 'Nervous'],
        isCulprit: true,
        contradiction: 'Leo was observed exiting at 2:40 PM carrying a heavy duffel bag matching the dimensions of the trophy!'
      },
      {
        id: 'susp-103',
        name: 'Sarah Jenkins',
        age: 21,
        role: 'Exhibition Curator',
        avatarColor: '#10b981',
        alibi: 'Organizing art catalogs in the south storage.',
        motive: 'Disliked the academy board.',
        traits: ['Empty Handed', 'Left at 3:10 PM'],
        isCulprit: false,
        contradiction: 'Sarah did not exit the hall until 3:10 PM, after the theft had already occurred.'
      },
      {
        id: 'susp-104',
        name: 'Elena Rostova',
        age: 22,
        role: 'Exchange Student',
        avatarColor: '#8b5cf6',
        alibi: 'Taking photos for school newsletter.',
        motive: 'None found.',
        traits: ['Slim Folder', 'Camera', 'Left at 2:45 PM'],
        isCulprit: false,
        contradiction: 'Elena carried only a paper folder and camera around her neck.'
      }
    ],
    correctConnections: [
      { from: 'ev-102', to: 'ev-103' },
      { from: 'ev-103', to: 'ev-105' },
      { from: 'ev-105', to: 'ev-101' }
    ],
    dsConcept: {
      name: 'Data Collection & Organization',
      description: 'Raw information in real life is messy, unstructured, and scattered. Data Science begins by structuring raw observations into standardized columns (tables), allowing systematic inspection.',
      instructions: 'Examine the raw text fragments. Place each visitor into the structured table and filter the suspect who departed between 2:30 PM - 2:45 PM with a large container.'
    },
    hints: [
      { id: 'small', title: 'Small Clue', cost: 10, description: 'Time of departure', text: 'The janitor heard clanking metal at approximately 2:42 PM. Focus on who left right before that.' },
      { id: 'highlight', title: 'Evidence Highlight', cost: 25, description: 'Highlight critical notes', text: 'Look closely at the Scrambled Visitor Notes regarding Leo Sterling.' },
      { id: 'step', title: 'Step-by-Step Guidance', cost: 40, description: 'Structuring guidance', text: 'Check the item carried column in the structured table. Only one bag was large enough to hold a 40cm trophy.' },
      { id: 'advanced', title: 'Advanced Deduction', cost: 60, description: 'Definitive profile', text: 'Leo Sterling left at 2:40 PM with an oversized gym duffel bag. His alibi is completely contradicted by the data.' }
    ],
    learningReport: {
      whatHappened: 'Leo Sterling stole the trophy from the display pedestal and concealed it inside a sports gym duffel.',
      whatDiscovered: 'Converting unstructured witness scribbles into a structured tabular dataset revealed the exact correlation between departure time (2:40 PM) and cargo size.',
      conceptName: 'Data Collection & Tabular Structuring',
      conceptDefinition: 'Data Collection is the systematic gathering and measuring of raw information from diverse sources. Structuring converts messy qualitative notes into rows and columns (schema) for rigorous analysis.',
      realWorldApplication: 'Used by fraud investigators, cybersecurity analysts, and logistics companies to turn raw text logs into queryable database tables.',
      formulaOrRule: 'Structured Table = Schema(Identifier, Timestamp, Location, Attributes)',
      badgeTitle: 'Junior Data Collector',
      badgeIcon: 'Database'
    },
    dataset: {
      type: 'structuring',
      rawSnippets: [
        { text: 'Marcus Vance entered at 2:05 PM, exited at 2:20 PM with small notebook.' },
        { text: 'Leo Sterling entered at 2:10 PM, exited at 2:40 PM carrying heavy gym duffel.' },
        { text: 'Sarah Jenkins entered at 2:15 PM, remained until 3:10 PM, no bag.' },
        { text: 'Elena Rostova entered at 2:30 PM, exited at 2:45 PM with slim camera strap.' },
        { text: 'Arthur Pendelton entered at 2:20 PM, exited at 2:55 PM carrying umbrella.' }
      ],
      targetTableColumns: ['Name', 'Entry Time', 'Exit Time', 'Item Carried', 'Suspicion Score'],
      structuredRows: [
        { name: 'Marcus Vance', entry: '2:05 PM', exit: '2:20 PM', item: 'Notebook', suspicious: 'Low' },
        { name: 'Leo Sterling', entry: '2:10 PM', exit: '2:40 PM', item: 'Gym Duffel', suspicious: 'VERY HIGH' },
        { name: 'Sarah Jenkins', entry: '2:15 PM', exit: '3:10 PM', item: 'None', suspicious: 'Low' },
        { name: 'Elena Rostova', entry: '2:30 PM', exit: '2:45 PM', item: 'Camera', suspicious: 'Low' },
        { name: 'Arthur Pendelton', entry: '2:20 PM', exit: '2:55 PM', item: 'Umbrella', suspicious: 'Low' }
      ]
    }
  },

  // Case 2: THE CONFUSED WITNESS (Sorting & Filtering)
  {
    id: 'case-002',
    caseNumber: 2,
    chapter: 1,
    title: 'The Confused Witness',
    subtitle: 'Robbery at Grand Metro Bank vault',
    difficulty: 'Easy',
    rewardCoins: 150,
    rewardXp: 120,
    briefing: {
      crimeDescription: 'A safety deposit box containing bearer bonds was raided during a lightning heist. The security guard was disoriented by tear gas, but recalled three distinct features: the thief was at least 180 cm tall, wore a Navy Blue Coat, and wore a gold wristwatch.',
      location: 'Grand Metro Bank Main Branch',
      incidentTime: 'Monday, 11:15 AM',
      initialClues: [
        'Security sensor caught 8 people in the vault corridor.',
        'Height sensor data recorded exact heights in centimeters.',
        'Coat color and accessory tags were cataloged in security logs.'
      ],
      missionObjective: 'Use multi-attribute sorting and filtering to isolate the suspect who satisfies all three witness constraints.'
    },
    evidenceList: [
      { id: 'ev-201', title: 'Tear Gas Canister', type: 'photo', x: 20, y: 25, rotation: -3, shortDesc: 'Disabling device recovered', content: 'Military grade smoke canister. Used to blind cameras and the guard.', tag: 'Forensics' },
      { id: 'ev-202', title: 'Vault Corridor Log', type: 'document', x: 50, y: 18, rotation: 1, shortDesc: 'Automated biometric scanner log', content: 'Table of 8 individuals with Height, Coat Color, and Accessories logged.', tag: 'Database' },
      { id: 'ev-203', title: 'Guard Statement', type: 'witness', x: 80, y: 28, rotation: 4, shortDesc: 'Officer Miller testimony', content: '"He was tall, at least 180cm, Navy coat, and I saw a gold wristwatch reflect under the red emergency lights."', tag: 'Witness' },
      { id: 'ev-204', title: 'Locker Rental Agreement', type: 'document', x: 35, y: 68, rotation: -2, shortDesc: 'Rented under false alias', content: 'Box 412 was accessed with a forged magnetic keycard at 11:14 AM.', tag: 'Record' }
    ],
    suspects: [
      { id: 'susp-201', name: 'Julian Drake', age: 34, role: 'Accountant', avatarColor: '#0284c7', alibi: 'Depositing client cheques.', motive: 'Gambling debt.', traits: ['Height: 172cm', 'Coat: Navy', 'Watch: Gold'], isCulprit: false, contradiction: 'Julian is only 172 cm tall, failing the height constraint.' },
      { id: 'susp-202', name: 'Victor Crane', age: 41, role: 'Logistics Broker', avatarColor: '#dc2626', alibi: 'Accessing personal lockbox.', motive: 'Facing bankruptcy.', traits: ['Height: 184cm', 'Coat: Navy', 'Watch: Gold'], isCulprit: true, contradiction: 'Victor is 184 cm, wore a Navy coat, and wore a gold wristwatch, uniquely matching every filter condition!' },
      { id: 'susp-203', name: 'Mason Wells', age: 28, role: 'Courier', avatarColor: '#16a34a', alibi: 'Delivering sensitive paperwork.', motive: 'None.', traits: ['Height: 182cm', 'Coat: Black', 'Watch: Silver'], isCulprit: false, contradiction: 'Mason wore a black coat and a silver watch.' },
      { id: 'susp-204', name: 'Tobias Shaw', age: 45, role: 'Security Technician', avatarColor: '#ca8a04', alibi: 'Testing camera feeds.', motive: 'Inside job opportunity.', traits: ['Height: 179cm', 'Coat: Navy', 'Watch: Leather Strap'], isCulprit: false, contradiction: 'Tobias is under 180 cm and wore a leather strap watch.' }
    ],
    correctConnections: [
      { from: 'ev-202', to: 'ev-203' },
      { from: 'ev-203', to: 'ev-204' }
    ],
    dsConcept: {
      name: 'Sorting & Multi-Attribute Filtering',
      description: 'Filtering narrows down large datasets to rows matching specific Boolean conditions (AND / OR logic). Sorting arranges numerical or textual values in ascending or descending sequence to rapidly inspect boundaries.',
      instructions: 'Apply filters: Height >= 180, Coat == "Navy", Accessory == "Gold Watch" to narrow down the dataset.'
    },
    hints: [
      { id: 'small', title: 'Filter Order', cost: 10, description: 'Where to start', text: 'Start by filtering Height >= 180 cm. That eliminates half the suspects immediately.' },
      { id: 'highlight', title: 'Coat Color', cost: 25, description: 'Check coat color', text: 'Only three suspects wore Navy coats.' },
      { id: 'step', title: 'Watch Type', cost: 40, description: 'Accessory check', text: 'Examine who wore a Gold Watch among the tall navy coat wearers.' },
      { id: 'advanced', title: 'Exact Match', cost: 60, description: 'Definitive record', text: 'Victor Crane is 184cm, Navy coat, Gold watch. He is the only exact intersection.' }
    ],
    learningReport: {
      whatHappened: 'Victor Crane slipped into the vault, used a smoke canister, and cracked safe deposit box 412.',
      whatDiscovered: 'Applying compound Boolean filters (Height >= 180 AND Coat == "Navy" AND Accessory == "Gold Watch") reduced 8 suspects down to 1 definitive perpetrator.',
      conceptName: 'Data Filtering & Query Logic',
      conceptDefinition: 'Filtering applies predicates (logical conditions) to a dataset to retain only records meeting specific criteria, filtering out noise and non-relevant data.',
      realWorldApplication: 'SQL WHERE clauses, e-commerce faceted search, police biometric databases, and clinical medical trial participant selection.',
      formulaOrRule: 'Subset = { x ∈ Dataset | Height(x) ≥ 180 ∧ Coat(x) = "Navy" ∧ Watch(x) = "Gold" }',
      badgeTitle: 'Filter Specialist',
      badgeIcon: 'Filter'
    },
    dataset: {
      type: 'filtering',
      records: [
        { id: 1, name: 'Julian Drake', height: 172, coat: 'Navy', watch: 'Gold', badge: 'Visitor-1' },
        { id: 2, name: 'Victor Crane', height: 184, coat: 'Navy', watch: 'Gold', badge: 'Visitor-2' },
        { id: 3, name: 'Mason Wells', height: 182, coat: 'Black', watch: 'Silver', badge: 'Courier-9' },
        { id: 4, name: 'Tobias Shaw', height: 179, coat: 'Navy', watch: 'Leather', badge: 'Tech-4' },
        { id: 5, name: 'Gavin Ross', height: 186, coat: 'Brown', watch: 'Gold', badge: 'Visitor-5' },
        { id: 6, name: 'Felix Meyer', height: 175, coat: 'Navy', watch: 'Digital', badge: 'Visitor-6' },
        { id: 7, name: 'Derrick Vance', height: 188, coat: 'Grey', watch: 'Gold', badge: 'Visitor-7' },
        { id: 8, name: 'Liam O’Connor', height: 181, coat: 'Navy', watch: 'None', badge: 'Visitor-8' }
      ]
    }
  },

  // Case 3: THE DUPLICATE IDENTITY (Duplicate Data Removal)
  {
    id: 'case-003',
    caseNumber: 3,
    chapter: 1,
    title: 'The Duplicate Identity',
    subtitle: 'RFID spoofing at BioTech Genetic Lab',
    difficulty: 'Easy',
    rewardCoins: 150,
    rewardXp: 130,
    briefing: {
      crimeDescription: 'A classified viral vaccine formula was downloaded from the BioTech Cleanroom server. The access door log showed 14 entry records, but security knows only 8 authorized scientists entered the building. Someone cloned an employee RFID badge!',
      location: 'Apex BioTech Cleanroom Lab 4',
      incidentTime: 'Wednesday, 03:15 AM',
      initialClues: [
        'Electronic turnstiles logged badge IDs, timestamps, and turnstile gate numbers.',
        'Several entries appear repeated or recorded at physically impossible intervals.'
      ],
      missionObjective: 'Clean the dataset by finding exact duplicate log errors and identifying the duplicated badge that was scanned in two places simultaneously.'
    },
    evidenceList: [
      { id: 'ev-301', title: 'Cleanroom Server Terminal', type: 'photo', x: 22, y: 22, rotation: 3, shortDesc: 'Server with flash drive plugged', content: 'Drive inserted at 03:16 AM. Stole 4.2 GB of vaccine sequencing data.', tag: 'Cyber' },
      { id: 'ev-302', title: 'Access Control Raw Dump', type: 'document', x: 52, y: 19, rotation: -3, shortDesc: '14 row electronic turnstile log', content: 'System logged multiple identical swipes due to sensor rebound, plus an anomaly on Badge #402.', tag: 'Data Log' },
      { id: 'ev-303', title: 'Turnstile Distance Map', type: 'map', x: 80, y: 24, rotation: 2, shortDesc: 'Distance between Gate A & Gate F', content: 'Gate A (East Wing) is 400 meters away from Gate F (Sub-basement). It takes 5 minutes to walk between them.', tag: 'Facility' }
    ],
    suspects: [
      { id: 'susp-301', name: 'Dr. Aris Thorne', age: 48, role: 'Senior Geneticist', avatarColor: '#6366f1', alibi: 'Sleeping at home; claims his badge #402 was on his dresser.', motive: 'None, high equity owner.', traits: ['Badge #402', 'Fingerprint on file'], isCulprit: false, contradiction: 'Dr. Thorne’s card was cloned while he was asleep.' },
      { id: 'susp-302', name: 'Clara Oswald', age: 29, role: 'Lab Intern', avatarColor: '#ec4899', alibi: 'Working in Greenhouse B.', motive: 'Offered \$200,000 by a foreign competitor.', traits: ['Possesses RFID Cloner', 'Badge #508', 'Near Gate F'], isCulprit: true, contradiction: 'Clara used an RFID Proxmark cloner to swipe Dr. Thorne’s #402 at Gate F at 03:15:10 while the real badge was scanned at Gate A!' },
      { id: 'susp-303', name: 'Nigel Frost', age: 52, role: 'Facility Janitor', avatarColor: '#64748b', alibi: 'Mopping second floor.', motive: 'None.', traits: ['Badge #101'], isCulprit: false, contradiction: 'Nigel’s badge has 0 duplicate entries.' }
    ],
    correctConnections: [
      { from: 'ev-302', to: 'ev-303' },
      { from: 'ev-301', to: 'ev-302' }
    ],
    dsConcept: {
      name: 'Duplicate Data Detection & Cleaning',
      description: 'Duplicate data occurs due to sensor bounce, network retries, or fraudulent cloning. De-duplication requires identifying identical primary keys vs identical attributes with conflicting spatial-temporal timestamps.',
      instructions: 'Identify and remove redundant sensor ping duplicates, then isolate the conflicting duplicated badge scanned simultaneously at Gate A and Gate F.'
    },
    hints: [
      { id: 'small', title: 'Check Badge IDs', cost: 10, description: 'Look for repeated IDs', text: 'Scan for badges that appear more than once in the log.' },
      { id: 'highlight', title: 'Impossible Speeds', cost: 25, description: 'Look at timestamps', text: 'Gate A and Gate F are 400 meters apart. Can a person be at both in 10 seconds?' },
      { id: 'step', title: 'De-duplicate First', cost: 40, description: 'Cleaning step', text: 'Remove rows where all fields (Timestamp, Badge, Gate) are 100% identical. Then compare remaining #402 records.' },
      { id: 'advanced', title: 'Culprit Identification', cost: 60, description: 'Badge clone', text: 'Clara Oswald swiped Dr. Thorne’s cloned badge #402 at Gate F sub-basement cleanroom.' }
    ],
    learningReport: {
      whatHappened: 'Clara Oswald cloned Dr. Thorne’s RFID badge #402 and bypassed Gate F to steal vaccine blueprints.',
      whatDiscovered: 'Filtering out exact sensor re-read duplicates exposed a temporal impossibility: badge #402 being scanned at two distant gates 10 seconds apart.',
      conceptName: 'Data De-Duplication & Integrity Validation',
      conceptDefinition: 'Data Cleaning process of identifying redundant or cloned records. Distinguishes exact duplicates (idempotent duplicates) from anomalous duplicates violating integrity constraints.',
      realWorldApplication: 'Credit card fraud detection (detecting card swipes in New York and London within 10 minutes), database de-duplication, and deduplicating CRM leads.',
      formulaOrRule: 'Unique Records = DistinctBy(Key) | Filter(Speed = Distance / ΔTime ≤ MaxPossibleSpeed)',
      badgeTitle: 'De-Duplication Specialist',
      badgeIcon: 'Copy'
    },
    dataset: {
      type: 'deduplication',
      records: [
        { id: 101, badge: 'Badge-402', holder: 'Dr. Thorne', time: '03:15:00', gate: 'Gate A', isClone: false },
        { id: 102, badge: 'Badge-402', holder: 'Dr. Thorne', time: '03:15:00', gate: 'Gate A', isClone: false, isExactDup: true },
        { id: 103, badge: 'Badge-402', holder: 'Dr. Thorne (CLONE)', time: '03:15:10', gate: 'Gate F', isClone: true },
        { id: 104, badge: 'Badge-101', holder: 'Nigel Frost', time: '03:02:15', gate: 'Gate B', isClone: false },
        { id: 105, badge: 'Badge-101', holder: 'Nigel Frost', time: '03:02:15', gate: 'Gate B', isClone: false, isExactDup: true },
        { id: 106, badge: 'Badge-508', holder: 'Clara Oswald', time: '03:10:00', gate: 'Gate F', isClone: false },
        { id: 107, badge: 'Badge-304', holder: 'Dr. Lin', time: '03:25:40', gate: 'Gate C', isClone: false }
      ]
    }
  },

  // Case 4: THE MISSING RECORDS (Missing Values & Imputation)
  {
    id: 'case-004',
    caseNumber: 4,
    chapter: 1,
    title: 'The Missing Records',
    subtitle: 'Corrupted telemetry during Diamond Vault blackout',
    difficulty: 'Easy',
    rewardCoins: 150,
    rewardXp: 140,
    briefing: {
      crimeDescription: 'The "Heart of Atlantis" blue diamond was lifted from the St. Jude Auction House vault. During the critical 5-minute theft window, the telemetry log suffered data transmission corruption, leaving NULL and NaN values in power and infrared sensors.',
      location: 'St. Jude Auction House Sub-vault',
      incidentTime: 'Saturday, 01:20 AM - 01:25 AM',
      initialClues: [
        'Security laser grid draws steady 120 Watts of continuous power.',
        'Corrupted rows have missing values (NULL / NaN) in sensor channels.',
        'A corrupt transmission can be imputed using nearby observations or physics bounds.'
      ],
      missionObjective: 'Impute missing values using forward-fill and mean interpolation to reconstruct the sensor timeline and prove the laser grid was shut off by guard Mason.'
    },
    evidenceList: [
      { id: 'ev-401', title: 'Sliced Glass Case', type: 'photo', x: 20, y: 20, rotation: -4, shortDesc: 'Diamond stand empty', content: 'Precision glass cut with diamond-tipped circle compass. Laser tripwires did not alarm.', tag: 'Crime Scene' },
      { id: 'ev-402', title: 'Corrupted Sensor CSV', type: 'document', x: 50, y: 22, rotation: 2, shortDesc: 'Telemetry log with NULL gaps', content: 'Power grid data stream contains NULLs at 01:22 AM and 01:23 AM.', tag: 'Raw Data' },
      { id: 'ev-403', title: 'Laser Grid Spec Sheet', type: 'document', x: 78, y: 25, rotation: -2, shortDesc: 'Operational specifications', content: 'Normal active power is 120W ± 5W. Standby shutdown drops power to 0W - 10W.', tag: 'Specs' }
    ],
    suspects: [
      { id: 'susp-401', name: 'Mason Vance', age: 36, role: 'Night Security Guard', avatarColor: '#f97316', alibi: 'Claims laser was green and powered at 120W the entire night.', motive: 'Paid off to disable power.', traits: ['Access to Circuit Breaker', 'Key 7'], isCulprit: true, contradiction: 'Once missing values are imputed using the breaker voltage log, power plummeted to 0W at 01:22 AM, proving Mason flipped the breaker!' },
      { id: 'susp-402', name: 'Beatrice Holt', age: 44, role: 'Auction Director', avatarColor: '#a855f7', alibi: 'In her penthouse apartment.', motive: 'Insurance claim payout.', traits: ['No physical access'], isCulprit: false, contradiction: 'Beatrice has no physical keys or breaker access.' },
      { id: 'susp-403', name: 'Carlisle Boyd', age: 31, role: 'Electrical Contractor', avatarColor: '#06b6d4', alibi: 'Off-duty since Friday afternoon.', motive: 'None.', traits: ['Installed sensors'], isCulprit: false, contradiction: 'Carlisle was verified on road cameras 20 miles away.' }
    ],
    correctConnections: [
      { from: 'ev-402', to: 'ev-403' },
      { from: 'ev-401', to: 'ev-402' }
    ],
    dsConcept: {
      name: 'Missing Values & Imputation',
      description: 'Real-world data often suffers from missing values (NaN / Null) due to sensor failures or intentional sabotage. Data scientists use Mean Imputation, Forward-Fill (LOCF), or Interpolation to reconstruct true patterns.',
      instructions: 'Identify missing null entries in the power log. Select the correct imputation method to restore the true timeline and reveal the 0W power blackout.'
    },
    hints: [
      { id: 'small', title: 'Notice the NULLs', cost: 10, description: 'Find missing rows', text: 'Look at the timestamp 01:22 AM in the power log.' },
      { id: 'highlight', title: 'Sensor Behavior', cost: 25, description: 'Inspect values', text: 'Compare adjacent timestamps 01:21 AM and 01:24 AM.' },
      { id: 'step', title: 'Breaker Drop', cost: 40, description: 'Circuit relationship', text: 'Reconstructing the missing values using circuit voltage confirms power was killed to 0W.' },
      { id: 'advanced', title: 'Direct Contradiction', cost: 60, description: 'Guard alibi crushed', text: 'Guard Mason swore power never dropped below 120W, directly refuted by the imputed dataset.' }
    ],
    learningReport: {
      whatHappened: 'Mason Vance cut the circuit breaker at 01:22 AM, disabling the laser grid for 2 minutes to steal the diamond.',
      whatDiscovered: 'Imputing the corrupted missing telemetry values exposed a complete power outage down to 0W that was masked by transmission dropouts.',
      conceptName: 'Missing Value Imputation',
      conceptDefinition: 'Imputation is the replacement of missing or null data points with substituted values derived from mathematical models (Mean, Median, K-Nearest, Linear Interpolation).',
      realWorldApplication: 'Healthcare patient vitals monitoring, weather forecasting sensors, stock ticker feeds, and satellite imaging data recovery.',
      formulaOrRule: 'Linear Interpolation: y = y₁ + (x - x₁) * (y₂ - y₁) / (x₂ - x₁)',
      badgeTitle: 'Data Reconstruction Expert',
      badgeIcon: 'FileQuestion'
    },
    dataset: {
      type: 'imputation',
      columns: ['Timestamp', 'LaserPower_W', 'Status', 'ImputedValue'],
      rows: [
        { time: '01:20 AM', power: 120, status: 'Active', isMissing: false },
        { time: '01:21 AM', power: 119, status: 'Active', isMissing: false },
        { time: '01:22 AM', power: null, status: 'CORRUPT_NULL', isMissing: true, trueValue: 0 },
        { time: '01:23 AM', power: null, status: 'CORRUPT_NULL', isMissing: true, trueValue: 0 },
        { time: '01:24 AM', power: 118, status: 'Active', isMissing: false },
        { time: '01:25 AM', power: 120, status: 'Active', isMissing: false }
      ]
    }
  },

  // Case 5: THE SUSPICIOUS VISITOR (Basic Data Analysis & Frequency Counts)
  {
    id: 'case-005',
    caseNumber: 5,
    chapter: 1,
    title: 'The Suspicious Visitor',
    subtitle: 'After-hours breach in the central server mainframe',
    difficulty: 'Easy',
    rewardCoins: 150,
    rewardXp: 150,
    briefing: {
      crimeDescription: 'Encrypted trade algorithms were exfiltrated from Nexus Tech servers over the weekend. Building management logged 120 total badge entries over Saturday and Sunday. Most staff have an average of 0 or 1 weekend visit. One person logged a shocking anomaly in frequency!',
      location: 'Nexus Technologies Mainframe Wing',
      incidentTime: 'Saturday - Sunday Weekend',
      initialClues: [
        'Turnstile logs contain employee ID, department, date, and entry count.',
        'Average employee weekend entries: μ = 0.8 entries.',
        'A frequency histogram reveals an extreme frequency spike.'
      ],
      missionObjective: 'Aggregate entry counts by employee, calculate frequency distributions, and isolate the individual with abnormal weekend access.'
    },
    evidenceList: [
      { id: 'ev-501', title: 'Mainframe Console Logs', type: 'photo', x: 22, y: 22, rotation: -2, shortDesc: 'USB exfiltration timestamp', content: 'Data copied Sunday at 14:15 PM and 22:30 PM.', tag: 'Server' },
      { id: 'ev-502', title: 'Weekend Turnstile CSV', type: 'document', x: 52, y: 18, rotation: 3, shortDesc: '120 row weekend log', content: 'Turnstile access counts across 15 engineering and sales staff.', tag: 'Access Log' },
      { id: 'ev-503', title: 'Employee Department Rosters', type: 'document', x: 80, y: 25, rotation: -3, shortDesc: 'Work clearance authorizations', content: 'Only Software and Security staff have clearance to enter server room 3B.', tag: 'HR File' }
    ],
    suspects: [
      { id: 'susp-501', name: 'Devon Hayes', age: 39, role: 'DevOps Engineer', avatarColor: '#3b82f6', alibi: 'Checked server at 10 AM Saturday for 1 hour.', motive: 'None.', traits: ['Weekend Visits: 1'], isCulprit: false, contradiction: 'Devon only entered once, fully within the normal employee distribution.' },
      { id: 'susp-502', name: 'Roland Price', age: 43, role: 'Lead Architect', avatarColor: '#dc2626', alibi: 'Claims he spent the weekend fishing at Lake Haven.', motive: 'Selling proprietary trade engine to competitors for \$500k.', traits: ['Weekend Visits: 18', 'Off-Hours Access'], isCulprit: true, contradiction: 'Aggregated frequency counts show Roland swiped in 18 separate times over the weekend, 15 times the normal average!' },
      { id: 'susp-503', name: 'Nadia Chen', age: 27, role: 'Frontend Designer', avatarColor: '#10b981', alibi: 'Working from home.', motive: 'None.', traits: ['Weekend Visits: 0'], isCulprit: false, contradiction: 'Nadia had 0 weekend entries.' }
    ],
    correctConnections: [
      { from: 'ev-501', to: 'ev-502' },
      { from: 'ev-502', to: 'ev-503' }
    ],
    dsConcept: {
      name: 'Frequency Distribution & Value Comparison',
      description: 'Aggregation condenses large datasets into frequency tables (counts, sums, averages). Comparing individual counts against population baseline frequencies immediately surfaces anomalous behaviors.',
      instructions: 'Aggregate weekend entry counts per employee ID. Identify the individual whose frequency drastically departs from the norm.'
    },
    hints: [
      { id: 'small', title: 'Group by Name', cost: 10, description: 'Aggregate records', text: 'Count how many times each employee name appears in the log.' },
      { id: 'highlight', title: 'Baseline Comparison', cost: 25, description: 'Check normal visits', text: 'Normal employees visit 0 to 2 times. Look for double digits.' },
      { id: 'step', title: 'Time of Access', cost: 40, description: 'Check Sunday afternoon', text: 'Cross-reference who was present at Sunday 14:15 PM.' },
      { id: 'advanced', title: 'The Spike', cost: 60, description: 'Culprit identity', text: 'Roland Price has 18 visits, completely breaking the frequency curve.' }
    ],
    learningReport: {
      whatHappened: 'Roland Price spent the weekend making 18 separate unauthorized visits to download proprietary code.',
      whatDiscovered: 'Frequency grouping and counting aggregated 120 raw log entries into a clear histogram, highlighting Roland’s 18 visits as a glaring anomaly.',
      conceptName: 'Frequency Distribution & Aggregation',
      conceptDefinition: 'Frequency distribution summarizes how often each value or category occurs in a dataset, providing insight into central tendencies and dispersion.',
      realWorldApplication: 'Website traffic analysis, fraud monitoring, customer purchase frequency, and network DDoS attack detection.',
      formulaOrRule: 'Frequency(x) = Count({ r ∈ Records | r.Employee = x })',
      badgeTitle: 'Frequency Analyst',
      badgeIcon: 'BarChart'
    },
    dataset: {
      type: 'frequency',
      frequencies: [
        { name: 'Roland Price', count: 18, department: 'Architecture', suspicious: true },
        { name: 'Devon Hayes', count: 2, department: 'DevOps', suspicious: false },
        { name: 'Marcus Brody', count: 1, department: 'Security', suspicious: false },
        { name: 'Nadia Chen', count: 0, department: 'Design', suspicious: false },
        { name: 'Elena Gilbert', count: 1, department: 'QA', suspicious: false },
        { name: 'Tariq Al-Mansoor', count: 2, department: 'Backend', suspicious: false }
      ]
    }
  },

  // ==========================================
  // CHAPTER 2: SENIOR DETECTIVE (INTERMEDIATE)
  // ==========================================

  // Case 6: THE IMPOSSIBLE GETAWAY (Mean, Median, Mode)
  {
    id: 'case-006',
    caseNumber: 6,
    chapter: 2,
    title: 'The Impossible Getaway',
    subtitle: 'High-speed armored truck heist radar tracking',
    difficulty: 'Intermediate',
    rewardCoins: 250,
    rewardXp: 200,
    briefing: {
      crimeDescription: 'An armored bullion transport was ambushed at Mile Marker 42. Six highway radar speed traps recorded the getaway vehicle as it fled toward the state border. Five checkpoints recorded consistent speeds, while one checkpoint logged an absurd 148 km/h. Does the mean or median reflect the actual getaway car?',
      location: 'Interstate 80 Highway Corridor',
      incidentTime: 'Thursday, 02:40 AM',
      initialClues: [
        'Radar recorded speeds at 6 consecutive checkpoints: 72, 75, 74, 73, 148, 76 km/h.',
        'An eyewitness motorcycle cop clocked the getaway sedan cruising steadily.',
        'One radar captured a passing racing sports car that was not the suspect.'
      ],
      missionObjective: 'Compute Mean, Median, and Mode of the radar speed array. Explain why the Mean is skewed by the 148 km/h outlier and match the true Median to suspect sedan specs.'
    },
    evidenceList: [
      { id: 'ev-601', title: 'Radar Speed Trap Readout', type: 'document', x: 22, y: 22, rotation: -3, shortDesc: 'Radar gun records array', content: 'Checkpoint speeds (km/h): [72, 75, 74, 73, 148, 76].', tag: 'Radar' },
      { id: 'ev-602', title: 'Patrolman Alvarez Log', type: 'witness', x: 52, y: 18, rotation: 3, shortDesc: 'Highway patrol motorcycle statement', content: '"The getaway van was cruising moderately between 73 and 76 km/h to avoid drawing suspicion. A red Ferrari blew past at 150 km/h separately."', tag: 'Eyewitness' },
      { id: 'ev-603', title: 'Vehicle Fleet Registry', type: 'document', x: 80, y: 25, rotation: -2, shortDesc: 'Suspect vehicle specifications', content: 'Contains top speeds and cruise capabilities for suspect vehicles.', tag: 'Registry' }
    ],
    suspects: [
      { id: 'susp-601', name: 'Damian "Nitro" Cross', age: 31, role: 'Sports Car Driver', avatarColor: '#f43f5e', alibi: 'Speeding in red Ferrari at 150 km/h; had zero stolen bullion.', motive: 'Street racing citation only.', traits: ['Drove 148 km/h', 'Ferrari 488'], isCulprit: false, contradiction: 'Damian was the outlier sports car, verified by motorcycle patrol.' },
      { id: 'susp-602', name: 'Garrison Cole', age: 46, role: 'Delivery Contractor', avatarColor: '#7c3aed', alibi: 'Claims his van was parked in depot.', motive: 'Stole \$1.2M gold bullion.', traits: ['Ford Transit Van', 'Median cruise: 74.5 km/h'], isCulprit: true, contradiction: 'Garrison’s van cruises at exactly 74.5 km/h (the true median), and bullion dust was found on his tailgate!' },
      { id: 'susp-603', name: 'Silas Ward', age: 38, role: 'Tow Truck Operator', avatarColor: '#0ea5e9', alibi: 'Towing broken down sedan at 45 km/h.', motive: 'None.', traits: ['Heavy wrecker', 'Max speed 60 km/h'], isCulprit: false, contradiction: 'Silas’s vehicle cannot exceed 60 km/h.' }
    ],
    correctConnections: [
      { from: 'ev-601', to: 'ev-602' },
      { from: 'ev-602', to: 'ev-603' }
    ],
    dsConcept: {
      name: 'Measures of Central Tendency (Mean vs Median vs Mode)',
      description: 'The Arithmetic Mean is sensitive to extreme values (outliers). The Median is resistant/robust to outliers because it represents the middle rank. The Mode is the most frequent value.',
      instructions: 'Calculate the Mean, Median, and Mode of [72, 75, 74, 73, 148, 76]. Observe how removing or isolating the 148 km/h outlier restores the true cruise speed.'
    },
    hints: [
      { id: 'small', title: 'Sort the Speeds', cost: 10, description: 'Sort ascending', text: 'Order the numbers: 72, 73, 74, 75, 76, 148.' },
      { id: 'highlight', title: 'Mean vs Median', cost: 25, description: 'Compare measures', text: 'Notice how the sum (518 / 6 = 86.33 km/h) is higher than 5 out of 6 cars!' },
      { id: 'step', title: 'Calculate Median', cost: 40, description: 'Middle values', text: 'Middle values are 74 and 75. Average of middle = 74.5 km/h.' },
      { id: 'advanced', title: 'Identify Culprit', cost: 60, description: 'Matching van', text: 'Garrison Cole’s delivery van was the vehicle cruising at 74.5 km/h.' }
    ],
    learningReport: {
      whatHappened: 'Garrison Cole drove the bullion getaway van at a median cruise speed of 74.5 km/h while a passing Ferrari distorted the radar mean.',
      whatDiscovered: 'The Arithmetic Mean (86.3 km/h) was heavily distorted by a single extreme outlier (148 km/h), while the Median (74.5 km/h) accurately revealed the getaway vehicle speed.',
      conceptName: 'Measures of Central Tendency',
      conceptDefinition: 'Mean is the sum divided by count; Median is the 50th percentile (robust to skewness); Mode is the highest frequency. In skewed distributions, Median is the superior measure.',
      realWorldApplication: 'Real estate house prices (median home price avoids skew from mansions), income statistics, and network latency monitoring (p50/p99 latency).',
      formulaOrRule: 'Mean = Σx/n | Median = (x_(n/2) + x_(n/2 + 1))/2 for even n',
      badgeTitle: 'Statistical Pioneer',
      badgeIcon: 'Calculator'
    },
    dataset: {
      type: 'central_tendency',
      speeds: [72, 75, 74, 73, 148, 76],
      outlier: 148,
      inliers: [72, 73, 74, 75, 76]
    }
  },

  // Case 7: THE UNUSUAL SUSPECT (Outlier Detection)
  {
    id: 'case-007',
    caseNumber: 7,
    chapter: 2,
    title: 'The Unusual Suspect',
    subtitle: 'Offshore wire embezzlement from sovereign hedge fund',
    difficulty: 'Intermediate',
    rewardCoins: 250,
    rewardXp: 220,
    briefing: {
      crimeDescription: 'Auditors discovered a liquidity drain in the Horizon Trust account. Over 20 business transactions were processed during the quarter. Most normal vendor disbursements range between \$2,000 and \$8,000. But an anomalous transaction was buried under routine supplier codes.',
      location: 'Horizon Capital Trust, Wall Street',
      incidentTime: 'Quarter 3 Audit Period',
      initialClues: [
        'Transaction amounts in thousands (\$k): [3.2, 4.1, 2.9, 5.5, 4.8, 3.9, 6.2, 84.5, 3.4, 4.0, 5.1, 2.8, 6.0, 4.4].',
        'Tukey’s boxplot rule uses Interquartile Range (IQR): Upper Fence = Q3 + 1.5 * IQR.',
        'Transactions exceeding the upper fence are statistically verified outliers.'
      ],
      missionObjective: 'Compute Q1, Q3, IQR, and the Upper Fence threshold to detect the statistical outlier and trace its authorization code.'
    },
    evidenceList: [
      { id: 'ev-701', title: 'Q3 Financial Ledger', type: 'document', x: 22, y: 22, rotation: -2, shortDesc: 'Disbursements list in \$k', content: '14 transactions ranging from \$2.8k to \$84.5k.', tag: 'Audit' },
      { id: 'ev-702', title: 'Wire Transfer Authorization 84.5k', type: 'document', x: 52, y: 20, rotation: 3, shortDesc: 'Routing ticket #WT-9021', content: 'Sent to "Cayman Shell Corp". Authorized by executive keycard #CFO-01.', tag: 'Wire' },
      { id: 'ev-703', title: 'Executive Keycard Access Logs', type: 'document', x: 80, y: 26, rotation: -3, shortDesc: 'Terminal sessions', content: 'CFO Arthur Sterling logged into the wire terminal at 23:45 PM on a Saturday.', tag: 'Logs' }
    ],
    suspects: [
      { id: 'susp-701', name: 'Arthur Sterling', age: 54, role: 'Chief Financial Officer', avatarColor: '#b91c1c', alibi: 'Claims wire was an automated cloud server hosting payment.', motive: 'Embezzling funds ahead of company merger.', traits: ['Keycard CFO-01', 'Cayman Account Link'], isCulprit: true, contradiction: 'Arthur authorized the \$84.5k transfer, which is 15 standard deviations above normal disbursements!' },
      { id: 'susp-702', name: 'Claire Dupont', age: 32, role: 'Senior Accountant', avatarColor: '#059669', alibi: 'Processed routine office utility bills (\$3.2k - \$5.5k).', motive: 'None.', traits: ['Normal transactions'], isCulprit: false, contradiction: 'All of Claire’s transactions lie safely inside the IQR fences.' },
      { id: 'susp-703', name: 'Peter Hall', age: 29, role: 'Junior Auditor', avatarColor: '#d97706', alibi: 'Flagged the discrepancy to management.', motive: 'None.', traits: ['Whistleblower'], isCulprit: false, contradiction: 'Peter was the auditor who reported the anomaly.' }
    ],
    correctConnections: [
      { from: 'ev-701', to: 'ev-702' },
      { from: 'ev-702', to: 'ev-703' }
    ],
    dsConcept: {
      name: 'Outlier Detection & Interquartile Range (IQR)',
      description: 'An outlier is a data point that differs significantly from remaining observations. John Tukey established the standard Boxplot IQR method: IQR = Q3 - Q1, with Upper Fence = Q3 + 1.5 * IQR and Lower Fence = Q1 - 1.5 * IQR.',
      instructions: 'Calculate Q1, Q3, and the Upper Fence. Flag any data point exceeding the fence as an outlier to uncover the fraudulent transfer.'
    },
    hints: [
      { id: 'small', title: 'Sort the Values', cost: 10, description: 'Ordered dataset', text: 'Sort all amounts from lowest to highest: 2.8, 2.9, 3.2, 3.4, 3.9, 4.0, 4.1, 4.4, 4.8, 5.1, 5.5, 6.0, 6.2, 84.5.' },
      { id: 'highlight', title: 'Q1 and Q3', cost: 25, description: 'Quartile positions', text: 'Q1 is approximately 3.4, Q3 is approximately 5.5. IQR is ~2.1.' },
      { id: 'step', title: 'Calculate Fence', cost: 40, description: 'Upper boundary', text: 'Upper Fence = 5.5 + 1.5 * (2.1) = 8.65k. Anything above \$8.65k is an outlier.' },
      { id: 'advanced', title: 'The Anomaly', cost: 60, description: 'Flagged record', text: '\$84.5k dwarfs the \$8.65k fence! CFO Arthur Sterling wired it to his personal offshore shell company.' }
    ],
    learningReport: {
      whatHappened: 'CFO Arthur Sterling attempted to hide a \$84,500 wire embezzlement among routine \$4,000 vendor payments.',
      whatDiscovered: 'Computing IQR boundaries established an Upper Fence of \$8.65k. The \$84.5k transaction exceeded the threshold by nearly 1000%, exposing the fraud.',
      conceptName: 'Outlier Detection via IQR & Boxplots',
      conceptDefinition: 'Technique to detect anomalous observations by evaluating the spread between the 25th (Q1) and 75th (Q3) percentiles using statistical fences.',
      realWorldApplication: 'Credit card transaction fraud alerts, medical equipment abnormality monitoring, manufacturing defect detection, and cybersecurity intrusion sensors.',
      formulaOrRule: 'IQR = Q3 - Q1 | Upper Fence = Q3 + 1.5 × IQR',
      badgeTitle: 'Outlier Hunter',
      badgeIcon: 'AlertTriangle'
    },
    dataset: {
      type: 'outliers',
      values: [3.2, 4.1, 2.9, 5.5, 4.8, 3.9, 6.2, 84.5, 3.4, 4.0, 5.1, 2.8, 6.0, 4.4],
      q1: 3.4,
      q3: 5.5,
      iqr: 2.1,
      upperFence: 8.65
    }
  },

  // Case 8: THE CONNECTED CRIMES (Correlation vs Causation)
  {
    id: 'case-008',
    caseNumber: 8,
    chapter: 2,
    title: 'The Connected Crimes',
    subtitle: 'The Ice Cream vendor trap and power blackout burglaries',
    difficulty: 'Intermediate',
    rewardCoins: 250,
    rewardXp: 240,
    briefing: {
      crimeDescription: 'Detectives noticed an uncanny correlation: whenever ice cream truck sales surged across riverside neighborhoods, residential burglaries also peaked (correlation r = 0.91). Overzealous junior cops arrested the innocent ice cream driver! Is this real causation, or is a lurking third variable at play?',
      location: 'Riverside District',
      incidentTime: 'Summer Heatwave Months',
      initialClues: [
        'Datasets tracked across 8 weeks: Ice Cream Sales, Burglaries, Daily Temperature (°C), and Grid Voltage Drops.',
        'High mathematical correlation does NOT prove a causal mechanism.',
        'A lurking variable (Temperature) causes both open windows and ice cream consumption.'
      ],
      missionObjective: 'Compute Pearson correlation coefficients (r) between all variables. Distinguish correlation from causation to exonerate the ice cream vendor and find the true electrical grid saboteur.'
    },
    evidenceList: [
      { id: 'ev-801', title: 'Summer Statistics Scatter Dataset', type: 'document', x: 22, y: 22, rotation: -2, shortDesc: 'Weekly measurements', content: '8-week table tracking Sales, Break-ins, Temperature, and Transformer Grid Drops.', tag: 'Data' },
      { id: 'ev-802', title: 'Ice Cream Vendor Alibi', type: 'witness', x: 52, y: 20, rotation: 3, shortDesc: 'Statement from Marco Rossi', content: '"I just sell popsicles when it’s 35°C outside! I don’t rob houses! People leave their ground-floor windows open to catch the breeze!"', tag: 'Testimony' },
      { id: 'ev-803', title: 'Electrical Substation Tampering Report', type: 'photo', x: 80, y: 26, rotation: -4, shortDesc: 'Substation #4 cut wire', content: 'Physical copper wires cut intentionally to trigger localized blackouts during break-ins. Pearson r with burglaries: r = 0.98!', tag: 'Physical' }
    ],
    suspects: [
      { id: 'susp-801', name: 'Marco Rossi', age: 52, role: 'Ice Cream Vendor', avatarColor: '#f59e0b', alibi: 'Selling ice cream on the boardwalk.', motive: 'None (Falsely accused due to spurious correlation).', traits: ['Ice Cream Cart', 'r = 0.91 with crime'], isCulprit: false, contradiction: 'Marco’s ice cream sales correlate with burglaries only because both are caused by high summer temperature (lurking variable).' },
      { id: 'susp-802', name: 'Garret "Sparks" Sterling', age: 39, role: 'Corrupt Lineman', avatarColor: '#dc2626', alibi: 'Claims transformer drops were accidental overload.', motive: 'Cutting power for burglary crew.', traits: ['Substation Access', 'Direct Causal Mechanism'], isCulprit: true, contradiction: 'Garret had a direct causal mechanism: he intentionally tripped the substation breakers (r = 0.98 with break-in timing) to disable burglar alarms!' },
      { id: 'susp-803', name: 'Wendy Park', age: 34, role: 'Meteorologist', avatarColor: '#10b981', alibi: 'Broadcasting weather on TV.', motive: 'None.', traits: ['Forecast records'], isCulprit: false, contradiction: 'Wendy only measures temperatures.' }
    ],
    correctConnections: [
      { from: 'ev-801', to: 'ev-802' },
      { from: 'ev-801', to: 'ev-803' }
    ],
    dsConcept: {
      name: 'Correlation vs. Causation & Confounding Variables',
      description: 'Pearson correlation (r) measures linear association strength, but correlation never implies causation. A confounding or lurking variable often drives two completely unrelated variables simultaneously, creating a spurious correlation.',
      instructions: 'Calculate Pearson r for (Sales vs Crimes), (Temp vs Sales), and (Grid Drops vs Crimes). Identify the true causal mechanism.'
    },
    hints: [
      { id: 'small', title: 'Check the Temperature', cost: 10, description: 'Lurking variable', text: 'Does high temperature cause people to buy ice cream? Yes. Does heat cause open windows? Yes.' },
      { id: 'highlight', title: 'Direct Mechanism', cost: 25, description: 'Look for causality', text: 'Ice cream cannot disable alarms. Cutting electrical wires DOES disable alarms.' },
      { id: 'step', title: 'Pearson r Calculation', cost: 40, description: 'Evaluate coefficients', text: 'Grid Drops vs Burglaries has r = 0.98 and a direct physical mechanism.' },
      { id: 'advanced', title: 'Exonerate Marco', cost: 60, description: 'True culprit', text: 'Marco is innocent. Lineman Garret Sparks intentionally tripped the grid to execute burglaries.' }
    ],
    learningReport: {
      whatHappened: 'Lineman Garret Sparks tripped substation circuits to disable residential alarms, while ice cream sales were merely a spurious correlate driven by heatwaves.',
      whatDiscovered: 'Ice cream and burglaries share a high correlation (r = 0.91) due to the lurking variable Temperature. But Grid Drops exhibited both r = 0.98 and a proven causal mechanism.',
      conceptName: 'Correlation vs Causation & Lurking Variables',
      conceptDefinition: 'Correlation measures association; Causation requires evidence that changing X directly changes Y through a causal mechanism without third-variable confounding.',
      realWorldApplication: 'Epidemiology (smoking vs lung cancer vs coffee drinking), financial market modeling, pharmaceutical drug efficacy trials, and A/B web testing.',
      formulaOrRule: 'Pearson r = Σ((x - x̄)(y - ȳ)) / [ √(Σ(x - x̄)²) √(Σ(y - ȳ)²) ]',
      badgeTitle: 'Causality Investigator',
      badgeIcon: 'GitCompare'
    },
    dataset: {
      type: 'correlation',
      weeks: [1, 2, 3, 4, 5, 6, 7, 8],
      temperature: [22, 25, 29, 34, 37, 35, 31, 24],
      iceCreamSales: [120, 150, 210, 310, 380, 340, 260, 140],
      burglaries: [2, 3, 5, 9, 11, 10, 6, 2],
      gridDrops: [1, 2, 4, 9, 12, 10, 5, 1],
      rIceCreamBurglaries: 0.912,
      rTempBurglaries: 0.895,
      rGridBurglaries: 0.984
    }
  },

  // Case 9: THE HIDDEN GROUPS (Clustering)
  {
    id: 'case-009',
    caseNumber: 9,
    chapter: 2,
    title: 'The Hidden Groups',
    subtitle: 'Unmasking the syndicate cells across city docks and railyards',
    difficulty: 'Intermediate',
    rewardCoins: 250,
    rewardXp: 260,
    briefing: {
      crimeDescription: 'Undercover surveillance tracked 12 art smuggling couriers moving contraband across the city. Police do not know who reports to whom. By plotting each drop-off location on a 2D coordinate grid (Distance from Harbor vs Contraband Value in \$k), distinct operational clusters emerge.',
      location: 'Metropolitan Shipping Corridors',
      incidentTime: 'Continuous Surveillance',
      initialClues: [
        '12 drop-off locations with coordinates (x: Harbor Distance km, y: Parcel Value \$k).',
        'K-Means clustering partitions observations into K distinct groups based on geometric proximity to cluster centroids.',
        'Setting K=3 exposes three regional smuggling syndicates.'
      ],
      missionObjective: 'Execute the K-Means clustering algorithm. Adjust K and run iterations to group the suspects into 3 cells and identify the syndicate boss at the center of the high-value cluster.'
    },
    evidenceList: [
      { id: 'ev-901', title: 'Courier GPS Coordinates Log', type: 'document', x: 22, y: 22, rotation: -3, shortDesc: '12 2D coordinates', content: 'Drop points plotted on Distance (km) vs Value (\$k).', tag: 'Surveillance' },
      { id: 'ev-902', title: 'Centroid Distance Calculation', type: 'map', x: 52, y: 19, rotation: 2, shortDesc: 'City grid zoning map', content: 'Three distinct geographic zones: Harbor Dockers (K1), Industrial Railyard (K2), and Downtown Luxury Fences (K3).', tag: 'Clusters' },
      { id: 'ev-903', title: 'Informant Audio Tape', type: 'witness', x: 80, y: 26, rotation: -2, shortDesc: 'Wiretapped whisper', content: '"The Boss never moves low-grade contraband. He only sits at the centroid of the luxury high-value downtown cluster."', tag: 'Wiretap' }
    ],
    suspects: [
      { id: 'susp-901', name: 'Dmitri "The Anchor" Volkov', age: 44, role: 'Dock Master', avatarColor: '#0284c7', alibi: 'Supervising cargo cranes at the harbor.', motive: 'Low-value harbor smuggler.', traits: ['Cluster 1 (Harbor, Low Value)'], isCulprit: false, contradiction: 'Dmitri belongs to the low-value Harbor cluster.' },
      { id: 'susp-902', name: 'Madame Vivienne Vane', age: 51, role: 'Antique Dealer & Kingpin', avatarColor: '#8b5cf6', alibi: 'Host of gallery auctions downtown.', motive: 'Directs the high-value luxury art smuggling syndicate.', traits: ['Cluster 3 Centroid', 'High Value $80k+'], isCulprit: true, contradiction: 'Vivienne is positioned right at the mathematical centroid of the High-Value Downtown cluster (Value > \$75k)!' },
      { id: 'susp-903', name: 'Jack "Caboose" Miller', age: 36, role: 'Rail Yard Shifter', avatarColor: '#64748b', alibi: 'Loading boxcars.', motive: 'Mid-tier parts courier.', traits: ['Cluster 2 (Railyard, Mid Value)'], isCulprit: false, contradiction: 'Jack operates in the mid-value industrial cluster.' }
    ],
    correctConnections: [
      { from: 'ev-901', to: 'ev-902' },
      { from: 'ev-902', to: 'ev-903' }
    ],
    dsConcept: {
      name: 'Unsupervised Learning & K-Means Clustering',
      description: 'Clustering discovers inherent natural groupings in unlabeled data. K-Means iteratively assigns points to the nearest centroid (minimizing within-cluster sum of squares) and recalculates the centroid coordinates until convergence.',
      instructions: 'Run K-Means clustering with K=3. Watch points assign to centroids and pinpoint Madame Vivienne Vane at the high-value cluster center.'
    },
    hints: [
      { id: 'small', title: 'Choosing K', cost: 10, description: 'Cluster count', text: 'Set K=3 to partition the points into the three distinct operational territories.' },
      { id: 'highlight', title: 'High-Value Cluster', cost: 25, description: 'Look at the Y-axis', text: 'Observe points with Contraband Value above \$70k.' },
      { id: 'step', title: 'Iterate Centroids', cost: 40, description: 'Algorithm step', text: 'Click "Run Iteration" until centroids stop shifting and stabilize.' },
      { id: 'advanced', title: 'Unmask the Boss', cost: 60, description: 'The Kingpin', text: 'Madame Vivienne Vane occupies the exact centroid of the luxury high-value cluster.' }
    ],
    learningReport: {
      whatHappened: 'Madame Vivienne Vane was uncovered as the mastermind operating the high-value art smuggling cluster.',
      whatDiscovered: 'Unsupervised K-Means clustering with K=3 separated 12 disorganized coordinates into 3 organized operational rings: Harbor, Industrial, and Downtown Luxury.',
      conceptName: 'K-Means Clustering',
      conceptDefinition: 'Unsupervised machine learning algorithm that groups data points into K clusters by minimizing Euclidean distance to cluster centers (centroids).',
      realWorldApplication: 'Customer segmentation in marketing, document categorization, medical image segmentation, and crime hotspot pattern recognition.',
      formulaOrRule: 'J = Σ_(j=1)^K Σ_(i=1)^n || x_i^(j) - c_j ||²',
      badgeTitle: 'Cluster Detective',
      badgeIcon: 'Layers'
    },
    dataset: {
      type: 'clustering',
      k: 3,
      points: [
        { id: 'p1', x: 2, y: 15, label: 'Dock Skiff 1', cluster: 0 },
        { id: 'p2', x: 3, y: 18, label: 'Dock Skiff 2', cluster: 0 },
        { id: 'p3', x: 2.5, y: 22, label: 'Pier Cargo', cluster: 0 },
        { id: 'p4', x: 4, y: 12, label: 'Fisherman Net', cluster: 0 },

        { id: 'p5', x: 12, y: 45, label: 'Rail Depot A', cluster: 1 },
        { id: 'p6', x: 14, y: 50, label: 'Rail Depot B', cluster: 1 },
        { id: 'p7', x: 11, y: 42, label: 'Boxcar Depot', cluster: 1 },
        { id: 'p8', x: 13, y: 48, label: 'Spur Line', cluster: 1 },

        { id: 'p9', x: 22, y: 85, label: 'Gallery Vault 1', cluster: 2 },
        { id: 'p10', x: 24, y: 92, label: 'Luxury Boutique', cluster: 2 },
        { id: 'p11', x: 23, y: 88, label: 'Penthouse Drop', cluster: 2 },
        { id: 'p12', x: 25, y: 84, label: 'Private Auction', cluster: 2 }
      ]
    }
  },

  // Case 10: THE MISLEADING EVIDENCE (Data Visualization Ethics)
  {
    id: 'case-010',
    caseNumber: 10,
    chapter: 2,
    title: 'The Misleading Evidence',
    subtitle: 'The corporate chart deception in chemical spill cover-up',
    difficulty: 'Intermediate',
    rewardCoins: 250,
    rewardXp: 280,
    briefing: {
      crimeDescription: 'A toxic solvent leak contaminated the city reservoir. The chemical company CEO presented a chart in court showing that toxic runoff was "flat, safe, and negligible" over the past 6 months. But an honest data scientist spotted malicious visualization tricks: a truncated Y-axis starting at 9,900 and distorted bin intervals!',
      location: 'City Environmental Courtroom & ChemTech HQ',
      incidentTime: 'Annual Regulatory Review',
      initialClues: [
        'The court chart starts the Y-axis at 9,800 instead of 0, making an explosive 400% surge look like a tiny flat wobble.',
        'Uneven time intervals were spaced to conceal the night of the massive tank burst.',
        'Proper ethical data visualization requires a zero-baseline on quantitative bar/area charts.'
      ],
      missionObjective: 'Fix the chart distortion! Reset the Y-axis to 0 and apply uniform time scaling to reveal the 400% pollution surge that indicts CEO Sterling.'
    },
    evidenceList: [
      { id: 'ev-1001', title: 'Manipulated Court Slide #4', type: 'document', x: 22, y: 22, rotation: -3, shortDesc: 'Deceptive graph presented to judge', content: 'Y-axis spans 98 to 102 PPM, creating the illusion of zero variance.', tag: 'Manipulated' },
      { id: 'ev-1002', title: 'Raw Chemical Sensor Telemetry', type: 'document', x: 52, y: 18, rotation: 3, shortDesc: 'Real unscaled sensor readings', content: 'Runoff jumped from 15 PPM to 98 PPM following valve failure on June 14th.', tag: 'Ground Truth' },
      { id: 'ev-1003', title: 'Whistleblower Lab Memo', type: 'witness', x: 80, y: 25, rotation: -2, shortDesc: 'Memo from Environmental Chemist', content: '"Management ordered us to crop the chart axis and delete the 0 baseline so the board wouldn’t see the disaster."', tag: 'Whistleblower' }
    ],
    suspects: [
      { id: 'susp-1001', name: 'Harold Sterling', age: 58, role: 'ChemTech Chief Executive', avatarColor: '#dc2626', alibi: 'Claims emissions complied with federal guidelines.', motive: 'Avoiding \$20M clean-up liability.', traits: ['Approved false chart', 'Truncated Y-axis'], isCulprit: true, contradiction: 'When the Y-axis is restored to zero baseline, emissions show a catastrophic 400% spike authorized under Harold’s watch!' },
      { id: 'susp-1002', name: 'Dr. Anita Roy', age: 37, role: 'Chief Toxicologist', avatarColor: '#10b981', alibi: 'Conducted the raw tests and refused to alter data.', motive: 'None.', traits: ['Raw data author'], isCulprit: false, contradiction: 'Dr. Roy recorded the true 98 PPM surge and was overruled by Harold.' },
      { id: 'susp-1003', name: 'Greg Simmons', age: 42, role: 'PR Spokesperson', avatarColor: '#f59e0b', alibi: 'Read the press release.', motive: 'None.', traits: ['Presenter only'], isCulprit: false, contradiction: 'Greg was merely handed the prepared slides.' }
    ],
    correctConnections: [
      { from: 'ev-1001', to: 'ev-1002' },
      { from: 'ev-1002', to: 'ev-1003' }
    ],
    dsConcept: {
      name: 'Data Visualization Ethics & Truncated Axes',
      description: 'Misleading charts manipulate perception through truncated axes, cherry-picked bins, inverted scales, and distorted aspect ratios. Ethical data visualization requires appropriate baselines and unskewed scales.',
      instructions: 'Switch the chart from "Deceptive View (Truncated Y-Axis 90-105)" to "Honest View (Zero Baseline 0-100)". Observe how the flat line turns into a massive surge.'
    },
    hints: [
      { id: 'small', title: 'Check the Y-Axis Start', cost: 10, description: 'Where does it begin?', text: 'Look at the minimum number on the vertical axis. Does it start at 0?' },
      { id: 'highlight', title: 'Relative Magnitude', cost: 25, description: 'Actual percentage', text: 'A change from 20 to 98 is nearly a 500% increase, but looks small on a zoomed axis.' },
      { id: 'step', title: 'Restore Zero Baseline', cost: 40, description: 'Fix the chart', text: 'Click "Restore Zero Baseline" on the chart workbench.' },
      { id: 'advanced', title: 'Unmask Harold', cost: 60, description: 'Guilt established', text: 'CEO Harold Sterling intentionally approved the truncated graph to mislead the environmental tribunal.' }
    ],
    learningReport: {
      whatHappened: 'CEO Harold Sterling orchestrated a fraudulent chart with a truncated Y-axis to conceal a 400% chemical pollution spill.',
      whatDiscovered: 'Restoring a 0-baseline to the visualization unmasked the dramatic surge in toxic effluent that had been artificially flattened by deceptive scaling.',
      conceptName: 'Data Visualization Ethics & Scale Integrity',
      conceptDefinition: 'The practice of accurately portraying numerical relationships without visual deception, preserving baseline integrity, consistent binning, and truthful aspect ratios.',
      realWorldApplication: 'Journalism fact-checking, financial prospectus reporting, public health epidemiology dashboards, and courtroom evidence admissibility.',
      formulaOrRule: 'Lie Factor = (Size of effect in graphic) / (Size of effect in data) ≈ 1.0 (Ethical Standard)',
      badgeTitle: 'Visualization Auditor',
      badgeIcon: 'Eye'
    },
    dataset: {
      type: 'visualization',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      safeLimit: 25,
      actualPPM: [18, 20, 22, 19, 21, 98],
      distortedMin: 90,
      distortedMax: 105,
      honestMin: 0,
      honestMax: 110
    }
  },

  // ==========================================
  // CHAPTER 3: MASTER DETECTIVE (ADVANCED)
  // ==========================================

  // Case 11: THE PREDICTIVE CRIMINAL (Machine Learning Basics & Classification)
  {
    id: 'case-011',
    caseNumber: 11,
    chapter: 3,
    title: 'The Predictive Criminal',
    subtitle: 'Training a Decision Classifier to ambush the Phantom Burglar',
    difficulty: 'Advanced',
    rewardCoins: 400,
    rewardXp: 320,
    briefing: {
      crimeDescription: 'The "Phantom Thief" has struck 10 high-value landmarks over 12 months. Detectives collected a dataset of past crimes featuring: Weather (Clear, Foggy, Rainy), Guard Count (<3 or >=3), and Alarm Type (Optical vs Infrared). Tonight the thief is preparing another heist. Can you train a Decision Rule Classifier to predict which venue will be targeted tonight?',
      location: 'Metropolitan High-Security Sector',
      incidentTime: 'Tonight at Midnight',
      initialClues: [
        'Historical training set contains 10 past cases with Target Struck = Yes/No.',
        'Tonight’s three potential targets: The Antiquities Museum, City Gold Exchange, and Sovereign Gem Vault.',
        'Decision trees split features on purity (e.g., Foggy weather AND Guards < 3).'
      ],
      missionObjective: 'Train a Decision Classifier on historical target features. Run inference on tonight’s 3 candidate locations to deploy police reinforcements to the exact targeted venue.'
    },
    evidenceList: [
      { id: 'ev-1101', title: 'Historical Heist Log (Training Data)', type: 'document', x: 22, y: 22, rotation: -3, shortDesc: '10 past incidents with target labels', content: 'Historical features: Weather, Guards, Alarm, Target Struck.', tag: 'Training Set' },
      { id: 'ev-1102', title: 'Tonight’s Candidate Targets (Test Set)', type: 'document', x: 52, y: 19, rotation: 2, shortDesc: '3 candidate locations tonight', content: 'Target A (Rainy, 4 guards), Target B (Foggy, 2 guards, Infrared), Target C (Clear, 5 guards).', tag: 'Test Set' },
      { id: 'ev-1103', title: 'Intercepted Encrypted Radio', type: 'witness', x: 80, y: 26, rotation: -3, shortDesc: 'Radio chatter decrypt', content: '"We only strike when vision is obstructed and guard shifts are understaffed."', tag: 'Intelligence' }
    ],
    suspects: [
      { id: 'susp-1101', name: 'Sebastian "Wraith" Cruz', age: 35, role: 'Master Jewel Thief', avatarColor: '#1e293b', alibi: 'Claims he was dining at Chez Laurent.', motive: 'Heist of the Century.', traits: ['Strikes in Fog', 'Targets Guards < 3'], isCulprit: true, contradiction: 'The decision model predicts Target B (City Gold Exchange) with 100% confidence, where Sebastian was intercepted with glass suction tools!' },
      { id: 'susp-1102', name: 'Miranda Fox', age: 29, role: 'Locksmith Specialist', avatarColor: '#0ea5e9', alibi: 'At the locksmith convention.', motive: 'None.', traits: ['Optical alarms'], isCulprit: false, contradiction: 'Miranda was verified giving a live speech at the convention.' },
      { id: 'susp-1103', name: 'Donovan Kane', age: 47, role: 'Retired Safe Cracker', avatarColor: '#64748b', alibi: 'At home with ankle monitor.', motive: 'None.', traits: ['Monitored'], isCulprit: false, contradiction: 'Donovan’s electronic ankle monitor never moved.' }
    ],
    correctConnections: [
      { from: 'ev-1101', to: 'ev-1102' },
      { from: 'ev-1102', to: 'ev-1103' }
    ],
    dsConcept: {
      name: 'Supervised Machine Learning & Decision Tree Classification',
      description: 'Supervised learning trains a predictive model on labeled historical data (features + target) to predict outcomes on new unseen test examples. Decision trees split dataset features hierarchically based on feature importance and information gain.',
      instructions: 'Inspect the historical training data. Formulate the classification rule: If (Weather == "Foggy" AND Guards < 3) -> Strike = YES. Predict which of tonight’s 3 targets will be hit.'
    },
    hints: [
      { id: 'small', title: 'Feature Rules', cost: 10, description: 'Look at past successes', text: 'In what weather did the thief always strike in the historical log?' },
      { id: 'highlight', title: 'Guard Count Split', cost: 25, description: 'Examine security', text: 'Did the thief ever strike when guards were >= 3?' },
      { id: 'step', title: 'Test Inference', cost: 40, description: 'Apply rule to candidates', text: 'Target B has Foggy weather and only 2 guards. Target A has 4 guards; Target C has 5 guards.' },
      { id: 'advanced', title: 'Target B Ambush', cost: 60, description: 'Deploy police', text: 'Target B (City Gold Exchange) is the definitive target predicted by the decision classifier!' }
    ],
    learningReport: {
      whatHappened: 'Police set an ambush at Target B (City Gold Exchange) based on the machine learning classification model and apprehended Sebastian Cruz.',
      whatDiscovered: 'The Decision Classifier accurately identified the feature combination (Weather == "Foggy" ∧ Guards < 3) that dictated the perpetrator’s strikes with 100% test accuracy.',
      conceptName: 'Supervised Machine Learning & Classification',
      conceptDefinition: 'Machine learning paradigm where algorithms learn mappings from input feature vectors to discrete target labels using training data, evaluated against test sets.',
      realWorldApplication: 'Email spam filters, medical diagnosis disease classifiers, loan default risk assessment, and predictive policing.',
      formulaOrRule: 'Prediction ŷ = argmax_c P(Class = c | Feature Vector x)',
      badgeTitle: 'Machine Learning Pioneer',
      badgeIcon: 'Cpu'
    },
    dataset: {
      type: 'classification',
      trainingData: [
        { id: 1, weather: 'Clear', guards: 4, alarm: 'Optical', struck: 'NO' },
        { id: 2, weather: 'Foggy', guards: 2, alarm: 'Infrared', struck: 'YES' },
        { id: 3, weather: 'Rainy', guards: 5, alarm: 'Optical', struck: 'NO' },
        { id: 4, weather: 'Foggy', guards: 1, alarm: 'Optical', struck: 'YES' },
        { id: 5, weather: 'Clear', guards: 2, alarm: 'Infrared', struck: 'NO' },
        { id: 6, weather: 'Foggy', guards: 4, alarm: 'Infrared', struck: 'NO' },
        { id: 7, weather: 'Rainy', guards: 2, alarm: 'Optical', struck: 'NO' },
        { id: 8, weather: 'Foggy', guards: 2, alarm: 'Optical', struck: 'YES' }
      ],
      testCandidates: [
        { id: 'Target-A', name: 'Antiquities Museum', weather: 'Rainy', guards: 4, alarm: 'Infrared', predicted: 'NO' },
        { id: 'Target-B', name: 'City Gold Exchange', weather: 'Foggy', guards: 2, alarm: 'Infrared', predicted: 'YES' },
        { id: 'Target-C', name: 'Sovereign Gem Vault', weather: 'Clear', guards: 5, alarm: 'Optical', predicted: 'NO' }
      ]
    }
  },

  // Case 12: THE BIASED INVESTIGATION (Sampling Bias)
  {
    id: 'case-012',
    caseNumber: 12,
    chapter: 3,
    title: 'The Biased Investigation',
    subtitle: 'The stadium survey flaw in the hit-and-run getaway',
    difficulty: 'Advanced',
    rewardCoins: 400,
    rewardXp: 340,
    briefing: {
      crimeDescription: 'A pedestrian hit-and-run getaway vehicle escaped through the stadium district. Junior investigators conducted an emergency survey of 100 witnesses. 88% reported seeing a "Red Sports Car". Police rounded up red sports car owners, but the real culprit drives a dark SUV! Why did the sample lie?',
      location: 'Victory Arena Boulevard',
      incidentTime: 'Sunday Post-Game, 18:30 PM',
      initialClues: [
        'The survey was conducted exclusively outside Gate 4: the official Red Dragons sports merchandise exit!',
        '85% of fans leaving Gate 4 were wearing red shirts and red glasses, creating massive psychological and selection bias.',
        'City traffic cameras on the outbound tollway recorded the true population distribution of vehicles.'
      ],
      missionObjective: 'Demonstrate how convenience sampling produced catastrophic selection bias. Compare the biased sample with a Stratified Random Sample from city tollways to clear innocent suspects.'
    },
    evidenceList: [
      { id: 'ev-1201', title: 'Gate 4 Convenience Survey CSV', type: 'document', x: 22, y: 22, rotation: -2, shortDesc: '100 witness survey responses', content: '88% reported "Red Vehicle". Conducted exclusively at Red Dragons fan exit.', tag: 'Biased Sample' },
      { id: 'ev-1202', title: 'Citywide Tollway Camera Stream', type: 'document', x: 52, y: 19, rotation: 3, shortDesc: 'Stratified random sample of 1,000 cars', content: 'True vehicle distribution: 45% Black/Grey SUVs, 25% White Sedans, 15% Blue, only 5% Red.', tag: 'Representative' },
      { id: 'ev-1203', title: 'Damaged Guardrail Paint Scraping', type: 'photo', x: 80, y: 26, rotation: -3, shortDesc: 'Forensic paint spectrometry', content: 'Forensics confirmed midnight black metallic paint with SUV bumper height (68 cm).', tag: 'Forensics' }
    ],
    suspects: [
      { id: 'susp-1201', name: 'Brett Miller', age: 24, role: 'Red Sports Car Owner', avatarColor: '#ef4444', alibi: 'Was watching the game inside section 104.', motive: 'Falsely arrested due to sampling bias.', traits: ['Drives Red Corvette', 'Zero bumper damage'], isCulprit: false, contradiction: 'Brett’s red sports car was safely parked in Lot C, and paint spectrometry refutes red paint!' },
      { id: 'susp-1202', name: 'Senator Jonathan Hayes', age: 53, role: 'Politician', avatarColor: '#1e1b4b', alibi: 'Claims his chauffeur drove him straight home.', motive: 'Fleeing hit-and-run to avoid political ruin.', traits: ['Midnight Black SUV', 'Dented Front Right Bumper'], isCulprit: true, contradiction: 'Hayes drives the Midnight Black SUV matching both the representative traffic sample and the forensic paint analysis!' },
      { id: 'susp-1203', name: 'Chloe Rivera', age: 31, role: 'Rideshare Driver', avatarColor: '#eab308', alibi: 'Driving passengers in yellow cab.', motive: 'None.', traits: ['Yellow Prius'], isCulprit: false, contradiction: 'Chloe was verified on passenger app logs.' }
    ],
    correctConnections: [
      { from: 'ev-1201', to: 'ev-1202' },
      { from: 'ev-1202', to: 'ev-1203' }
    ],
    dsConcept: {
      name: 'Sampling Bias & Representative Datasets',
      description: 'Sampling bias occurs when a sample is collected in such a way that some members of the intended population have lower or higher sampling probability than others. A non-representative sample yields completely invalid inferences.',
      instructions: 'Compare the Gate 4 Convenience Sample against the Stratified Random Tollway Sample. Switch sampling modes to reveal how the true distribution exposes Senator Hayes’ black SUV.'
    },
    hints: [
      { id: 'small', title: 'Where was it polled?', cost: 10, description: 'Sample location', text: 'The 100 witnesses were all leaving a sports stadium where everyone wore red!' },
      { id: 'highlight', title: 'Representative Data', cost: 25, description: 'Tollway data', text: 'Tollway cameras sample across the entire city, not just one stadium door.' },
      { id: 'step', title: 'Forensic Paint', cost: 40, description: 'Spectrometry match', text: 'Bumper paint on the guardrail is Midnight Black, directly debunking the red car theory.' },
      { id: 'advanced', title: 'The True Driver', cost: 60, description: 'Politician exposed', text: 'Senator Hayes’ Black SUV has matching dented bumper damage.' }
    ],
    learningReport: {
      whatHappened: 'Senator Hayes fled the scene in a Midnight Black SUV while a biased convenience survey nearly framed an innocent red sports car driver.',
      whatDiscovered: 'A convenience sample biased by fan apparel produced an 88% false red vehicle consensus. Replacing it with a Stratified Random Sample accurately revealed the true distribution.',
      conceptName: 'Sampling Bias & Stratified Random Sampling',
      conceptDefinition: 'Error that occurs when a sample does not represent the population from which it was drawn. Random and stratified sampling ensure every subgroup has proportional representation.',
      realWorldApplication: 'Political polling (avoiding phone-only landline bias), clinical vaccine trials (ensuring diverse demographic representation), and machine learning training data fairness.',
      formulaOrRule: 'Selection Probability P(i) must be uniform or stratified: P(i ∈ Sample) = n / N',
      badgeTitle: 'Sampling Integrity Auditor',
      badgeIcon: 'PieChart'
    },
    dataset: {
      type: 'sampling',
      biasedSample: [
        { color: 'Red', count: 88, percentage: '88%' },
        { color: 'Black', count: 6, percentage: '6%' },
        { color: 'White', count: 4, percentage: '4%' },
        { color: 'Blue', count: 2, percentage: '2%' }
      ],
      representativeSample: [
        { color: 'Black / Dark SUV', count: 450, percentage: '45%' },
        { color: 'White Sedan', count: 250, percentage: '25%' },
        { color: 'Blue Sedan', count: 150, percentage: '15%' },
        { color: 'Silver Coupe', count: 100, percentage: '10%' },
        { color: 'Red Sports', count: 50, percentage: '5%' }
      ]
    }
  },

  // Case 13: THE OVERCONFIDENT DETECTIVE (Overfitting & Generalization)
  {
    id: 'case-013',
    caseNumber: 13,
    chapter: 3,
    title: 'The Overconfident Detective',
    subtitle: 'The 100% accurate algorithm that failed in the real world',
    difficulty: 'Advanced',
    rewardCoins: 400,
    rewardXp: 360,
    briefing: {
      crimeDescription: 'A tech startup deployed an AI security system claiming "100% perfect accuracy" on past museum break-in patterns. Yet during a real jewelry gallery heist last night, the system ignored the intruder completely! The model was severely overfitted: it memorized training noise with a complex polynomial rather than learning general patterns.',
      location: 'Apex Security Tech Incubator & Gem Gallery',
      incidentTime: 'Midnight Break-in',
      initialClues: [
        'Model training performance achieved 0% training error with a Degree 8 polynomial curve.',
        'On new unseen test scenarios, the model error skyrocketed to 82%!',
        'Overfitting occurs when a model fits noise and idiosyncrasies in the training set instead of the underlying true relationship.'
      ],
      missionObjective: 'Adjust model polynomial complexity slider from Degree 8 down to optimal Degree 2. Observe how training error slightly rises while real-world test error plunges to zero, catching the intruder.'
    },
    evidenceList: [
      { id: 'ev-1301', title: 'Polynomial Loss Curve Graph', type: 'document', x: 22, y: 22, rotation: -3, shortDesc: 'Train vs Test Error vs Polynomial Degree', content: 'Degree 8 gives Train Error = 0%, but Test Error = 82%. Degree 2 gives balanced 8% test error.', tag: 'Loss Curves' },
      { id: 'ev-1302', title: 'Intruder Motion Sensor Log', type: 'document', x: 52, y: 19, rotation: 3, shortDesc: 'Real-time telemetry during heist', content: 'Intruder walked at 1.2 m/s with 0.8s pauses. The overfitted model ignored him because training data only had 1.0 m/s.', tag: 'Sensor' },
      { id: 'ev-1303', title: 'Gallery Vault CCTV Still', type: 'photo', x: 80, y: 26, rotation: -2, shortDesc: 'Masked figure in black hoodie', content: 'Suspect exploited the blind spots created by the overfitted algorithm.', tag: 'Surveillance' }
    ],
    suspects: [
      { id: 'susp-1301', name: 'Devon Sterling', age: 31, role: 'Chief AI Architect', avatarColor: '#6366f1', alibi: 'Guaranteed investors the system was foolproof.', motive: 'Negligence and hubris.', traits: ['Built 8th Degree Model'], isCulprit: false, contradiction: 'Devon was incompetent and overconfident, but did not commit the burglary.' },
      { id: 'susp-1302', name: 'Lucas "Glitch" Bennett', age: 28, role: 'Ex-QA Tester & Burglar', avatarColor: '#dc2626', alibi: 'Playing video games at home.', motive: 'Knew the AI algorithm was overfitted and deliberately walked at 1.2 m/s to stay invisible!', traits: ['Ex-Tester', 'Possessed System Specs'], isCulprit: true, contradiction: 'Lucas read the overfitted algorithm’s source code and exploited the polynomial oscillation blind spot to steal the gems!' },
      { id: 'susp-1303', name: 'Sophia Chen', age: 35, role: 'Museum Director', avatarColor: '#10b981', alibi: 'At the gala.', motive: 'None.', traits: ['Victim'], isCulprit: false, contradiction: 'Sophia had no technical knowledge of machine learning.' }
    ],
    correctConnections: [
      { from: 'ev-1301', to: 'ev-1302' },
      { from: 'ev-1302', to: 'ev-1303' }
    ],
    dsConcept: {
      name: 'Overfitting vs. Generalization & Train-Test Splits',
      description: 'Overfitting occurs when a mathematical model is too complex relative to the amount and noise of the training data. It memorizes the training data perfectly (low training error) but fails catastrophically on new, unseen test data (high test error).',
      instructions: 'Drag the Model Complexity slider from Degree 8 down to Degree 2. Watch test loss decrease to its global minimum and catch Lucas Bennett.'
    },
    hints: [
      { id: 'small', title: 'Why Did 100% Fail?', cost: 10, description: 'Training vs Test', text: '100% on training data usually means the model memorized the test questions instead of learning concepts.' },
      { id: 'highlight', title: 'Optimal Degree', cost: 25, description: 'Check the slider', text: 'Look at the test error curve. What degree minimizes test error?' },
      { id: 'step', title: 'Reduce Complexity', cost: 40, description: 'Degree 2', text: 'Set Complexity to Degree 2. The generalized model flags the intruder’s motion signature.' },
      { id: 'advanced', title: 'The Rogue Tester', cost: 60, description: 'The Burglar', text: 'Lucas Bennett knew the overfitted model had blind spots and used them to raid the vault.' }
    ],
    learningReport: {
      whatHappened: 'Ex-QA tester Lucas Bennett exploited the overfitted AI system’s blind spots to walk past sensors undetected.',
      whatDiscovered: 'Lowering model complexity from Degree 8 (overfitting) to Degree 2 allowed the model to generalize properly, immediately identifying the intruder.',
      conceptName: 'Overfitting & Model Generalization',
      conceptDefinition: 'The fundamental machine learning challenge where excessive parameters capture noise instead of signal, resulting in high variance and poor out-of-sample generalization.',
      realWorldApplication: 'Autonomous driving obstacle detection, medical diagnostic imaging, algorithmic stock trading, and speech recognition engines.',
      formulaOrRule: 'Generalization Error = E_out(h) ≈ E_in(h) + Ω(Model Complexity)',
      badgeTitle: 'Generalization Master',
      badgeIcon: 'TrendingUp'
    },
    dataset: {
      type: 'overfitting',
      degrees: [
        { degree: 1, trainError: 32, testError: 35, status: 'Underfitting (Too Simple)' },
        { degree: 2, trainError: 12, testError: 14, status: 'OPTIMAL GENERALIZATION' },
        { degree: 3, trainError: 10, testError: 16, status: 'Good Balance' },
        { degree: 5, trainError: 4, testError: 42, status: 'Moderate Overfitting' },
        { degree: 8, trainError: 0, testError: 82, status: 'SEVERE OVERFITTING (Memorizing Noise)' }
      ]
    }
  },

  // Case 14: THE ACCURACY DILEMMA (The Bias-Variance Tradeoff)
  {
    id: 'case-014',
    caseNumber: 14,
    chapter: 3,
    title: 'The Accuracy Dilemma',
    subtitle: 'Balancing false positives and false negatives at the National Mint',
    difficulty: 'Advanced',
    rewardCoins: 400,
    rewardXp: 380,
    briefing: {
      crimeDescription: 'The National Mint’s biometric facial authentication gate is malfunctioning. When tuned with high bias (rigid simple model), it fails to recognize genuine staff wearing winter scarves (High Underfitting / False Rejections). When tuned with high variance (hyper-flexible model), it accepts spoofed photos printed on cardboard (High Overfitting / False Acceptance)!',
      location: 'Federal Mint Bullion Depository',
      incidentTime: 'Morning Shift Change',
      initialClues: [
        'Total Error = Bias² + Variance + Irreducible Error.',
        'High Bias causes underfitting (system is too stubborn).',
        'High Variance causes overfitting (system is too sensitive to noise).',
        'There is an exact sweet spot that minimizes total error.'
      ],
      missionObjective: 'Use the interactive Bias-Variance workbench to tune model capacity to the sweet spot (Capacity = 5), minimizing total error and blocking the counterfeit badge attack.'
    },
    evidenceList: [
      { id: 'ev-1401', title: 'Bias-Variance Error Decomposition Chart', type: 'document', x: 22, y: 22, rotation: -2, shortDesc: 'Curves for Bias², Variance, and Total Error', content: 'At Capacity 1: Bias²=65, Var=2. At Capacity 10: Bias²=6, Var=95. Minimum total error occurs at Capacity 5.', tag: 'Tradeoff' },
      { id: 'ev-1402', title: 'Security Incident Logs', type: 'document', x: 52, y: 19, rotation: 3, shortDesc: 'False positive & false negative log', content: '20 genuine employees locked out at low capacity; 2 intruders slipped through at high capacity.', tag: 'Audit' },
      { id: 'ev-1403', title: 'Forged 3D Latex Mask', type: 'photo', x: 80, y: 26, rotation: -3, shortDesc: 'Confiscated counterfeit mask', content: 'Latex mask designed to exploit high-variance sensitivity.', tag: 'Contraband' }
    ],
    suspects: [
      { id: 'susp-1401', name: 'Ivan "Chameleon" Morozov', age: 41, role: 'Master Impersonator', avatarColor: '#e11d48', alibi: 'Claims he was waiting in the lobby.', motive: 'Infiltrating the vault using high-variance model noise.', traits: ['Latex Mask', 'Exploits high variance'], isCulprit: true, contradiction: 'Tuning model capacity to the optimal balance point (Capacity = 5) exposes Ivan’s micro-texture anomalies and denies entry!' },
      { id: 'susp-1402', name: 'Chief Security Officer Bradley', age: 56, role: 'Security Supervisor', avatarColor: '#334155', alibi: 'Was yelling at the tech team about false rejections.', motive: 'None.', traits: ['Frustrated manager'], isCulprit: false, contradiction: 'Bradley only wanted employees to enter without delays.' },
      { id: 'susp-1403', name: 'Elena Vance', age: 30, role: 'Software Engineer', avatarColor: '#0284c7', alibi: 'Calibrating the camera lens.', motive: 'None.', traits: ['Calibrator'], isCulprit: false, contradiction: 'Elena warned management about the trade-off dilemma.' }
    ],
    correctConnections: [
      { from: 'ev-1401', to: 'ev-1402' },
      { from: 'ev-1402', to: 'ev-1403' }
    ],
    dsConcept: {
      name: 'The Bias-Variance Tradeoff',
      description: 'The Bias-Variance Tradeoff is the central dilemma in predictive modeling. Models with high bias underfit (rigid, oversimplified assumptions); models with high variance overfit (sensitive to random training fluctuations). The goal is to find the capacity sweet spot that minimizes Expected Test Error.',
      instructions: 'Drag the Model Capacity slider to 5 (the sweet spot where Bias² and Variance cross). Observe total error hit its absolute minimum.'
    },
    hints: [
      { id: 'small', title: 'What is Bias?', cost: 10, description: 'Underfitting', text: 'High bias means the model is too rigid and makes strong, simplistic assumptions.' },
      { id: 'highlight', title: 'What is Variance?', cost: 25, description: 'Overfitting', text: 'High variance means the model swings wildly and reacts to tiny noise variations.' },
      { id: 'step', title: 'Find the Minimum', cost: 40, description: 'Total Error curve', text: 'Look at the green Total Error curve. The trough (lowest valley) is at Capacity 5.' },
      { id: 'advanced', title: 'Unmask Ivan', cost: 60, description: 'Optimal threshold', text: 'At Capacity 5, Ivan’s counterfeit disguise is rejected with 99.4% statistical confidence.' }
    ],
    learningReport: {
      whatHappened: 'Ivan Morozov attempted to breach the vault using a latex mask, but tuning the biometric model to the optimal bias-variance tradeoff point apprehended him.',
      whatDiscovered: 'Neither an oversimplified model (High Bias) nor an overcomplicated model (High Variance) worked. The optimal capacity of 5 achieved the global minimum of Total Prediction Error.',
      conceptName: 'The Bias-Variance Tradeoff',
      conceptDefinition: 'The property of machine learning models wherein variance of estimated parameter values across samples can be reduced by increasing bias in estimated parameters: Error = Bias² + Variance + Noise.',
      realWorldApplication: 'Autonomous vehicle sensor fusion, spam filters, recommendation systems (Netflix / Spotify), and high-frequency algorithmic finance.',
      formulaOrRule: 'E[(y - f̂(x))²] = Bias[f̂(x)]² + Var[f̂(x)] + σ²',
      badgeTitle: 'Tradeoff Architect',
      badgeIcon: 'Sliders'
    },
    dataset: {
      type: 'bias_variance',
      capacities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  // Case 15: THE MASTERMIND (The Final Boss Case)
  {
    id: 'case-015',
    caseNumber: 15,
    chapter: 3,
    title: 'The Mastermind',
    subtitle: 'The multi-stage showdown with "The Cipher"',
    difficulty: 'Advanced',
    rewardCoins: 500,
    rewardXp: 500,
    briefing: {
      crimeDescription: 'All 14 previous cases were not isolated crimes — they were orchestrated by a shadow architect known only as "The Cipher". Now, The Cipher has initiated a coordinated cyber-financial strike to drain the City Municipal Reserves. To stop The Cipher, you must deploy the complete Data Science pipeline: Data Cleaning -> Outlier Detection -> Correlation Analysis -> Clustering -> Machine Learning Prediction!',
      location: 'City Underground Fiber Nexus & Tower Penthouse',
      incidentTime: 'Final Showdown: Zero Hour',
      initialClues: [
        'Data stream contains duplicate packet pings and missing values.',
        'An offshore financial flow contains an extreme IQR outlier.',
        'A correlation matrix reveals the true command server.',
        'K-Means clustering segregates the shadow nodes.',
        'A trained classifier identifies The Cipher’s true biometric identity!'
      ],
      missionObjective: 'Execute all 5 stages of the Data Science Investigation Pipeline to unmask and apprehend The Mastermind once and for all.'
    },
    evidenceList: [
      { id: 'ev-1501', title: 'Master Encrypted Transmission', type: 'document', x: 22, y: 22, rotation: -2, shortDesc: 'Multi-terabyte network dump', content: 'Contains corrupted packets, corrupted power spikes, and financial routing strings.', tag: 'Pipeline' },
      { id: 'ev-1502', title: 'The Cipher Syndicate Dossier', type: 'document', x: 52, y: 19, rotation: 3, shortDesc: 'Profiles of 4 syndicate chiefs', content: 'Victor Crane, Madame Vane, Arthur Sterling, and an unknown Executive Puppet Master.', tag: 'Dossier' },
      { id: 'ev-1503', title: 'Fiber Optic Physical Tap', type: 'photo', x: 80, y: 26, rotation: -3, shortDesc: 'Hardware tap on metropolitan backbone', content: 'Fiber tap routed directly into the penthouse of the Omnicorp Skyscraper.', tag: 'Hardware' }
    ],
    suspects: [
      { id: 'susp-1501', name: 'Lord Sterling Thorne (The Cipher)', age: 62, role: 'Billionaire Industrialist & Chairman', avatarColor: '#b45309', alibi: 'Claims he was in Geneva attending a charity summit.', motive: 'Total economic monopoly and collapse of municipal oversight.', traits: ['Mastermind', 'Penthouse Owner', 'All 5 Pipeline Signatures Match'], isCulprit: true, contradiction: 'The complete 5-stage Data Science pipeline converges on Sterling Thorne: cleaned logs show his private encrypted MAC address, outlier wire transfer was to his trust, and the ML classifier matched his biometric voice signature with 99.8% certainty!' },
      { id: 'susp-1502', name: 'Victor Crane', age: 41, role: 'Syndicate Lieutenant', avatarColor: '#dc2626', alibi: 'Serving prison time from Case 2.', motive: 'Lieutenant only.', traits: ['Underling'], isCulprit: false, contradiction: 'Crane was only a pawn taking orders from The Cipher.' },
      { id: 'susp-1503', name: 'Madame Vivienne Vane', age: 51, role: 'Fence Coordinator', avatarColor: '#8b5cf6', alibi: 'Already in custody from Case 9.', motive: 'Smuggling fence.', traits: ['Underling'], isCulprit: false, contradiction: 'Madame Vane was a regional cluster manager.' }
    ],
    correctConnections: [
      { from: 'ev-1501', to: 'ev-1502' },
      { from: 'ev-1502', to: 'ev-1503' }
    ],
    dsConcept: {
      name: 'The Complete End-to-End Data Science Lifecycle',
      description: 'Real-world data science is an iterative, compounding discipline: (1) Data Collection & Cleaning, (2) Exploratory Data Analysis & Statistics, (3) Feature Engineering & Correlation, (4) Unsupervised Clustering, and (5) Predictive Supervised Modeling. Combining every step delivers undeniable truth.',
      instructions: 'Complete all 5 pipeline verification steps on the master terminal to crack The Cipher’s encryption and convict Lord Sterling Thorne.'
    },
    hints: [
      { id: 'small', title: 'Step 1: Clean', cost: 10, description: 'De-duplicate and impute', text: 'First remove duplicate network pings and impute the missing packet timestamps.' },
      { id: 'highlight', title: 'Step 2 & 3: Outlier & Correlation', cost: 25, description: 'Statistical isolation', text: 'Isolate the \$120M wire anomaly and link the correlation spike to the fiber tap.' },
      { id: 'step', title: 'Step 4: Cluster Nodes', cost: 40, description: 'K-Means isolation', text: 'Group the 4 regional nodes to reveal the central command coordinate.' },
      { id: 'advanced', title: 'Unmask The Mastermind', cost: 60, description: 'The Final Boss', text: 'Lord Sterling Thorne is The Cipher. Run the final classifier to seal his indictment!' }
    ],
    learningReport: {
      whatHappened: 'Lord Sterling Thorne, Chairman of Omnicorp, was unmasked as "The Cipher" and apprehended in his penthouse before the reserves were wiped.',
      whatDiscovered: 'Deploying the entire Data Science lifecycle — from cleaning and IQR outlier detection to Pearson correlation, K-Means clustering, and classification — dismantled a citywide criminal syndicate.',
      conceptName: 'End-to-End Data Science Pipeline',
      conceptDefinition: 'The systematic scientific methodology comprising data acquisition, data cleaning/preprocessing, exploratory data analysis, feature engineering, modeling, evaluation, and deployment.',
      realWorldApplication: 'Autonomous systems, nationwide disease outbreak tracking, global financial crime enforcement (Interpol / FinCEN), and national cybersecurity defense.',
      formulaOrRule: 'Pipeline = DataClean ∘ StatAnalysis ∘ Correlation ∘ Clustering ∘ SupervisedModel',
      badgeTitle: 'Master Detective & Data Scientist',
      badgeIcon: 'Award'
    },
    dataset: {
      type: 'mastermind',
      pipelineStages: [
        { id: 1, title: 'Data Cleaning', task: 'Remove 3 duplicate spoofed packets and impute null values', completed: false },
        { id: 2, title: 'Outlier Isolation', task: 'Filter the $120M offshore wire outlier using IQR fence', completed: false },
        { id: 3, title: 'Correlation Tracking', task: 'Identify r = 0.99 link between fiber tap and server load', completed: false },
        { id: 4, title: 'Cluster Centrality', task: 'Run K-Means to identify the command hub at coordinate (50, 50)', completed: false },
        { id: 5, title: 'Classification Prediction', task: 'Run inference model on Thorne’s biometric profile (P = 0.998)', completed: false }
      ]
    }
  }
];
