When forms validate inputs for users before they hit submit, it’s to prevent frustration when they later hit submit with improper inputs and are rejected. The second worst user experience you can provide is to wait until the user has filled out all the information and hits submit, only to be rejected for an unclear reason and forced to re-enter information- I’ll get to the worst in a second.

# Rules

- Name: A non-empty​ string of alpha characters
- Validate after the field is blurred (cursor no longer in the field)
- Username: A string of characters which are either numbers, letters, periods, or underscores.
- Validate after the field is blurred
- Password: A string of alphanumeric characters greater than length 6
- Validate as typed
- Rated by the following:
- Weak: Less than 6 length
- Fair: Greater than 6 length
- Good: Greater than 6 length and has a mix of letters and numbers
- Birthday: Numbers
- Validate after the field is blurred
- Extra guidance provided by:
  inability to continue typing past character limit (2 for day, 4 for year)
  inability to type non-numeric characters (typing ‘a’ does nothing)
- Phone number: Numbers with hyphens and parentheses
- Parentheses can only surround the initial set of numbers
- Hyphens must appear between numbers
- Current email address: String of ASCII characters with @ and . existing between any characters (can’t be at the beginning or end)

# Types of tests

There are three broad categories of tests that can be automated in web apps.

- Unit tests
  - These test individual functions. For example, if you have a function that’s supposed to return true given a certain input and false otherwise, that’s easily testable with unit tests.
  - It only covers JavaScript code
- Integration tests
  - These test functions that are working together. For example, when one function calls another and uses that result in a different function call.
  - It only covers JavaScript code. A lot of business logic can be tested here.
- Acceptance Tests
  - These test functionality in the web app as a whole through the client interface. For example, when the user clicks on a button, a popup appears.
  - A lot of the user experience guarantees are tested here. JavaScript should not be called directly; these tests are concerned with the outcome of user-taken actions.​
