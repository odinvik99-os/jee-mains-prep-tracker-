/**
 * JEE Preparation Tracker Data
 * Based on 5-Year Previous-Year Question (PYQ) trends (2021-2025)
 * for JEE Main and JEE Advanced.
 *
 * NOTE: Marks values (avgMarks) and weightage percentages are approximate
 * PYQ-trend estimates based on average question frequencies across morning
 * and evening shifts (2021-2025). Actual distribution varies per shift.
 */

import { ChapterItem } from '../types/jee';

export const PHYSICS_CHAPTERS: ChapterItem[] = [
  {
    id: 'phy-curr-elec',
    subject: 'physics',
    chapter: 'Current Electricity',
    avgMarks: 12.8,
    weightagePercent: 10.7,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Ohm\'s Law & Drift Velocity', 'Kirchhoff\'s Rules', 'Potentiometer & Meter Bridge', 'RC Circuits transient analysis']
  },
  {
    id: 'phy-mod-phys',
    subject: 'physics',
    chapter: 'Modern Physics',
    avgMarks: 12.4,
    weightagePercent: 10.3,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Photoelectric Effect', 'Bohr Model & Spectra', 'De Broglie Wavelength', 'Radioactivity & Nuclear Binding Energy']
  },
  {
    id: 'phy-electrostatics',
    subject: 'physics',
    chapter: 'Electrostatics',
    avgMarks: 10.8,
    weightagePercent: 9.0,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Coulomb\'s Law & Field lines', 'Gauss Law & Flux applications', 'Electrostatic Potential & Dipoles', 'Conductors & Induced charges']
  },
  {
    id: 'phy-lom-wep',
    subject: 'physics',
    chapter: 'Laws of Motion & Work-Energy-Power',
    avgMarks: 9.6,
    weightagePercent: 8.0,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Newton\'s Laws & Friction', 'Work-Energy Theorem', 'Conservation of Momentum & Collisions', 'Vertical Circular Motion']
  },
  {
    id: 'phy-rotational',
    subject: 'physics',
    chapter: 'Rotational Motion',
    avgMarks: 8.8,
    weightagePercent: 7.3,
    difficulty: 'Hard',
    classLevel: '11th',
    coreTopics: ['Moment of Inertia Theorems', 'Torque & Angular Acceleration', 'Rolling without Slipping', 'Angular Momentum Conservation']
  },
  {
    id: 'phy-thermo-ktg',
    subject: 'physics',
    chapter: 'Thermodynamics & KTG',
    avgMarks: 8.4,
    weightagePercent: 7.0,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['First & Second Laws', 'Carnot Engine & Efficiency', 'Molar Specific Heats (Cp, Cv)', 'Ideal Gas Equation & RMS velocity']
  },
  {
    id: 'phy-magnetism-emi',
    subject: 'physics',
    chapter: 'Magnetism & EMI',
    avgMarks: 8.0,
    weightagePercent: 6.7,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Biot-Savart & Ampere\'s Law', 'Lorentz Force & Magnetic Dipole', 'Faraday & Lenz Law', 'Self & Mutual Inductance']
  },
  {
    id: 'phy-ray-optics',
    subject: 'physics',
    chapter: 'Ray Optics',
    avgMarks: 7.6,
    weightagePercent: 6.3,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Refraction at Spherical Surfaces', 'Lens Maker Formula', 'Prism Dispersion & Minimum Deviation', 'Optical Instruments']
  },
  {
    id: 'phy-waves-sound',
    subject: 'physics',
    chapter: 'Waves & Sound',
    avgMarks: 6.8,
    weightagePercent: 5.7,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Wave Equation & Speed', 'Standing Waves on Strings', 'Organ Pipes & Resonance', 'Doppler Effect & Beats']
  },
  {
    id: 'phy-capacitors',
    subject: 'physics',
    chapter: 'Capacitors',
    avgMarks: 6.4,
    weightagePercent: 5.3,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Parallel Plate Capacitance', 'Dielectric Insertion Effects', 'Energy Density & Sharing of Charges', 'Equivalent Capacitance Networks']
  },
  {
    id: 'phy-shm',
    subject: 'physics',
    chapter: 'SHM (Simple Harmonic Motion)',
    avgMarks: 6.0,
    weightagePercent: 5.0,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Linear & Angular SHM equations', 'Spring-Mass & Simple Pendulum', 'Energy conservation in SHM', 'Damped & Forced Oscillations']
  },
  {
    id: 'phy-semiconductors',
    subject: 'physics',
    chapter: 'Semiconductors',
    avgMarks: 5.6,
    weightagePercent: 4.7,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Energy Bands & Doping', 'p-n Junction Diode & Rectifiers', 'Zener Diode as Voltage Regulator', 'Logic Gates truth tables']
  },
  {
    id: 'phy-wave-optics',
    subject: 'physics',
    chapter: 'Wave Optics',
    avgMarks: 5.2,
    weightagePercent: 4.3,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Huygens Principle', 'Young\'s Double Slit Experiment (YDSE)', 'Fringe Width & Shift by Slab', 'Single Slit Diffraction']
  },
  {
    id: 'phy-gravitation',
    subject: 'physics',
    chapter: 'Gravitation',
    avgMarks: 4.8,
    weightagePercent: 4.0,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Gravitational Field & Potential', 'Kepler\'s Laws of Planetary Motion', 'Escape & Orbital Velocities', 'Geo-stationary Satellites']
  },
  {
    id: 'phy-units-dim',
    subject: 'physics',
    chapter: 'Units & Dimensions',
    avgMarks: 4.4,
    weightagePercent: 3.7,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Dimensional Formulae', 'Error Analysis & Propagation', 'Vernier Caliper & Screw Gauge', 'Significant Figures']
  },
  {
    id: 'phy-fluids',
    subject: 'physics',
    chapter: 'Fluids & Properties of Matter',
    avgMarks: 4.0,
    weightagePercent: 3.3,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Pascal\'s & Archimedes Principle', 'Bernoulli\'s Equation & Continuity', 'Viscosity & Stokes\' Law', 'Surface Tension & Capillarity']
  },
  {
    id: 'phy-em-waves',
    subject: 'physics',
    chapter: 'EM Waves',
    avgMarks: 3.6,
    weightagePercent: 3.0,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Displacement Current', 'Maxwell\'s Equations summary', 'EM Spectrum wavelengths & uses', 'Energy density & Poynting Vector']
  },
  {
    id: 'phy-comm-sys',
    subject: 'physics',
    chapter: 'Communication Systems',
    avgMarks: 2.8,
    weightagePercent: 2.3,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Modulation (AM, FM)', 'Bandwidth of Transmission', 'Propagation of EM Waves (Sky, Space)', 'Detection of AM waves']
  }
];

