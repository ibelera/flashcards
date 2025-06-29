Product Requirements Document: "Lernkarten" - German Flashcard App
Version: 1.0

Date: June 28, 2024

Author: Product Expert (AI) & App Visionary

1. Introduction & Vision
1.1. Product Vision
To create a simple, effective, and encouraging web application that helps beginners learn German vocabulary through a classic flashcard system, reinforced by intelligent quizzing and progress tracking.

1.2. Project Goal
The primary goal is to build a Minimum Viable Product (MVP) of a flashcard web app for learning German-to-English vocabulary. The application will be fast, intuitive, and focused on a core loop of learning, self-assessment, and reviewing difficult words.

1.3. Target Audience
Primary: English-speaking individuals at the beginning of their German language learning journey (A1/A2 levels).

Secondary: Intermediate learners looking to create custom decks for specific topics (e.g., travel, business, grammar).

1.4. Key Performance Indicators (KPIs)
Number of flashcards studied per session.

Ratio of correct vs. incorrect answers.

Number of custom cards created by users.

2. Features & Functionality
2.1. Core Flashcard Experience
The main interface for learning new words.

FR-1.1: Card Display:

Each card will display a single German word on its front.

The user interface will show one card at a time to maintain focus.

FR-1.2: Card Flipping:

Clicking or tapping on the card will trigger a smooth flip animation.

The back of the card will reveal the corresponding English translation.

FR-1.3: Self-Assessment:

Once a card is flipped, two buttons will appear below it: "I got it wrong" (e.g., red button with an X) and "I got it right" (e.g., green button with a checkmark).

This action is mandatory to proceed to the next card.

FR-1.4: State Persistence (Incorrect Cards):

The application must remember which cards the user marked as "I got it wrong" within a session.

This list of "incorrect" cards will be used for the "Review Mode" feature. This state should be stored locally in the browser.

2.2. Card Decks & Content
Management of the learning content.

FR-2.1: Pre-loaded Deck:

The application will come pre-loaded with one default deck titled "Top 250 German Words."

This deck will contain 250 common German nouns, verbs, and adjectives and their English translations.

FR-2.2: Custom Card Creation:

Users must have the ability to create their own cards.

A simple form with two fields ("German Word," "English Translation") and a "Save Card" button will be provided.

Custom cards will be saved to a default "My Custom Deck" or a user-named deck.

2.3. Learning Modes
FR-3.1: Review Mode:

Users can initiate a session that exclusively cycles through the cards they previously marked as "I got it wrong."

When a card is answered correctly in this mode, it is removed from the "incorrect" list for the next review session.

FR-3.2: Quiz/Test Mode:

The quiz mode will test the user's knowledge of a selected deck. It will include two question types, presented randomly:

Multiple Choice: A German word is shown with four English options. One is correct; the other three are randomly selected from other words in the same deck.

Fill-in-the-Blank: An English word is shown with a text input field. The user must type the correct German translation. A correct answer is accepted if it matches the stored German word (case-insensitive).

2.4. Statistics & Progress Tracking
FR-4.1: Statistics Page:

A dedicated page accessible from the main navigation.

It will display simple, lifetime statistics stored in the browser's local storage.

Metrics to Display:

Total Cards Studied (cumulative count of every card flipped and assessed).

Total Correct Answers.

Total Incorrect Answers.

Number of Custom Cards Created.

3. Technical Stack & Requirements
Frontend Framework: React with Vite

Language: TypeScript

Styling: A modern CSS framework (e.g., Tailwind CSS) is recommended for rapid, responsive UI development.

State Management: React Hooks (useState, useContext) for local/session state.

Local Storage: Browser localStorage API will be used for persisting decks and statistics. No backend or database is required for the MVP.

4. Design & User Experience (UX)
DU-1: Clean & Minimalist UI: The interface should be uncluttered, with a clear focus on the flashcard itself.

DU-2: Responsive Design: The application must be fully usable and look good on all screen sizes, from mobile phones to desktops.

DU-3: Clear Call-to-Actions: Buttons and interactive elements should be obvious and easy to understand.

DU-4: Visual Feedback: Use animations and color (e.g., for correct/incorrect) to provide immediate feedback to the user.

5. Out of Scope for MVP v1.0
To ensure a timely release, the following features will not be included in the initial version but may be considered for future releases:

User accounts and cloud synchronization.

Audio pronunciation of words.

Spaced Repetition System (SRS) algorithms.

Advanced statistics with charts and progress over time.

Multiple custom decks and a deck management interface.

Sharing decks with other users.

Gamification elements (streaks, points, leaderboards).