
## You have been asked to write a function called segment that accepts 3 parameters 

A string called mess (of at least 20 characters) 
A width (number of characters to display) must be <20 and >10 
A start index between 0 and the length of the string -1 

It should return a string of exactly width characters which contains the portion of the string starting from start index. If there are not enough characters, repeat from the start of the mess string 

Example 1 

    segment(“DAVEBLOKE”, 5, 3) returns “LOK” 

Example 2 

    segment(“DAVEBLOKE”, 7, 5) returns “KEDAV” 

You will need to look up how the substring function works in JavaScript along with how to determine the length of a string and how concatenation works. 