export const CHEMISTRY_CHAPTERS: ChapterItem[] = [
  {
    id: 'chem-bonding',
    subject: 'chemistry',
    chapter: 'Chemical Bonding',
    avgMarks: 11.6,
    weightagePercent: 9.7,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['VSEPR Theory & Shapes', 'Hybridization & Dipole Moment', 'Molecular Orbital Theory (MOT)', 'Hydrogen Bonding & Fajan\'s Rule']
  },
  {
    id: 'chem-coord-comp',
    subject: 'chemistry',
    chapter: 'Coordination Compounds',
    avgMarks: 10.8,
    weightagePercent: 9.0,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Werner\'s Theory & IUPAC naming', 'Isomerism (Structural & Stereoisomerism)', 'Crystal Field Theory (CFT) & Spectrochemical series', 'Color & Magnetic Moment']
  },
  {
    id: 'chem-goc',
    subject: 'chemistry',
    chapter: 'GOC (General Organic Chemistry)',
    avgMarks: 10.0,
    weightagePercent: 8.3,
    difficulty: 'Hard',
    classLevel: '11th',
    coreTopics: ['Inductive, Mesomeric & Hyperconjugation', 'Aromaticity (Hückel Rule)', 'Carbocation, Carbanion & Radical stability', 'Acidic & Basic Strength comparisons']
  },
  {
    id: 'chem-thermo',
    subject: 'chemistry',
    chapter: 'Thermodynamics & Thermochemistry',
    avgMarks: 9.2,
    weightagePercent: 7.7,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['First Law & Enthalpy of Reactions', 'Hess\'s Law & Bond Energies', 'Entropy & Gibbs Free Energy (Spontaneity)', 'Third Law of Thermodynamics']
  },
  {
    id: 'chem-electrochem',
    subject: 'chemistry',
    chapter: 'Electrochemistry',
    avgMarks: 8.8,
    weightagePercent: 7.3,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Galvanic Cells & Nernst Equation', 'Electrolytic Conductance & Kohlrausch Law', 'Faraday\'s Laws of Electrolysis', 'Commercial Batteries & Fuel Cells']
  },
  {
    id: 'chem-equilibrium',
    subject: 'chemistry',
    chapter: 'Chemical & Ionic Equilibrium',
    avgMarks: 8.4,
    weightagePercent: 7.0,
    difficulty: 'Hard',
    classLevel: '11th',
    coreTopics: ['Kp, Kc & Le Chatelier\'s Principle', 'pH calculations of Acids & Bases', 'Buffer Solutions & Henderson Equation', 'Solubility Product (Ksp) & Common Ion Effect']
  },
  {
    id: 'chem-carbonyl',
    subject: 'chemistry',
    chapter: 'Aldehydes, Ketones & Carboxylic Acids',
    avgMarks: 8.0,
    weightagePercent: 6.7,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Nucleophilic Addition Reactions', 'Aldol & Cannizzaro Condensations', 'Haloform, Clemmensen & Wolff-Kishner', 'HVZ Reaction & Decarboxylation']
  },
  {
    id: 'chem-hydrocarbons',
    subject: 'chemistry',
    chapter: 'Hydrocarbons',
    avgMarks: 7.6,
    weightagePercent: 6.3,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Markovnikov & Anti-Markovnikov addition', 'Ozonolysis of Alkenes & Alkynes', 'Electrophilic Aromatic Substitution (Benzene)', 'Wurtz & Kolbe Electrolytic reactions']
  },
  {
    id: 'chem-p-block',
    subject: 'chemistry',
    chapter: 'p-block Elements',
    avgMarks: 7.2,
    weightagePercent: 6.0,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Inert Pair Effect & Anomalous properties', 'Oxoacids of Phosphorus, Sulfur, Halogens', 'Interhalogen Compounds & Noble Gas compounds', 'Allotropes of Carbon & Phosphorus']
  },
  {
    id: 'chem-solutions',
    subject: 'chemistry',
    chapter: 'Solutions',
    avgMarks: 6.8,
    weightagePercent: 5.7,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Raoult\'s Law & Ideal/Non-ideal solutions', 'Colligative Properties (ΔTb, ΔTf, Osmotic P)', 'Van\'t Hoff Factor (i) & Association/Dissociation', 'Henry\'s Law']
  },
  {
    id: 'chem-df-block',
    subject: 'chemistry',
    chapter: 'd & f block Elements',
    avgMarks: 6.4,
    weightagePercent: 5.3,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Electronic Configurations & Oxidation States', 'Preparation & Properties of KMnO4 & K2Cr2O7', 'Lanthanoid Contraction & Consequences', 'Interstitial Compounds & Alloys']
  },
  {
    id: 'chem-kinetics',
    subject: 'chemistry',
    chapter: 'Chemical Kinetics',
    avgMarks: 6.0,
    weightagePercent: 5.0,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Rate Law & Order of Reaction', 'Integrated Rate Equations (0th & 1st Order)', 'Arrhenius Equation & Activation Energy', 'Pseudo First-Order Reactions']
  },
  {
    id: 'chem-amines',
    subject: 'chemistry',
    chapter: 'Amines',
    avgMarks: 5.6,
    weightagePercent: 4.7,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Basicity of Amines (Gas vs Aqueous)', 'Hoffmann Bromamide Degradation', 'Carbylamine Test & Hinsberg Test', 'Diazonium Salts reactions (Sandmeyer, Coupling)']
  },
  {
    id: 'chem-biomolecules',
    subject: 'chemistry',
    chapter: 'Biomolecules',
    avgMarks: 5.2,
    weightagePercent: 4.3,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Glucose & Fructose structure & mutarotation', 'Peptide Bond & Proteins structure', 'DNA/RNA Nucleic Acids bases', 'Vitamins & Deficiency diseases']
  },
  {
    id: 'chem-atomic-struct',
    subject: 'chemistry',
    chapter: 'Atomic Structure',
    avgMarks: 4.8,
    weightagePercent: 4.0,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Bohr\'s Postulates & Hydrogen Spectrum', 'Heisenberg Uncertainty & De Broglie', 'Quantum Numbers & Orbitals shapes', 'Aufbau, Pauli & Hund\'s Rules']
  },
  {
    id: 'chem-haloalkanes',
    subject: 'chemistry',
    chapter: 'Haloalkanes & Haloarenes',
    avgMarks: 4.4,
    weightagePercent: 3.7,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['SN1 vs SN2 Mechanisms & Stereochemistry', 'Elimination Reactions (E1 vs E2, Zaitsev)', 'Reactivity of Aryl Halides (Nucleophilic substitution)', 'Polyhalogen compounds (Chloroform, Freons)']
  },
  {
    id: 'chem-mole-concept',
    subject: 'chemistry',
    chapter: 'Mole Concept',
    avgMarks: 4.0,
    weightagePercent: 3.3,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Stoichiometry & Limiting Reagent', 'Concentration Terms (Molarity, Molality, Mole Fraction)', 'Empirical & Molecular Formula', 'Redox Titration & Equivalence Concept']
  },
  {
    id: 'chem-periodic-table',
    subject: 'chemistry',
    chapter: 'Periodic Table',
    avgMarks: 4.0,
    weightagePercent: 3.3,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Atomic & Ionic Radii trends', 'Ionization Enthalpy & Electron Gain Enthalpy', 'Electronegativity scales (Pauling/Mulliken)', 'Periodic trends in chemical reactivity']
  },
  {
    id: 'chem-alcohols',
    subject: 'chemistry',
    chapter: 'Alcohols, Phenols & Ethers',
    avgMarks: 3.6,
    weightagePercent: 3.0,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Preparation & Lucas Test for Alcohols', 'Reimer-Tiemann & Kolbe Reactions of Phenol', 'Williamson Ether Synthesis', 'Cleavage of Ethers with HI']
  },
  {
    id: 'chem-salt-analysis',
    subject: 'chemistry',
    chapter: 'Salt Analysis',
    avgMarks: 3.2,
    weightagePercent: 2.7,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Cation Group Analysis (Groups 0 to VI)', 'Anion Testing (Dilute H2SO4, Conc. H2SO4)', 'Flame Tests & Borax Bead Test', 'Confirmatory tests with specific reagents']
  },
  {
    id: 'chem-polymers',
    subject: 'chemistry',
    chapter: 'Polymers',
    avgMarks: 2.8,
    weightagePercent: 2.3,
    difficulty: 'Easy',
    classLevel: '12th',
    coreTopics: ['Classification (Addition vs Condensation)', 'Nylon-6, Nylon-6,6 & Dacron', 'Bakelite & Melamine-Formaldehyde resins', 'Biodegradable Polymers (PHBV, Nylon-2-Nylon-6)']
  }
];

