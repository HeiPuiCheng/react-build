# 4-Week React Learning Plan: Chat online 
**Technology:** React (Vite)
**Current Knowledge Level:** Beginner (Can set up a project and edit the main page)
**Final Goal:** By the end of Week 5, have a working React frontend that functions as a Discord/TeamSpeak clone. It must connect to a backend REST API, handle user authentication (login/signup), support different chat rooms, and allow for sending text and pictures. 
**Time Commitment:** ~8-10 hours per week

----------------

### Week 2: React Fundamentals & The UI Foundation
*Goal: Understand React components, props, and build the static layout of the chat application.*

*   **Concepts to Learn:**
    *   JSX syntax and building functional components.
    *   Passing data using `props`.
    *   Rendering lists (e.g., mapping over an array of mock chat channels).
    *   Basic CSS styling in React.
*   **Milestones:**
    *   Create a `Sidebar` component for server/room navigation.
    *   Create a `ChatWindow` component that displays hardcoded, mock messages.
    *   Create a `MessageInput` component (just the visual layout, not functional yet).
*   **Recommended Resources:**
    *   [React Official Docs: Describing the UI](https://react.dev/learn/describing-the-ui)

### Week 3: State Management, Forms, and Routing
*Goal: Make the UI interactive, handle user input, and navigate between pages.*

*   **Concepts to Learn:**
    *   The `useState` hook for managing local component state.
    *   Handling form submissions (specifically for the Login and Chat Input boxes).
    *   Client-side routing using React Router.
*   **Milestones:**
    *   Implement React Router to navigate between a `/login` page and the main `/app` chat interface.
    *   Build a functional Login/Signup form that captures the email and password into state.
    *   Make the chat input field update state as the user types.
*   **Recommended Resources:**
    *   [React Official Docs: Adding Interactivity](https://react.dev/learn/adding-interactivity)
    *   [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

### Week 4: API Integration & Authentication
*Goal: Connect the React frontend to the backend REST API to handle real user sessions.*

*   **Concepts to Learn:**
    *   The `useEffect` hook for side effects (like data fetching).
    *   Making HTTP requests using `fetch` or `axios`.
    *   Handling Authentication (storing session tokens securely or managing HTTP-only cookies).
*   **Milestones:**
    *   Wire up the Login form to send a `POST` request to the API and handle the success/error response.
    *   Store the auth token/session state to conditionally render the chat app only if the user is logged in.
    *   Fetch the actual list of chat rooms from the API using `useEffect` on component mount.
*   **Recommended Resources:**
    *   [React Official Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
    *   Documentation for `axios` or MDN Web Docs for `Fetch API`.

### Week 5: Advanced Features & Final Polish
*Goal: Achieve full CRUD functionality for messages and handle image uploads.*

*   **Concepts to Learn:**
    *   Handling complex state updates.
    *   Working with `FormData` to upload images to the API.
    *   *Stretch Goal:* Polling or WebSockets for real-time message updates without refreshing the page.
*   **Milestones:**
    *   Users can successfully type a message and `POST` it to the API, immediately seeing it appear in the chat window.
    *   Users can switch between different chat rooms, fetching the relevant messages for the active room.
    *   Implement image uploading alongside text messages.
*   **Recommended Resources:**
    *   MDN Web Docs on `FormData` and File Inputs.