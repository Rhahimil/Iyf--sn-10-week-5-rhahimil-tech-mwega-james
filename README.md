# Week 5: DOM Manipulation

## Author
- **Name:** James Mwega Kariuki
- **GitHub:** [@Rhahimil](https://github.com/Rhahimil)
- **Date:** April 18, 2026

## Project Description
An interactive To-Do List application built with vanilla JavaScript, demonstrating DOM manipulation and event handling. Users can add, toggle, delete, and filter tasks, with bonus editing functionality.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## Features
- Add new tasks with form validation
- Toggle task completion status
- Delete individual tasks
- Filter tasks (All, Active, Completed)
- Display remaining task count
- Clear all completed tasks
- Edit tasks inline (double-click to edit)
- Responsive design with modern UI

## How to Run
1. Clone this repository
2. Open `index.html` in your browser

## Lessons Learned
- DOM selection and manipulation techniques
- Event handling and delegation with `closest()` – Using `closest()` in delegated listeners is crucial because it traverses up the DOM tree to find the nearest ancestor matching a selector, allowing a single event listener on a parent element to efficiently handle interactions on dynamically created child elements without attaching individual listeners to each one.
- `closest()` simplifies complex event targeting by eliminating the need to manually check parent elements or maintain references to individual DOM nodes, reducing memory overhead and improving performance on large lists.
- State management in vanilla JavaScript
- CSS styling for interactive components
- Form validation and user input handling

## Challenges Faced
- Implementing event delegation for dynamic elements
- Managing state updates and re-rendering
- Creating smooth editing experience with focus management
- Ensuring proper event propagation and prevention

## Screenshots (optional)
![To-Do List App](screenshot.png)