export const MATHS_CHAPTERS: ChapterItem[] = [
  {
    id: 'math-integration',
    subject: 'maths',
    chapter: 'Integration',
    avgMarks: 12.8,
    weightagePercent: 10.7,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Standard Integrals & Substitution', 'Integration by Parts & Partial Fractions', 'King\'s Property & Periodic Definite Integrals', 'Leibnitz Rule (Differentiating Integrals)']
  },
  {
    id: 'math-vectors-3d',
    subject: 'maths',
    chapter: 'Vectors & 3D Geometry',
    avgMarks: 12.0,
    weightagePercent: 10.0,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Dot & Cross Product, Scalar Triple Product (STP)', 'Vector Triple Product & Linear Independence', 'Equation of Straight Line in 3D', 'Shortest Distance between Skew Lines']
  },
  {
    id: 'math-diff-aod',
    subject: 'maths',
    chapter: 'Differentiation & Application of Derivatives',
    avgMarks: 10.4,
    weightagePercent: 8.7,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Chain Rule & Implicit Differentiation', 'Monotonicity & Maxima-Minima', 'Mean Value Theorems (Rolle\'s & LMVT)', 'Tangent & Normal, Rate of Change']
  },
  {
    id: 'math-matrices-det',
    subject: 'maths',
    chapter: 'Matrices & Determinants',
    avgMarks: 9.6,
    weightagePercent: 8.0,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Properties of Determinants & Cofactors', 'Inverse of Matrix & Adjoint properties', 'System of Linear Equations (Cramer\'s Rule)', 'Cayley-Hamilton Theorem & Matrix polynomials']
  },
  {
    id: 'math-conic-sections',
    subject: 'maths',
    chapter: 'Conic Sections',
    avgMarks: 9.2,
    weightagePercent: 7.7,
    difficulty: 'Hard',
    classLevel: '11th',
    coreTopics: ['Standard Parabola equations & Focal Chord', 'Ellipse: Eccentricity & Director Circle', 'Hyperbola: Asymptotes & Rectangular hyperbola', 'Common Tangents between Conics']
  },
  {
    id: 'math-probability',
    subject: 'maths',
    chapter: 'Probability',
    avgMarks: 8.4,
    weightagePercent: 7.0,
    difficulty: 'Hard',
    classLevel: '12th',
    coreTopics: ['Conditional Probability & Independence', 'Total Probability & Bayes\' Theorem', 'Random Variables & Probability Distributions', 'Binomial Distribution mean and variance']
  },
  {
    id: 'math-sequence-series',
    subject: 'maths',
    chapter: 'Sequence & Series',
    avgMarks: 8.0,
    weightagePercent: 6.7,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['AP, GP & HP properties', 'Arithmetico-Geometric Progression (AGP)', 'Telescoping Sums (V_n method)', 'AM-GM-HM Inequalities']
  },
  {
    id: 'math-limits-continuity',
    subject: 'maths',
    chapter: 'Limits-Continuity',
    avgMarks: 7.6,
    weightagePercent: 6.3,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Evaluation of Indeterminate Forms (0/0, 1^inf)', 'Standard Expansion Series (Maclaurin)', 'Continuity & Intermediate Value Property', 'Differentiability tests']
  },
  {
    id: 'math-diff-equations',
    subject: 'maths',
    chapter: 'Differential Equations',
    avgMarks: 7.2,
    weightagePercent: 6.0,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Variable Separable method', 'Homogeneous Differential Equations', 'Linear Differential Equations (Integrating Factor)', 'Exact Differential Equations & Reducible forms']
  },
  {
    id: 'math-complex-numbers',
    subject: 'maths',
    chapter: 'Complex Numbers',
    avgMarks: 6.8,
    weightagePercent: 5.7,
    difficulty: 'Hard',
    classLevel: '11th',
    coreTopics: ['Modulus-Amplitude & Euler Form', 'Triangle Inequality & Geometry in Argand Plane', 'Cube Roots of Unity (1, w, w^2)', 'De Moivre\'s Theorem & nth roots']
  },
  {
    id: 'math-circle',
    subject: 'maths',
    chapter: 'Circle',
    avgMarks: 6.4,
    weightagePercent: 5.3,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Standard & General equation of Circle', 'Position of Point & Line with respect to Circle', 'Tangent, Normal & Chord of Contact', 'Family of Circles & Orthogonality']
  },
  {
    id: 'math-straight-lines',
    subject: 'maths',
    chapter: 'Straight Lines',
    avgMarks: 6.0,
    weightagePercent: 5.0,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Slope, Intercept & Normal forms', 'Distance of a Point from a Line', 'Family of Lines passing through intersection', 'Angle Bisectors & Pair of Straight Lines']
  },
  {
    id: 'math-pnc',
    subject: 'maths',
    chapter: 'Permutation-Combination',
    avgMarks: 5.6,
    weightagePercent: 4.7,
    difficulty: 'Hard',
    classLevel: '11th',
    coreTopics: ['Fundamental Principle of Counting', 'Circular Permutations & Restricted Arrangements', 'Division into Groups & Distribution', 'Derangements & Multinomial Theorem']
  },
  {
    id: 'math-binomial-theorem',
    subject: 'maths',
    chapter: 'Binomial Theorem',
    avgMarks: 5.2,
    weightagePercent: 4.3,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['General Term & Middle Term', 'Greatest Term & Numerically Greatest Term', 'Properties of Binomial Coefficients', 'Binomial Theorem for Any Index & Approximations']
  },
  {
    id: 'math-area-under-curve',
    subject: 'maths',
    chapter: 'Area Under Curve',
    avgMarks: 4.8,
    weightagePercent: 4.0,
    difficulty: 'Medium',
    classLevel: '12th',
    coreTopics: ['Area bounded by standard curves', 'Area between intersecting curves', 'Curve sketching fundamentals', 'Symmetry considerations in integration']
  },
  {
    id: 'math-quadratic',
    subject: 'maths',
    chapter: 'Quadratic Equations',
    avgMarks: 4.4,
    weightagePercent: 3.7,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Relation between Roots and Coefficients', 'Nature of Roots & Discriminant', 'Location of Roots conditions', 'Common Roots condition']
  },
  {
    id: 'math-sets-relations',
    subject: 'maths',
    chapter: 'Sets-Relations-Functions',
    avgMarks: 4.0,
    weightagePercent: 3.3,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Types of Relations (Equivalence, Transitive)', 'Domain and Range determination', 'Injective, Surjective & Bijective Functions', 'Composite & Inverse Functions']
  },
  {
    id: 'math-statistics',
    subject: 'maths',
    chapter: 'Statistics',
    avgMarks: 4.0,
    weightagePercent: 3.3,
    difficulty: 'Easy',
    classLevel: '11th',
    coreTopics: ['Mean, Median & Mode', 'Variance and Standard Deviation formulas', 'Effect of shifting of origin and change of scale', 'Combined Mean and Variance']
  },
  {
    id: 'math-trigonometry',
    subject: 'maths',
    chapter: 'Trigonometry',
    avgMarks: 3.6,
    weightagePercent: 3.0,
    difficulty: 'Medium',
    classLevel: '11th',
    coreTopics: ['Compound Angle Formulae', 'General Solutions of Trig Equations', 'Inverse Trigonometric Functions (ITF) identities', 'Heights and Distances & Triangle Properties']
  }
];

