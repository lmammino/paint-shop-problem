# Sample grammar for parsing the input files with the nearley parser generator
# You can test this grammar here: https://omrelli.ug/nearley-playground/

Main ->
  NumberOfColors Preferences

NumberOfColors ->
  int newline

Preferences ->
  PreferencesLine |
  PreferencesLine Preferences

PreferencesLine ->
  Preference newline |
  Preference PreferencesLine

Preference ->
  int _ Finish _

Finish ->
  "M" |
  "G"

int ->
  [0-9]:+  {% function(d) {return {v: parseInt(d, 10)}} %}

newline ->
  "\n" |
  "\r\n"

_ ->
  [\s]:*   {% function(d) {return null } %}
