# Create Account Form

## Setup

Your component is at `FormValidation.tsx`. The app is running at http://localhost:5173.

## Requirements

Build a signup form with the following fields:

| Field            | Type     | Validation                                          |
|------------------|----------|-----------------------------------------------------|
| Name             | text     | Required, min 2 characters                          |
| Email            | text     | Required, must contain `@` and `.`                  |
| Password         | password | Required, min 8 characters, must contain a number   |
| Confirm Password | password | Required, must match Password                       |

### Behavior

- Validate all fields **on submit** — if any errors, show them and do not submit
- Validate each field **on blur** — show that field's error when the user leaves it
- **Clear** a field's error when the user starts typing in it
- On successful submit, display "Account created!" and reset the form

### Styling

- Center the form on the page, max-width 400px
- Inputs full-width with padding
- Error text: red, small font, below the input
- Input border turns red when that field has an error
- Success message in green
- Submit button says "Create Account"

## Time

30 minutes.
