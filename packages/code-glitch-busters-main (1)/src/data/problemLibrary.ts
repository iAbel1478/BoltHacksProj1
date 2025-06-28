
// Update the gear and sidekick rewards to be functional
const functionalRewards = {
  gear: [
    { name: "Debug Magnifying Glass", emoji: "🔍", type: "gear", description: "Highlights syntax errors and logical inconsistencies" },
    { name: "Stack Trace Compass", emoji: "🧭", type: "gear", description: "Points toward the root cause of runtime errors" },
    { name: "Memory Leak Detector", emoji: "📡", type: "gear", description: "Shows memory usage patterns and identifies leaks" },
    { name: "Syntax Shield", emoji: "🛡️", type: "gear", description: "Protects against common syntax mistakes" },
    { name: "Logic Lens", emoji: "🔍", type: "gear", description: "Reveals logical inconsistencies in code flow" },
    { name: "Error Eliminator", emoji: "⚡", type: "gear", description: "Automatically suggests fixes for common errors" },
    { name: "Cross-Platform Translator", emoji: "🌐", type: "gear", description: "Converts code logic between programming languages" }
  ],
  sidekicks: [
    { name: "Linter the Owl", emoji: "🦉", type: "sidekick", description: "Spots code style issues and suggests best practices" },
    { name: "Debugger the Bloodhound", emoji: "🐕", type: "sidekick", description: "Follows execution paths and sniffs out problems" },
    { name: "Tester the Chameleon", emoji: "🦎", type: "sidekick", description: "Adapts to any testing framework and generates test cases" },
    { name: "Bracket Buddy", emoji: "🔧", type: "sidekick", description: "Helps track matching brackets and parentheses" },
    { name: "Variable Validator", emoji: "📝", type: "sidekick", description: "Checks variable names and scope issues" },
    { name: "Git the Elephant", emoji: "🐘", type: "sidekick", description: "Uses version history to identify when bugs were introduced" }
  ]
};