// Helper to determine priority badge
export const getPriority = (avgMarks: number): 'High' | 'Medium' | 'Low' => {
  if (avgMarks >= 8.0) return 'High';
  if (avgMarks >= 5.0) return 'Medium';
  return 'Low';
};

// All combined sorted list
export const ALL_CHAPTERS: ChapterItem[] = [
  ...PHYSICS_CHAPTERS,
  ...CHEMISTRY_CHAPTERS,
  ...MATHS_CHAPTERS
];

export const SUBJECT_INFO = {
  physics: {
    id: 'physics',
    name: 'Physics',
    totalMarksEstimate: PHYSICS_CHAPTERS.reduce((acc, c) => acc + c.avgMarks, 0),
    accentColor: '#06b6d4', // cyan-500
    themeClass: 'from-cyan-500/20 via-sky-500/10 to-blue-500/5',
    borderClass: 'border-cyan-500/30',
    textGradient: 'from-cyan-400 to-blue-500',
    badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    modelType: 'atom' as const
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    totalMarksEstimate: CHEMISTRY_CHAPTERS.reduce((acc, c) => acc + c.avgMarks, 0),
    accentColor: '#10b981', // emerald-500
    themeClass: 'from-emerald-500/20 via-teal-500/10 to-green-500/5',
    borderClass: 'border-emerald-500/30',
    textGradient: 'from-emerald-400 to-teal-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    modelType: 'molecule' as const
  },
  maths: {
    id: 'maths',
    name: 'Mathematics',
    totalMarksEstimate: MATHS_CHAPTERS.reduce((acc, c) => acc + c.avgMarks, 0),
    accentColor: '#8b5cf6', // violet-500
    themeClass: 'from-purple-500/20 via-violet-500/10 to-fuchsia-500/5',
    borderClass: 'border-violet-500/30',
    textGradient: 'from-violet-400 to-fuchsia-400',
    badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    modelType: 'geometry' as const
  }
};
