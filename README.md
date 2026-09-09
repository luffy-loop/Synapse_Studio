Synapse — Interactive Algorithm Studio

An interactive space to understand algorithms, visualize their behavior, and explore how they work.

Live Demo: https://synapse-tour.netlify.app/

Overview

Synapse is a browser-based algorithm exploration platform built to make core computer science algorithms easier to understand through interaction and visualization.

Instead of only reading about an algorithm, users can experiment with it, observe how it behaves step by step, compare algorithms, and explore their time and space complexity.

Features

Sorting Lab — visualize Bubble, Selection, Insertion, Merge, and Quick Sort.

Searching Lab — experiment with Linear and Binary Search.

Graph Search — explore graph traversal and path-search behavior visually.

Algorithm Comparison — compare algorithm performance on generated datasets.

Algorithm Library — browse definitions, complexity, advantages, disadvantages, and applications.

Interactive Visualizations — observe algorithm operations through animated visual feedback.

Playback Controls — play, pause, adjust animation speed, and step through sorting visualizations.

Complexity Analysis — understand how algorithm performance changes with input size.

Responsive Interface — designed for desktop and smaller screens.

Algorithm Coverage

Category

Algorithms

Sorting

Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort

Graph Search

BFS, DFS, Uniform Cost Search, Greedy Search, A*

Searching

Linear Search, Binary Search

Tech Stack

HTML5 — page structure and semantic content

CSS3 — responsive layouts, visual system, animations, and effects

JavaScript — algorithm implementations, visualization logic, interaction, and state management

Canvas API — graph visualization

Netlify — deployment

No framework is required. Synapse is intentionally built with vanilla HTML, CSS, and JavaScript to keep the algorithm implementations visible and understandable.

Project Structure

Synapse_Studio/
├── assets/              # Visual assets and backgrounds
├── css/                 # Page-specific and global styles
├── js/                  # Algorithm and interaction logic
├── pages/               # Individual application pages
├── index.html           # Synapse dashboard
└── README.md            # Project documentation

Application Sections

Dashboard

The main entry point to Synapse, introducing the platform and its interactive algorithm labs.

Sorting

Visualize sorting algorithms and observe how elements are compared, swapped, and rearranged.

Search

Explore graph-based search concepts with an interactive graph visualization.

Searching

Experiment with Linear Search and Binary Search using animated array visualizations.

Compare

Run algorithm comparisons against generated datasets and inspect execution results and complexity information.

Library

Use the built-in reference library to explore algorithm definitions, complexity, applications, advantages, and limitations.

About

Learn about the motivation, scope, and implementation of Synapse.

Running Locally

Synapse is a static web application, so no package manager or build step is required.

Clone the repository.

Open the project folder.

Open index.html in a browser.

For the best development experience, use a local development server such as VS Code Live Server.

Why Synapse?

Algorithmic concepts are often taught through static diagrams, pseudocode, and theoretical complexity tables. Synapse takes a more interactive approach:

Understand → Visualize → Experiment → Compare

The goal is to make algorithm behavior easier to observe rather than treating algorithms as code that only runs in the background.

Project Context

Synapse was developed as an academic project for Computational Foundations of Artificial Intelligence (CFAI), with a focus on making algorithmic concepts more interactive and approachable.

Future Improvements

Planned improvements include:

richer algorithm playback and step controls

additional visualization modes

improved mobile interactions

deeper performance analytics

expanded algorithm coverage

accessibility improvements

automated testing

Author

Kandhula Poojasri Reddy

Computer Science Student · Developer · ML Explorer

⭐ If you find Synapse useful for learning algorithms, consider giving the repository a star.