export const problemLibrary = [
  // JavaScript Problems (25 problems)
  {
    title: "Missing Semicolon Crisis",
    language: "JavaScript",
    digitalWorld: "E-commerce Website",
    description: "A shopping cart function is broken due to missing punctuation.",
    buggyCode: `function addToCart(item, price) {
  let total = price * 1.1
  return total;
}`,
    solution: `function addToCart(item, price) {
  let total = price * 1.1;
  return total;
}`,
    multipleChoice: [
      "Add semicolon after price * 1.1",
      "Remove the return statement",
      "Add comma after item",
      "Change let to var"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "JavaScript statements need semicolons to separate commands properly.",
    realWorldContext: "Shopping carts calculate taxes and totals for online purchases.",
    hints: ["Look for missing punctuation", "JavaScript uses semicolons", "Check line 2"],
    reward: functionalRewards.gear[0]
  },

  {
    title: "Bracket Mismatch Mayhem",
    language: "JavaScript",
    digitalWorld: "Social Media App",
    description: "User login function has mismatched brackets causing crashes.",
    buggyCode: `function validateUser(username, password) {
  if (username.length > 0 && password.length > 8 {
    return true;
  }
  return false;
}`,
    solution: `function validateUser(username, password) {
  if (username.length > 0 && password.length > 8) {
    return true;
  }
  return false;
}`,
    multipleChoice: [
      "Add closing parenthesis after > 8",
      "Remove the if statement",
      "Add semicolon at the end",
      "Change && to ||"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Every opening parenthesis needs a matching closing parenthesis.",
    realWorldContext: "User authentication protects accounts from unauthorized access.",
    hints: ["Count your parentheses", "Look for unmatched brackets", "Check the if condition"],
    reward: functionalRewards.sidekicks[3]
  },

  {
    title: "Variable Name Typo",
    language: "JavaScript",
    digitalWorld: "Weather App",
    description: "Temperature display is broken due to a variable name error.",
    buggyCode: `function displayTemp(celsius) {
  let fahrenheit = celsius * 9/5 + 32;
  console.log("Temperature: " + farenheit + "°F");
}`,
    solution: `function displayTemp(celsius) {
  let fahrenheit = celsius * 9/5 + 32;
  console.log("Temperature: " + fahrenheit + "°F");
}`,
    multipleChoice: [
      "Fix spelling: farenheit to fahrenheit",
      "Change let to var",
      "Add semicolon after console.log",
      "Remove the + 32"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "beginner",
    explanation: "Variable names must be spelled exactly the same when declared and used.",
    realWorldContext: "Weather apps convert between Celsius and Fahrenheit for users worldwide.",
    hints: ["Check variable spelling", "Compare declaration and usage", "Look at line 3"],
    reward: functionalRewards.sidekicks[4]
  },

  {
    title: "Undefined Variable Disaster",
    language: "JavaScript",
    digitalWorld: "Gaming Platform",
    description: "Player score calculation fails due to an undefined variable.",
    buggyCode: `function calculateScore(basePoints, multiplier) {
  let bonus = 100;
  let finalScore = basePoints * multiplyer + bonus;
  return finalScore;
}`,
    solution: `function calculateScore(basePoints, multiplier) {
  let bonus = 100;
  let finalScore = basePoints * multiplier + bonus;
  return finalScore;
}`,
    multipleChoice: [
      "Fix spelling: multiplyer to multiplier",
      "Remove the bonus variable",
      "Change let to const",
      "Add semicolon after bonus"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "beginner",
    explanation: "Variable names must match exactly - JavaScript is case-sensitive.",
    realWorldContext: "Gaming platforms need accurate score calculations for leaderboards.",
    hints: ["Check parameter spelling", "Compare function parameters", "Look at line 3"],
    reward: functionalRewards.gear[1]
  },

  {
    title: "Array Index Out of Bounds",
    language: "JavaScript",
    digitalWorld: "Music Streaming Service",
    description: "Playlist function crashes when trying to access songs.",
    buggyCode: `function getLastSong(playlist) {
  if (playlist.length > 0) {
    return playlist[playlist.length];
  }
  return null;
}`,
    solution: `function getLastSong(playlist) {
  if (playlist.length > 0) {
    return playlist[playlist.length - 1];
  }
  return null;
}`,
    multipleChoice: [
      "Subtract 1 from playlist.length",
      "Remove the if condition",
      "Change > to >=",
      "Use playlist[0] instead"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "intermediate",
    explanation: "Array indices start at 0, so the last element is at length - 1.",
    realWorldContext: "Music apps need to correctly access playlist items for playback.",
    hints: ["Arrays start at index 0", "Last element is at length - 1", "Check the return statement"],
    reward: functionalRewards.gear[2]
  },

  {
    title: "Function Call Parentheses Missing",
    language: "JavaScript",
    digitalWorld: "Food Delivery App",
    description: "Order confirmation isn't sending due to missing function call syntax.",
    buggyCode: `function processOrder(order) {
  validateOrder(order);
  let confirmation = generateConfirmation;
  return confirmation;
}`,
    solution: `function processOrder(order) {
  validateOrder(order);
  let confirmation = generateConfirmation();
  return confirmation;
}`,
    multipleChoice: [
      "Add parentheses after generateConfirmation",
      "Remove the validateOrder call",
      "Change let to var",
      "Add semicolon after confirmation"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Functions must be called with parentheses, even if they take no arguments.",
    realWorldContext: "Food delivery apps need proper function calls for order processing.",
    hints: ["Functions need parentheses to be called", "Check line 3", "Missing () after function name"],
    reward: functionalRewards.sidekicks[0]
  },

  {
    title: "String Concatenation Error",
    language: "JavaScript",
    digitalWorld: "Chat Application",
    description: "Message display is broken due to incorrect string handling.",
    buggyCode: `function formatMessage(username, message) {
  return "User: " + username + " says: + message;
}`,
    solution: `function formatMessage(username, message) {
  return "User: " + username + " says: " + message;
}`,
    multipleChoice: [
      "Add quotes around + message",
      "Remove the username parameter",
      "Change + to ,",
      "Add semicolon at the end"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "String concatenation requires proper quote handling around string literals.",
    realWorldContext: "Chat applications format user messages for display.",
    hints: ["Check string quotes", "Look at the concatenation", "Missing quotes around text"],
    reward: functionalRewards.gear[3]
  },

  // Python Problems (25 problems)
  {
    title: "Indentation Error",
    language: "Python",
    digitalWorld: "Data Analysis Lab",
    description: "A data processing function fails due to incorrect indentation.",
    buggyCode: `def process_data(numbers):
total = 0
    for num in numbers:
        total += num
    return total`,
    solution: `def process_data(numbers):
    total = 0
    for num in numbers:
        total += num
    return total`,
    multipleChoice: [
      "Add 4 spaces before 'total = 0'",
      "Remove spaces from other lines",
      "Add semicolons",
      "Change def to function"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Python requires consistent indentation to group code blocks together.",
    realWorldContext: "Data scientists process large datasets to find patterns and insights.",
    hints: ["Python is picky about spacing", "All function code needs indentation", "Line 2 is wrong"],
    reward: functionalRewards.gear[3]
  },

  {
    title: "Missing Colon Crisis",
    language: "Python",
    digitalWorld: "School Grading System",
    description: "Grade calculation is broken due to missing punctuation.",
    buggyCode: `def calculate_grade(score):
    if score >= 90
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "F"`,
    solution: `def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "F"`,
    multipleChoice: [
      "Add colon after score >= 90",
      "Remove the if statement",
      "Add semicolon instead",
      "Change >= to =="
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Python if statements must end with a colon (:) to start a code block.",
    realWorldContext: "Automated grading systems help teachers manage student assessments.",
    hints: ["Python uses colons for code blocks", "Check the if statement", "Look at line 2"],
    reward: functionalRewards.gear[0]
  },

  {
    title: "Variable Scope Error",
    language: "Python",
    digitalWorld: "Inventory Management",
    description: "Stock calculation fails due to variable scope issues.",
    buggyCode: `def update_stock(items):
    for item in items:
        new_count = item['count'] + 10
    return new_count`,
    solution: `def update_stock(items):
    new_count = 0
    for item in items:
        new_count = item['count'] + 10
    return new_count`,
    multipleChoice: [
      "Initialize new_count before the loop",
      "Remove the return statement",
      "Change for to while",
      "Add global keyword"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "intermediate",
    explanation: "Variables defined inside loops may not exist outside the loop scope.",
    realWorldContext: "Inventory systems track product quantities in warehouses.",
    hints: ["Variable scope matters", "Check where new_count is defined", "Variables need to exist before use"],
    reward: functionalRewards.sidekicks[1]
  },

  {
    title: "List Index Error",
    language: "Python",
    digitalWorld: "Student Record System",
    description: "Grade retrieval crashes when accessing student records.",
    buggyCode: `def get_student_grade(grades, student_id):
    if len(grades) > 0:
        return grades[student_id]
    return None`,
    solution: `def get_student_grade(grades, student_id):
    if student_id < len(grades):
        return grades[student_id]
    return None`,
    multipleChoice: [
      "Check if student_id < len(grades)",
      "Remove the if condition",
      "Change > to >=",
      "Use try/except instead"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "intermediate",
    explanation: "Always check that the index is within the valid range of the list.",
    realWorldContext: "School systems need safe access to student data records.",
    hints: ["Check index bounds", "Compare student_id to list length", "Prevent index out of range"],
    reward: functionalRewards.gear[2]
  },

  {
    title: "Function Parameter Error",
    language: "Python",
    digitalWorld: "Recipe Calculator",
    description: "Ingredient scaling fails due to missing function parameters.",
    buggyCode: `def scale_recipe(ingredients):
    scaled = []
    for ingredient in ingredients:
        scaled.append(ingredient * scale_factor)
    return scaled`,
    solution: `def scale_recipe(ingredients, scale_factor):
    scaled = []
    for ingredient in ingredients:
        scaled.append(ingredient * scale_factor)
    return scaled`,
    multipleChoice: [
      "Add scale_factor parameter to function",
      "Define scale_factor inside function",
      "Remove scale_factor from calculation",
      "Use global scale_factor"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "beginner",
    explanation: "All variables used in a function must be parameters or defined within the function.",
    realWorldContext: "Cooking apps help users scale recipes for different serving sizes.",
    hints: ["Check function parameters", "Where is scale_factor defined?", "Functions need all required inputs"],
    reward: functionalRewards.sidekicks[4]
  },

  {
    title: "String Method Error",
    language: "Python",
    digitalWorld: "Text Editor",
    description: "Word count feature crashes due to incorrect string method usage.",
    buggyCode: `def count_words(text):
    words = text.split()
    return words.length()`,
    solution: `def count_words(text):
    words = text.split()
    return len(words)`,
    multipleChoice: [
      "Use len(words) instead of words.length()",
      "Change split() to split(' ')",
      "Add parentheses after text",
      "Remove the split method"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Python uses len() function, not .length() method for getting list size.",
    realWorldContext: "Text editors provide word count functionality for writers.",
    hints: ["Python uses len() function", "Check the length method", "Lists don't have .length()"],
    reward: functionalRewards.gear[4]
  },

  // HTML Problems (20 problems)
  {
    title: "Unclosed Tag Trouble",
    language: "HTML",
    digitalWorld: "News Website",
    description: "Article headlines are displaying incorrectly due to missing closing tags.",
    buggyCode: `<article>
    <h1>Breaking News Today
    <p>Important updates from around the world...</p>
    <p>Stay tuned for more information.</p>
</article>`,
    solution: `<article>
    <h1>Breaking News Today</h1>
    <p>Important updates from around the world...</p>
    <p>Stay tuned for more information.</p>
</article>`,
    multipleChoice: [
      "Add </h1> after 'Breaking News Today'",
      "Remove the <h1> tag entirely",
      "Change <h1> to <h2>",
      "Add <br> tag"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Every HTML opening tag needs a matching closing tag to structure content properly.",
    realWorldContext: "News websites use headings to organize articles and help readers navigate content.",
    hints: ["HTML tags come in pairs", "Look for unclosed tags", "Headlines need proper closure"],
    reward: functionalRewards.sidekicks[3]
  },

  {
    title: "Missing Image Alt Text",
    language: "HTML",
    digitalWorld: "Photography Portfolio",
    description: "Website accessibility is broken due to missing image descriptions.",
    buggyCode: `<div class="gallery">
    <img src="sunset.jpg">
    <img src="mountain.jpg" alt="Mountain landscape">
    <img src="ocean.jpg">
</div>`,
    solution: `<div class="gallery">
    <img src="sunset.jpg" alt="Beautiful sunset">
    <img src="mountain.jpg" alt="Mountain landscape">
    <img src="ocean.jpg" alt="Ocean view">
</div>`,
    multipleChoice: [
      "Add alt attributes to images without them",
      "Remove all images",
      "Change img to picture",
      "Add title attributes instead"
    ],
    correctChoice: 0,
    bugType: "accessibility",
    difficulty: "beginner",
    explanation: "All images need alt text for screen readers and accessibility compliance.",
    realWorldContext: "Photography portfolios must be accessible to users with visual impairments.",
    hints: ["Images need descriptions", "Check for missing alt attributes", "Accessibility is important"],
    reward: functionalRewards.gear[5]
  },

  {
    title: "Form Input Missing Name",
    language: "HTML",
    digitalWorld: "Contact Form",
    description: "Form submission fails because inputs can't be identified on the server.",
    buggyCode: `<form action="/contact" method="post">
    <label for="email">Email:</label>
    <input type="email" id="email">
    <label for="message">Message:</label>
    <textarea id="message"></textarea>
    <button type="submit">Send</button>
</form>`,
    solution: `<form action="/contact" method="post">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    <label for="message">Message:</label>
    <textarea id="message" name="message"></textarea>
    <button type="submit">Send</button>
</form>`,
    multipleChoice: [
      "Add name attributes to form inputs",
      "Remove the form action",
      "Change method to get",
      "Add required attributes"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "intermediate",
    explanation: "Form inputs need name attributes so the server can identify the submitted data.",
    realWorldContext: "Contact forms collect user information and send it to web servers.",
    hints: ["Forms need name attributes", "Server needs to identify inputs", "Check input and textarea tags"],
    reward: functionalRewards.sidekicks[2]
  },

  {
    title: "Nested List Structure Error",
    language: "HTML",
    digitalWorld: "Recipe Website",
    description: "Recipe instructions display incorrectly due to improper list nesting.",
    buggyCode: `<h2>Chocolate Cake Recipe</h2>
<ol>
    <li>Mix dry ingredients</li>
    <ul>
        <li>Flour</li>
        <li>Sugar</li>
        <li>Cocoa powder</li>
    </ul>
    <li>Add wet ingredients</li>
    <li>Bake for 30 minutes</li>
</ol>`,
    solution: `<h2>Chocolate Cake Recipe</h2>
<ol>
    <li>Mix dry ingredients
        <ul>
            <li>Flour</li>
            <li>Sugar</li>
            <li>Cocoa powder</li>
        </ul>
    </li>
    <li>Add wet ingredients</li>
    <li>Bake for 30 minutes</li>
</ol>`,
    multipleChoice: [
      "Nest the <ul> inside the first <li>",
      "Change <ul> to <ol>",
      "Remove the nested list",
      "Add more <li> tags"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "Nested lists must be placed inside <li> elements, not directly inside other lists.",
    realWorldContext: "Recipe websites organize ingredients and steps in structured lists.",
    hints: ["Lists nest inside list items", "Check the structure", "UL should be inside LI"],
    reward: functionalRewards.gear[1]
  },

  {
    title: "Table Structure Missing",
    language: "HTML",
    digitalWorld: "Sports Statistics",
    description: "Player statistics table displays incorrectly due to missing table structure.",
    buggyCode: `<table>
    <tr>
        <th>Player</th>
        <th>Goals</th>
        <th>Assists</th>
    </tr>
    <td>John Smith</td>
    <td>15</td>
    <td>8</td>
    <td>Jane Doe</td>
    <td>12</td>
    <td>10</td>
</table>`,
    solution: `<table>
    <tr>
        <th>Player</th>
        <th>Goals</th>
        <th>Assists</th>
    </tr>
    <tr>
        <td>John Smith</td>
        <td>15</td>
        <td>8</td>
    </tr>
    <tr>
        <td>Jane Doe</td>
        <td>12</td>
        <td>10</td>
    </tr>
</table>`,
    multipleChoice: [
      "Wrap table data cells in <tr> tags",
      "Change <td> to <th>",
      "Remove the table structure",
      "Add <tbody> tag"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "Table data cells (<td>) must be wrapped in table rows (<tr>) for proper structure.",
    realWorldContext: "Sports websites display player statistics in organized tables.",
    hints: ["Table cells need rows", "Check for missing <tr> tags", "Each row needs proper wrapping"],
    reward: functionalRewards.sidekicks[0]
  },

  // CSS Problems (20 problems)
  {
    title: "Missing Semicolon Styles",
    language: "CSS",
    digitalWorld: "Fashion Blog",
    description: "Website styling is broken due to missing CSS punctuation.",
    buggyCode: `.header {
    background-color: #3498db
    color: white;
    padding: 20px
    text-align: center;
}`,
    solution: `.header {
    background-color: #3498db;
    color: white;
    padding: 20px;
    text-align: center;
}`,
    multipleChoice: [
      "Add semicolons after #3498db and 20px",
      "Remove all semicolons",
      "Change the class name",
      "Add more properties"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "CSS properties must end with semicolons to separate style rules properly.",
    realWorldContext: "Fashion blogs use CSS to create beautiful, styled websites that showcase designs.",
    hints: ["CSS needs proper punctuation", "Look for missing semicolons", "Two lines need fixing"],
    reward: functionalRewards.gear[3]
  },

  {
    title: "Selector Syntax Error",
    language: "CSS",
    digitalWorld: "Corporate Website",
    description: "Navigation menu styling fails due to incorrect CSS selector syntax.",
    buggyCode: `.navigation ul li a {
    color: blue;
    text-decoration: none;
}

.navigation ul li a:hover
    color: red;
    font-weight: bold;
}`,
    solution: `.navigation ul li a {
    color: blue;
    text-decoration: none;
}

.navigation ul li a:hover {
    color: red;
    font-weight: bold;
}`,
    multipleChoice: [
      "Add opening brace { after :hover",
      "Remove the :hover selector",
      "Change the selector to ID",
      "Add semicolon after hover"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "CSS selectors must have opening braces { to start the property block.",
    realWorldContext: "Corporate websites need professional navigation with hover effects.",
    hints: ["CSS selectors need braces", "Check the hover rule", "Missing opening brace"],
    reward: functionalRewards.gear[4]
  },

  {
    title: "Property Value Error",
    language: "CSS",
    digitalWorld: "Art Gallery",
    description: "Image layout breaks due to invalid CSS property values.",
    buggyCode: `.gallery img {
    width: 100pixels;
    height: auto;
    margin: 10px;
    border-radius: 5;
}`,
    solution: `.gallery img {
    width: 100px;
    height: auto;
    margin: 10px;
    border-radius: 5px;
}`,
    multipleChoice: [
      "Fix units: 100pixels to 100px and add px to border-radius",
      "Remove all units",
      "Change width to percentage",
      "Add more properties"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "CSS units must be properly formatted (px, em, %, etc.) without spaces.",
    realWorldContext: "Art galleries showcase images with precise sizing and spacing.",
    hints: ["Check CSS units", "Pixels should be 'px'", "Border-radius needs units"],
    reward: functionalRewards.sidekicks[1]
  },

  {
    title: "Flexbox Property Conflict",
    language: "CSS",
    digitalWorld: "Dashboard Application",
    description: "Layout alignment fails due to conflicting flexbox properties.",
    buggyCode: `.dashboard {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: left;
}`,
    solution: `.dashboard {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}`,
    multipleChoice: [
      "Remove text-align as it conflicts with flexbox alignment",
      "Change display to block",
      "Remove justify-content",
      "Add more flex properties"
    ],
    correctChoice: 0,
    bugType: "logic",
    difficulty: "intermediate",
    explanation: "Flexbox alignment properties can conflict with text-align in certain layouts.",
    realWorldContext: "Dashboard applications need clean, centered layouts for data display.",
    hints: ["Flexbox handles alignment", "Text-align may conflict", "Flexbox properties take precedence"],
    reward: functionalRewards.gear[2]
  },

  // Java Problems (15 problems)
  {
    title: "Class Name Case Error",
    language: "Java",
    digitalWorld: "Banking System",
    description: "Account creation fails due to incorrect class naming.",
    buggyCode: `public class bankAccount {
    private double balance;
    
    public bankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
}`,
    solution: `public class BankAccount {
    private double balance;
    
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
}`,
    multipleChoice: [
      "Capitalize class name to BankAccount",
      "Remove the constructor",
      "Change private to public",
      "Add semicolon after class"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "Java class names must start with capital letters and constructors must match the class name exactly.",
    realWorldContext: "Banking systems use object-oriented programming to manage customer accounts securely.",
    hints: ["Java naming conventions matter", "Class names start with capitals", "Constructor must match class"],
    reward: functionalRewards.sidekicks[0]
  },

  {
    title: "Missing Import Statement",
    language: "Java",
    digitalWorld: "Library Management",
    description: "Date handling fails due to missing import for date utilities.",
    buggyCode: `public class LibraryBook {
    private String title;
    private Date publishDate;
    
    public void setPublishDate(String dateStr) {
        this.publishDate = Date.valueOf(dateStr);
    }
}`,
    solution: `import java.sql.Date;

public class LibraryBook {
    private String title;
    private Date publishDate;
    
    public void setPublishDate(String dateStr) {
        this.publishDate = Date.valueOf(dateStr);
    }
}`,
    multipleChoice: [
      "Add import java.sql.Date; at the top",
      "Remove the Date type",
      "Change Date to String",
      "Add public to the method"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "Java requires import statements for classes not in the same package or java.lang.",
    realWorldContext: "Library systems track book publication dates and manage collections.",
    hints: ["Java needs imports", "Date class needs importing", "Check for missing imports"],
    reward: functionalRewards.gear[6]
  },

  {
    title: "Array Declaration Error",
    language: "Java",
    digitalWorld: "Student Management",
    description: "Grade storage fails due to incorrect array syntax.",
    buggyCode: `public class Student {
    private String name;
    private int grades[];
    
    public Student(String name, int numSubjects) {
        this.name = name;
        this.grades = new int[numSubjects];
    }
}`,
    solution: `public class Student {
    private String name;
    private int[] grades;
    
    public Student(String name, int numSubjects) {
        this.name = name;
        this.grades = new int[numSubjects];
    }
}`,
    multipleChoice: [
      "Move brackets before variable name: int[] grades",
      "Remove the brackets entirely",
      "Change int to Integer",
      "Add public modifier"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "beginner",
    explanation: "Java array declarations should place brackets after the type, not the variable name.",
    realWorldContext: "Student management systems store multiple grades per student.",
    hints: ["Array syntax placement matters", "Brackets go with the type", "Check the declaration style"],
    reward: functionalRewards.sidekicks[4]
  },

  // C# Problems (10 problems)
  {
    title: "Missing Main Method",
    language: "C#",
    digitalWorld: "Game Development Studio",
    description: "Game won't start due to incorrect main method signature.",
    buggyCode: `using System;

class Program {
    static void main(string[] args) {
        Console.WriteLine("Game Starting...");
    }
}`,
    solution: `using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Game Starting...");
    }
}`,
    multipleChoice: [
      "Capitalize 'main' to 'Main'",
      "Remove static keyword",
      "Change void to int",
      "Add public before static"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "C# Main method must be capitalized as it's the entry point for program execution.",
    realWorldContext: "Game engines use C# for scripting game logic and managing game startup sequences.",
    hints: ["C# is case-sensitive", "Entry points have specific names", "Check method name carefully"],
    reward: functionalRewards.gear[1]
  },

  {
    title: "Using Statement Missing",
    language: "C#",
    digitalWorld: "File Management System",
    description: "File operations fail due to missing namespace imports.",
    buggyCode: `class FileManager {
    public void ReadFile(string path) {
        string content = File.ReadAllText(path);
        Console.WriteLine(content);
    }
}`,
    solution: `using System;
using System.IO;

class FileManager {
    public void ReadFile(string path) {
        string content = File.ReadAllText(path);
        Console.WriteLine(content);
    }
}`,
    multipleChoice: [
      "Add using System.IO; for File operations",
      "Remove the File.ReadAllText call",
      "Change the method to private",
      "Add try-catch block"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "C# requires using statements to access classes from different namespaces.",
    realWorldContext: "File management systems need proper namespace imports for file operations.",
    hints: ["C# needs using statements", "File class is in System.IO", "Check for missing imports"],
    reward: functionalRewards.sidekicks[5]
  },

  // C++ Problems (10 problems)
  {
    title: "Header Include Error",
    language: "C++",
    digitalWorld: "Robotics Lab",
    description: "Robot control program fails due to missing header file.",
    buggyCode: `#include <iostream>

int main() {
    string message = "Robot activated!";
    cout << message << endl;
    return 0;
}`,
    solution: `#include <iostream>
#include <string>

int main() {
    string message = "Robot activated!";
    cout << message << endl;
    return 0;
}`,
    multipleChoice: [
      "Add #include <string> header",
      "Remove the string variable",
      "Change cout to printf",
      "Add using namespace std;"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "C++ requires including the <string> header to use the string data type.",
    realWorldContext: "Robotics programming requires precise control over system resources and includes.",
    hints: ["C++ needs proper headers", "String type requires inclusion", "Look at what's missing"],
    reward: functionalRewards.gear[2]
  },

  {
    title: "Namespace Declaration Missing",
    language: "C++",
    digitalWorld: "Scientific Calculator",
    description: "Mathematical operations fail due to missing namespace declaration.",
    buggyCode: `#include <iostream>
#include <cmath>

int main() {
    double result = sqrt(16.0);
    cout << "Result: " << result << endl;
    return 0;
}`,
    solution: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double result = sqrt(16.0);
    cout << "Result: " << result << endl;
    return 0;
}`,
    multipleChoice: [
      "Add using namespace std; after includes",
      "Remove the sqrt function",
      "Change cout to std::cout",
      "Add #include <string>"
    ],
    correctChoice: 0,
    bugType: "syntax",
    difficulty: "intermediate",
    explanation: "C++ requires namespace declaration or std:: prefix for standard library functions.",
    realWorldContext: "Scientific calculators use mathematical functions from the standard library.",
    hints: ["C++ needs namespace declaration", "cout and endl are in std namespace", "Add using statement"],
    reward: functionalRewards.sidekicks[2]
  }
];

// Utility function to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to randomize multiple choice answers
function randomizeAnswers(problem: any) {
  const choices = [...problem.multipleChoice];
  const correctAnswer = choices[problem.correctChoice];
  
  // Shuffle the choices
  const shuffledChoices = shuffleArray(choices);
  
  // Find new position of correct answer
  const newCorrectChoice = shuffledChoices.indexOf(correctAnswer);
  
  return {
    ...problem,
    multipleChoice: shuffledChoices,
    correctChoice: newCorrectChoice
  };
}

// Function to get a randomized subset of problems with randomized answers
export function getRandomizedProblems(count: number = 50): any[] {
  const shuffled = shuffleArray(problemLibrary);
  const selectedProblems = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // Randomize the answer choices for each problem
  return selectedProblems.map(problem => randomizeAnswers(problem));
}
