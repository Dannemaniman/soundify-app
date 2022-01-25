Feature: Search Song

    As a user, i would like to be able to search for a specific song.

    Background: Conditions
    Given that we have a working API.
    And an input field
    And a working function for searching for a specific song
    And that the user has an account
    And is logged in

    Scenario: User creates an account
    Given that the user is in signup page
    Given we have a functioning registerbutton
    When the user types in desired credentials and password
    And we typed in correct email
    And when the user presses "Create Account"
    Then we send the new account to database
    And we get logged in
    Then sent to landing page

    Scenario: User goes to searchpage
    Given that the search-icon in header is fully functioning
    When user is logged in
    And presses the search-icon in header
    Then the user will be redirected to search page

    Scenario: User searches for a specific song
    Given that the search-input field is functioning
    Given we have a functioning API
    When user types in the searchfield
    Then the searchword will be sent to the API
    And the Api responds with results